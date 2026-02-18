/**
 * 블로그 홈 페이지 - 글 목록 표시
 */

import type { Metadata } from 'next'
import { getPosts } from '@/lib/notion-api'
import { PostCard } from '@/components/blog/post-card'
import { SearchInput } from '@/components/common/search-input'
import { siteConfig } from '@/lib/constants'

/**
 * ISR(Incremental Static Regeneration) 설정
 * 60초마다 재검증하여 Notion 변경사항 반영
 */
export const revalidate = 60

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
}

interface HomePageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { q } = await searchParams
  const posts = await getPosts({ search: q })

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

      {/* 검색 바 */}
      <div className="mx-auto mb-10 max-w-xl">
        <SearchInput defaultValue={q} />
      </div>

      {/* 검색 결과 안내 */}
      {q && (
        <p className="mb-6 text-center text-sm text-muted-foreground">
          &ldquo;{q}&rdquo; 검색 결과: {posts.length}개
        </p>
      )}

      {/* 글 목록 */}
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-xl text-muted-foreground">
            {q ? '검색 결과가 없습니다' : '아직 작성된 글이 없습니다'}
          </p>
          {q ? (
            <p className="mt-2 text-sm text-muted-foreground">
              다른 검색어로 시도해보세요
            </p>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              Notion에서 글을 작성하고 Status를 &quot;게시&quot;로 변경하세요
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* 글 개수 표시 */}
      {posts.length > 0 && !q && (
        <div className="mt-12 text-center text-sm text-muted-foreground">
          총 {posts.length}개의 글
        </div>
      )}
    </div>
  )
}
