'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

/**
 * 헤더 검색 컴포넌트
 * 검색 아이콘 클릭 시 인라인 검색 인풋 표시
 */
export function HeaderSearch() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // 검색창 열릴 때 포커스
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  const handleOpen = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setValue('')
  }, [])

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (value.trim()) {
        router.push(`/?q=${encodeURIComponent(value.trim())}`)
      }
      handleClose()
    },
    [value, router, handleClose]
  )

  // ESC 키 누르면 닫기
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    },
    [handleClose]
  )

  if (isOpen) {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-1">
        <Input
          ref={inputRef}
          type="search"
          placeholder="검색..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-8 w-40 sm:w-56"
        />
        <Button type="button" variant="ghost" size="icon" onClick={handleClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">검색 닫기</span>
        </Button>
      </form>
    )
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleOpen}>
      <Search className="h-4 w-4" />
      <span className="sr-only">검색</span>
    </Button>
  )
}
