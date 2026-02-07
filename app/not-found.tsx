"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * 404 Not Found 페이지
 */
export default function NotFound() {
  const router = useRouter()

  return (
    <div className="container flex min-h-[calc(100vh-16rem)] flex-col items-center justify-center py-16">
      <div className="text-center">
        {/* 404 숫자 */}
        <h1 className="text-9xl font-bold text-muted-foreground/20">404</h1>

        {/* 메시지 */}
        <h2 className="mt-4 text-3xl font-bold tracking-tight">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="mt-4 max-w-md text-muted-foreground">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          URL을 다시 확인해주세요.
        </p>

        {/* 액션 버튼 */}
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              홈으로 이동
            </Link>
          </Button>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            이전 페이지로
          </Button>
        </div>
      </div>
    </div>
  )
}
