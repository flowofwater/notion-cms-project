'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { FileX, Home, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * 글 상세 페이지 에러 바운더리
 * Notion API 오류 등 글 로딩 실패 시 표시
 */
export default function PostError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('글 페이지 에러:', error)
  }, [error])

  return (
    <div className="container flex min-h-[calc(100vh-16rem)] max-w-4xl flex-col items-center justify-center py-16">
      <div className="text-center">
        <FileX className="mx-auto h-16 w-16 text-muted-foreground/50" />

        <h2 className="mt-6 text-3xl font-bold tracking-tight">
          글을 불러오지 못했습니다
        </h2>
        <p className="mt-4 max-w-md text-muted-foreground">
          Notion 연결에 문제가 생겼습니다. 잠시 후 다시 시도해주세요.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button onClick={reset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            다시 시도
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              홈으로 이동
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
