'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchInputProps {
  defaultValue?: string
  placeholder?: string
}

/**
 * 검색 인풋 컴포넌트
 * 검색어를 URL 파라미터로 전달하여 서버에서 필터링
 */
export function SearchInput({
  defaultValue = '',
  placeholder = '글 제목 또는 요약 검색...',
}: SearchInputProps) {
  const router = useRouter()
  const [value, setValue] = useState(defaultValue)

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (value.trim()) {
        router.push(`/?q=${encodeURIComponent(value.trim())}`)
      } else {
        router.push('/')
      }
    },
    [value, router]
  )

  const handleClear = useCallback(() => {
    setValue('')
    router.push('/')
  }, [router])

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-9 pr-9"
      />
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-3 w-3" />
          <span className="sr-only">검색어 지우기</span>
        </Button>
      )}
    </form>
  )
}
