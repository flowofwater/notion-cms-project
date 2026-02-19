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
      {/* 히어로 섹션 */}
      <div className="relative mb-16 overflow-hidden rounded-3xl bg-gradient-to-br from-primary/8 via-background to-accent/10 px-8 py-16 text-center">
        {/* 배경 블러 장식 */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />

        <div className="relative">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Notion CMS 블로그
          </div>
          <h1 className="bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl">
            개발 블로그
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Notion으로 작성하는 개발 이야기
          </p>
        </div>
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
          <div className="mb-4 text-6xl">✍️</div>
          <p className="text-xl font-semibold">
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
