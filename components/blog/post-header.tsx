/**
 * 블로그 글 헤더 컴포넌트
 * 글 상세 페이지에서 사용
 */

import { Separator } from '@/components/ui/separator'
import { CategoryBadge } from './category-badge'
import { TagList } from './tag-list'
import { formatDate } from '@/lib/notion-api'
import type { Post } from '@/types'

interface PostHeaderProps {
  /** 블로그 글 데이터 */
  post: Post
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="space-y-6">
      {/* 커버 이미지 */}
      {post.cover && (
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <img
            src={post.cover}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* 메타 정보 */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <CategoryBadge category={post.category} />
          <Separator orientation="vertical" className="h-4" />
          <time
            dateTime={post.publishedAt}
            className="text-sm text-muted-foreground"
          >
            {formatDate(post.publishedAt)}
          </time>
        </div>

        {/* 제목 */}
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          {post.title}
        </h1>

        {/* 요약 */}
        {post.summary && (
          <p className="text-lg text-muted-foreground">{post.summary}</p>
        )}

        {/* 태그 */}
        {post.tags.length > 0 && (
          <div className="pt-2">
            <TagList tags={post.tags} maxDisplay={10} />
          </div>
        )}
      </div>

      <Separator className="my-8" />
    </header>
  )
}
