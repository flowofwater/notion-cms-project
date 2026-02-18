import { Skeleton } from '@/components/ui/skeleton'

/**
 * 카테고리 페이지 로딩 스켈레톤
 */
export default function CategoryLoading() {
  return (
    <div className="container max-w-screen-2xl py-12">
      {/* 뒤로가기 스켈레톤 */}
      <Skeleton className="mb-8 h-4 w-32" />

      {/* 헤더 스켈레톤 */}
      <div className="mb-12 flex flex-col items-center gap-4">
        <Skeleton className="h-12 w-48" />
        <Skeleton className="h-6 w-24" />
      </div>

      {/* 글 카드 스켈레톤 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-6 space-y-4">
            <Skeleton className="h-40 w-full rounded-md" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
