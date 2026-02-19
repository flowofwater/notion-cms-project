/**
 * 카테고리 뱃지 컴포넌트
 */

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface CategoryBadgeProps {
  /** 카테고리 이름 */
  category: string
  /** 클릭 가능 여부 (기본: false) */
  clickable?: boolean
}

export function CategoryBadge({ category, clickable = false }: CategoryBadgeProps) {
  return (
    <Badge
      className={cn(
        'border-0 bg-primary/10 text-primary hover:bg-primary/20',
        clickable && 'cursor-pointer'
      )}
    >
      {category}
    </Badge>
  )
}
