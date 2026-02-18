/**
 * 태그 목록 컴포넌트
 * 최대 3개 태그만 표시하고, 나머지는 "+N" 형태로 표시
 */

import { Badge } from '@/components/ui/badge'

interface TagListProps {
  /** 태그 배열 */
  tags: string[]
  /** 최대 표시 개수 (기본: 3) */
  maxDisplay?: number
}

export function TagList({ tags, maxDisplay = 3 }: TagListProps) {
  if (tags.length === 0) return null

  const displayTags = tags.slice(0, maxDisplay)
  const remainingCount = tags.length - maxDisplay

  return (
    <div className="flex flex-wrap gap-2">
      {displayTags.map((tag) => (
        <Badge key={tag} variant="outline" className="text-xs">
          {tag}
        </Badge>
      ))}
      {remainingCount > 0 && (
        <Badge variant="outline" className="text-xs text-muted-foreground">
          +{remainingCount}
        </Badge>
      )}
    </div>
  )
}
