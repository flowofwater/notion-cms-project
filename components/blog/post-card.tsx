/**
 * 블로그 글 카드 컴포넌트
 * 글 목록 페이지에서 사용
 */

import Link from 'next/link'
import Image from 'next/image'
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
    <Link href={`/posts/${post.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
        {post.cover ? (
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="h-1.5 bg-gradient-to-r from-primary via-primary/70 to-primary/30" />
        )}

        <CardHeader className="space-y-3 pb-3">
          <div className="flex items-center justify-between gap-2">
            <CategoryBadge category={post.category} />
            <time
              dateTime={post.publishedAt}
              className="text-xs text-muted-foreground"
            >
              {formatRelativeTime(post.publishedAt)}
            </time>
          </div>

          <h2 className="line-clamp-2 text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-primary">
            {post.title}
          </h2>
        </CardHeader>

        {post.summary && (
          <CardContent className="pb-3">
            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {post.summary}
            </p>
          </CardContent>
        )}

        {post.tags.length > 0 && (
          <CardFooter className="pt-0">
            <TagList tags={post.tags} maxDisplay={3} />
          </CardFooter>
        )}
      </Card>
    </Link>
  )
}
