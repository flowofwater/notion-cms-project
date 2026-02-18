/**
 * 블로그 글 상세 페이지
 */

import { notFound } from 'next/navigation'
import { getPosts, getPostBySlug, getPageContent } from '@/lib/notion-api'
import { PostHeader } from '@/components/blog/post-header'
import { NotionRenderer } from '@/components/blog/notion-renderer'
import type { Metadata } from 'next'

/**
 * ISR(Incremental Static Regeneration) 설정
 * 60초마다 재검증하여 Notion 변경사항 반영
 */
export const revalidate = 60

interface PostPageProps {
  params: {
    slug: string
  }
}

/**
 * 정적 경로 생성 (Build Time)
 * 모든 Published 글에 대한 정적 페이지 생성
 */
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

/**
 * 메타데이터 생성 (SEO)
 */
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: '페이지를 찾을 수 없습니다',
    }
  }

  return {
    title: post.title,
    description: post.summary || post.title,
    openGraph: {
      title: post.title,
      description: post.summary || post.title,
      images: post.cover ? [post.cover] : [],
      type: 'article',
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary || post.title,
      images: post.cover ? [post.cover] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)

  // 404 처리
  if (!post) {
    notFound()
  }

  // 페이지 콘텐츠 가져오기
  const blocks = await getPageContent(post.id)

  return (
    <article className="container max-w-4xl py-12">
      <PostHeader post={post} />

      {/* Notion 본문 콘텐츠 */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <NotionRenderer blocks={blocks} />
      </div>
    </article>
  )
}
