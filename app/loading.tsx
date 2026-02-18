/**
 * 홈 페이지 로딩 상태
 * 글 목록을 불러오는 동안 표시되는 스켈레톤 UI
 */

import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

/**
 * PostCard 스켈레톤 컴포넌트
 */
function PostCardSkeleton() {
  return (
    <Card className="h-full">
      {/* 커버 이미지 스켈레톤 */}
      <Skeleton className="aspect-video w-full rounded-t-lg" />

      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          {/* 카테고리 배지 스켈레톤 */}
          <Skeleton className="h-5 w-16" />
          {/* 날짜 스켈레톤 */}
          <Skeleton className="h-4 w-20" />
        </div>

        {/* 제목 스켈레톤 */}
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-3/4" />
      </CardHeader>

      <CardContent>
        {/* 요약 스켈레톤 */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-2/3" />
      </CardContent>

      <CardFooter className="gap-2">
        {/* 태그 스켈레톤 */}
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-14" />
      </CardFooter>
    </Card>
  )
}

export default function Loading() {
  return (
    <div className="container max-w-screen-2xl py-12">
      {/* 헤더 섹션 스켈레톤 */}
      <div className="mb-12 flex flex-col items-center text-center">
        <Skeleton className="h-12 w-64 md:h-16 md:w-96" />
        <Skeleton className="mt-4 h-6 w-48" />
      </div>

      {/* 글 목록 스켈레톤 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
