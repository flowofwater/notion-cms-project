/**
 * 카테고리 목록 페이지
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { getCategories, getPosts } from '@/lib/notion-api'
import { siteConfig } from '@/lib/constants'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `카테고리 | ${siteConfig.name}`,
    description: '카테고리별 블로그 글 목록',
    openGraph: {
      title: `카테고리 | ${siteConfig.name}`,
      description: '카테고리별 블로그 글 목록',
    },
    twitter: {
      card: 'summary',
      title: `카테고리 | ${siteConfig.name}`,
      description: '카테고리별 블로그 글 목록',
    },
  }
}

export default async function CategoriesPage() {
  const [categories, allPosts] = await Promise.all([
    getCategories(),
    getPosts(),
  ])

  // 카테고리별 글 개수 계산
  const categoryCounts = categories.reduce<Record<string, number>>(
    (acc, category) => {
      acc[category] = allPosts.filter((post) => post.category === category).length
      return acc
    },
    {}
  )

  return (
    <div className="container max-w-screen-2xl py-12">
      {/* 헤더 */}
      <div className="mb-12 text-center">
        <h1 className="bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
          카테고리
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {categories.length}개의 카테고리
        </p>
      </div>

      {/* 카테고리 목록 */}
      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-4 text-6xl">📂</div>
          <p className="text-xl font-semibold text-muted-foreground">
            아직 카테고리가 없습니다
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/categories/${encodeURIComponent(category)}`}
              className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-card p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-bold text-primary transition-colors group-hover:bg-primary/20">
                {category[0]}
              </div>
              <h2 className="text-base font-semibold transition-colors group-hover:text-primary">
                {category}
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {categoryCounts[category] ?? 0}개의 글
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
