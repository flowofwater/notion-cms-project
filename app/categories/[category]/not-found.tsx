import Link from 'next/link'
import { Button } from '@/components/ui/button'

/**
 * 카테고리를 찾을 수 없을 때 표시되는 페이지
 */
export default function CategoryNotFound() {
  return (
    <div className="container flex min-h-[60vh] max-w-screen-2xl flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">카테고리를 찾을 수 없습니다</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        요청한 카테고리가 존재하지 않거나 삭제되었습니다.
      </p>
      <Button asChild className="mt-8">
        <Link href="/categories">모든 카테고리 보기</Link>
      </Button>
    </div>
  )
}
