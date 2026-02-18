/**
 * Notion CMS 블로그용 타입 정의
 */

/**
 * 블로그 포스트 타입
 * Notion 데이터베이스의 페이지를 블로그 글로 변환한 형태
 */
export interface Post {
  /** Notion 페이지 ID */
  id: string
  /** 글 제목 */
  title: string
  /** URL 경로용 slug (예: my-first-post) */
  slug: string
  /** 카테고리 (예: 개발, 디자인) */
  category: string
  /** 태그 목록 */
  tags: string[]
  /** 발행일 (ISO 8601 형식) */
  publishedAt: string
  /** 상태 (Draft | Published) */
  status: 'Draft' | 'Published'
  /** 글 요약 (선택사항) */
  summary?: string
  /** 커버 이미지 URL (선택사항) */
  cover?: string
}

/**
 * Notion 블록 타입 정의
 */
export type NotionBlockType =
  | 'paragraph'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'bulleted_list_item'
  | 'numbered_list_item'
  | 'quote'
  | 'code'
  | 'image'
  | 'callout'
  | 'divider'

/**
 * Notion 리치 텍스트 객체
 */
export interface NotionRichText {
  type: 'text'
  text: {
    content: string
    link?: {
      url: string
    } | null
  }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  plain_text: string
  href?: string | null
}

/**
 * 기본 Notion 블록 인터페이스
 */
export interface NotionBlockBase {
  id: string
  type: NotionBlockType
  has_children: boolean
}

/**
 * 단락 블록
 */
export interface ParagraphBlock extends NotionBlockBase {
  type: 'paragraph'
  paragraph: {
    rich_text: NotionRichText[]
    color: string
  }
}

/**
 * 제목 블록 (H1, H2, H3)
 */
export interface HeadingBlock extends NotionBlockBase {
  type: 'heading_1' | 'heading_2' | 'heading_3'
  heading_1?: {
    rich_text: NotionRichText[]
    color: string
    is_toggleable: boolean
  }
  heading_2?: {
    rich_text: NotionRichText[]
    color: string
    is_toggleable: boolean
  }
  heading_3?: {
    rich_text: NotionRichText[]
    color: string
    is_toggleable: boolean
  }
}

/**
 * 리스트 블록
 */
export interface ListBlock extends NotionBlockBase {
  type: 'bulleted_list_item' | 'numbered_list_item'
  bulleted_list_item?: {
    rich_text: NotionRichText[]
    color: string
  }
  numbered_list_item?: {
    rich_text: NotionRichText[]
    color: string
  }
}

/**
 * 인용 블록
 */
export interface QuoteBlock extends NotionBlockBase {
  type: 'quote'
  quote: {
    rich_text: NotionRichText[]
    color: string
  }
}

/**
 * 코드 블록
 */
export interface CodeBlock extends NotionBlockBase {
  type: 'code'
  code: {
    rich_text: NotionRichText[]
    language: string
    caption: NotionRichText[]
  }
}

/**
 * 이미지 블록
 */
export interface ImageBlock extends NotionBlockBase {
  type: 'image'
  image: {
    type: 'external' | 'file'
    external?: {
      url: string
    }
    file?: {
      url: string
      expiry_time: string
    }
    caption: NotionRichText[]
  }
}

/**
 * 콜아웃 블록
 */
export interface CalloutBlock extends NotionBlockBase {
  type: 'callout'
  callout: {
    rich_text: NotionRichText[]
    icon: {
      type: 'emoji' | 'external' | 'file'
      emoji?: string
      external?: {
        url: string
      }
      file?: {
        url: string
        expiry_time: string
      }
    }
    color: string
  }
}

/**
 * 구분선 블록
 */
export interface DividerBlock extends NotionBlockBase {
  type: 'divider'
  divider: Record<string, never>
}

/**
 * 모든 Notion 블록 타입의 유니온
 */
export type NotionBlock =
  | ParagraphBlock
  | HeadingBlock
  | ListBlock
  | QuoteBlock
  | CodeBlock
  | ImageBlock
  | CalloutBlock
  | DividerBlock

/**
 * Notion 페이지 콘텐츠 (블로그 글 + 블록들)
 */
export interface NotionPageContent {
  /** 블로그 글 메타데이터 */
  post: Post
  /** Notion 블록 목록 */
  blocks: NotionBlock[]
}

/**
 * Notion 데이터베이스 필터 옵션
 */
export interface NotionDatabaseFilter {
  /** 카테고리로 필터링 */
  category?: string
  /** 태그로 필터링 */
  tags?: string[]
  /** 상태로 필터링 (기본: Published) */
  status?: 'Draft' | 'Published'
  /** 검색어 (제목/요약에서 검색) */
  search?: string
}

/**
 * 페이지네이션 옵션
 */
export interface PaginationOptions {
  /** 페이지 크기 (기본: 10) */
  pageSize?: number
  /** 시작 커서 (다음 페이지용) */
  startCursor?: string
}
