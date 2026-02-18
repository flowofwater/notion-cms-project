/**
 * 글 상세 페이지 로딩 상태
 */

import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

export default function Loading() {
  return (
    <article className="container max-w-4xl py-12">
      <header className="space-y-6">
        {/* 커버 이미지 스켈레톤 */}
        <Skeleton className="aspect-video w-full rounded-lg" />

        {/* 메타 정보 스켈레톤 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* 제목 스켈레톤 */}
          <Skeleton className="h-12 w-full md:h-14" />
          <Skeleton className="h-12 w-3/4 md:h-14" />

          {/* 요약 스켈레톤 */}
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />

          {/* 태그 스켈레톤 */}
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-14" />
          </div>
        </div>

        <Separator className="my-8" />
      </header>

      {/* 본문 스켈레톤 */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
      </div>
    </article>
  )
}
