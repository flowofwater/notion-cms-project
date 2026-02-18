import type { LucideIcon } from "lucide-react"

/**
 * 네비게이션 링크 타입
 */
export interface NavLink {
  href: string
  label: string
  disabled?: boolean
}

/**
 * 기능 카드 타입
 */
export interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

/**
 * 푸터 링크 그룹 타입
 */
export interface FooterLinkGroup {
  title: string
  links: NavLink[]
}

/**
 * Notion CMS 관련 타입
 */
export type {
  Post,
  NotionBlock,
  NotionBlockType,
  NotionRichText,
  NotionBlockBase,
  ParagraphBlock,
  HeadingBlock,
  ListBlock,
  QuoteBlock,
  CodeBlock,
  ImageBlock,
  CalloutBlock,
  DividerBlock,
  NotionPageContent,
  NotionDatabaseFilter,
  PaginationOptions,
} from './notion'
