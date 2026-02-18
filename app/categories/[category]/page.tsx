/**
 * 카테고리별 글 목록 페이지
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getPosts, getCategories } from '@/lib/notion-api'
import { PostCard } from '@/components/blog/post-card'
import { siteConfig } from '@/lib/constants'

export const revalidate = 60

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

/**
 * 정적 경로 생성 (Build Time)
 * 모든 카테고리에 대한 정적 페이지 생성
 */
export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }))
}

/**
 * 메타데이터 생성 (SEO)
 */
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)

  return {
    title: `${decodedCategory} | ${siteConfig.name}`,
    description: `${decodedCategory} 카테고리의 글 목록`,
    openGraph: {
      title: `${decodedCategory} | ${siteConfig.name}`,
      description: `${decodedCategory} 카테고리의 글 목록`,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)

  const [categories, posts] = await Promise.all([
    getCategories(),
    getPosts({ category: decodedCategory }),
  ])

  // 존재하지 않는 카테고리 처리
  if (!categories.includes(decodedCategory)) {
    notFound()
  }

  return (
    <div className="container max-w-screen-2xl py-12">
      {/* 뒤로가기 */}
      <Link
        href="/categories"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        모든 카테고리
      </Link>

      {/* 헤더 */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {decodedCategory}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {posts.length}개의 글
        </p>
      </div>

      {/* 글 목록 */}
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-xl text-muted-foreground">
            이 카테고리에 글이 없습니다
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
