'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * 전역 에러 바운더리
 * 예상치 못한 런타임 에러 발생 시 표시
 */
export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('전역 에러 발생:', error)
  }, [error])

  return (
    <div className="container flex min-h-[calc(100vh-16rem)] flex-col items-center justify-center py-16">
      <div className="text-center">
        <AlertTriangle className="mx-auto h-16 w-16 text-destructive/50" />

        <h2 className="mt-6 text-3xl font-bold tracking-tight">
          오류가 발생했습니다
        </h2>
        <p className="mt-4 max-w-md text-muted-foreground">
          예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
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
