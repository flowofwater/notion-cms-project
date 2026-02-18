/**
 * 글을 찾을 수 없을 때 표시되는 페이지
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileQuestion, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center">
      <FileQuestion className="h-24 w-24 text-muted-foreground" />
      <h1 className="mt-6 text-3xl font-bold">글을 찾을 수 없습니다</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        요청하신 글이 존재하지 않거나 삭제되었습니다.
      </p>
      <div className="mt-8">
        <Button asChild size="lg">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            홈으로 돌아가기
          </Link>
        </Button>
      </div>
    </div>
  )
}
