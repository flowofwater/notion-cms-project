/**
 * 블로그 글 카드 컴포넌트
 * 글 목록 페이지에서 사용
 */

import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { CategoryBadge } from './category-badge'
import { TagList } from './tag-list'
import { formatRelativeTime } from '@/lib/notion-api'
import type { Post } from '@/types'

interface PostCardProps {
  /** 블로그 글 데이터 */
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`} className="block h-full">
      <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02]">
        {post.cover && (
          <div className="aspect-video w-full overflow-hidden rounded-t-lg">
            <img
              src={post.cover}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <CategoryBadge category={post.category} />
            <time
              dateTime={post.publishedAt}
              className="text-xs text-muted-foreground"
            >
              {formatRelativeTime(post.publishedAt)}
            </time>
          </div>

          <h3 className="line-clamp-2 text-xl font-bold leading-tight">
            {post.title}
          </h3>
        </CardHeader>

        {post.summary && (
          <CardContent>
            <p className="line-clamp-3 text-sm text-muted-foreground">
              {post.summary}
            </p>
          </CardContent>
        )}

        {post.tags.length > 0 && (
          <CardFooter>
            <TagList tags={post.tags} maxDisplay={3} />
          </CardFooter>
        )}
      </Card>
    </Link>
  )
}
