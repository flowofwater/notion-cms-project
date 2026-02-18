/**
 * 블로그 홈 페이지 - 글 목록 표시
 */

import { getPosts } from '@/lib/notion-api'
import { PostCard } from '@/components/blog/post-card'

/**
 * ISR(Incremental Static Regeneration) 설정
 * 60초마다 재검증하여 Notion 변경사항 반영
 */
export const revalidate = 60

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <div className="container max-w-screen-2xl py-12">
      {/* 헤더 섹션 */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          개발 블로그
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Notion으로 작성하는 개발 이야기
        </p>
      </div>

      {/* 글 목록 */}
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-xl text-muted-foreground">
            아직 작성된 글이 없습니다
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Notion에서 글을 작성하고 Status를 &quot;Published&quot;로 변경하세요
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* 글 개수 표시 */}
      {posts.length > 0 && (
        <div className="mt-12 text-center text-sm text-muted-foreground">
          총 {posts.length}개의 글
        </div>
      )}
    </div>
  )
}
