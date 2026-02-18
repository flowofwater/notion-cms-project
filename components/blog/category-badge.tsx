/**
 * 카테고리 뱃지 컴포넌트
 */

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
      variant="secondary"
      className={clickable ? 'cursor-pointer hover:bg-secondary/80' : ''}
    >
      {category}
    </Badge>
  )
}
