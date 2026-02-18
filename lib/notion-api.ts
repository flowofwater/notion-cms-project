/**
 * Notion API 함수들
 */

import { format } from 'date-fns'
import { notion, DATABASE_ID } from './notion'
import type { Post, NotionDatabaseFilter } from '@/types'

/**
 * Notion 데이터베이스에서 블로그 글 목록 가져오기
 *
 * @param filter - 필터 옵션 (카테고리, 태그, 상태, 검색어)
 * @returns Post 배열
 */
export async function getPosts(filter?: NotionDatabaseFilter): Promise<Post[]> {
  try {
    const response = await notion.dataSources.query({
      data_source_id: DATABASE_ID,
      page_size: 100,
      // TODO: 필터 및 정렬 추가
    })

    const posts = response.results
      .map((page: any) => convertNotionPageToPost(page))
      .filter((post): post is Post => post !== null)
      .filter((post) => {
        // 상태 필터 (기본: Published만)
        const statusFilter = filter?.status || 'Published'
        if (post.status !== statusFilter) return false

        // 카테고리 필터
        if (filter?.category && post.category !== filter.category) return false

        // 태그 필터
        if (filter?.tags && filter.tags.length > 0) {
          const hasMatchingTag = filter.tags.some((tag) =>
            post.tags.includes(tag)
          )
          if (!hasMatchingTag) return false
        }

        // 검색어 필터
        if (filter?.search) {
          const searchLower = filter.search.toLowerCase()
          const matchesTitle = post.title.toLowerCase().includes(searchLower)
          const matchesSummary = post.summary?.toLowerCase().includes(searchLower)
          if (!matchesTitle && !matchesSummary) return false
        }

        return true
      })
      .sort((a, b) => {
        // 발행일 내림차순 정렬
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      })

    return posts
  } catch (error) {
    console.error('getPosts 오류:', error)
    throw new Error('블로그 글 목록을 가져오는데 실패했습니다.')
  }
}

/**
 * Slug로 개별 블로그 글 가져오기
 *
 * @param slug - URL slug (예: my-first-post)
 * @returns Post 또는 null
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await notion.dataSources.query({
      data_source_id: DATABASE_ID,
      page_size: 1,
    })

    const page = response.results.find((p: any) => {
      const slugProp = p.properties.slug || p.properties.Slug
      if (!slugProp) return false

      const slugValue = slugProp.rich_text?.[0]?.plain_text
      return slugValue === slug
    })

    if (!page) return null

    return convertNotionPageToPost(page)
  } catch (error) {
    console.error(`getPostBySlug('${slug}') 오류:`, error)
    return null
  }
}

/**
 * 모든 카테고리 목록 가져오기
 *
 * @returns 카테고리 문자열 배열 (중복 제거)
 */
export async function getCategories(): Promise<string[]> {
  try {
    const response = await notion.dataSources.query({
      data_source_id: DATABASE_ID,
      page_size: 100,
    })

    const categories = response.results
      .map((page: any) => {
        const categoryProp = page.properties.category || page.properties.Category
        return categoryProp?.select?.name
      })
      .filter((category): category is string => Boolean(category))

    // 중복 제거 및 정렬
    return [...new Set(categories)].sort()
  } catch (error) {
    console.error('getCategories 오류:', error)
    return []
  }
}

/**
 * Notion 페이지 객체를 Post 타입으로 변환
 *
 * @param page - Notion API 응답 페이지 객체
 * @returns Post 또는 null (변환 실패 시)
 */
function convertNotionPageToPost(page: any): Post | null {
  try {
    const props = page.properties

    // 필수 속성 추출 (소문자 속성명 사용)
    const titleProp = props.title || props.Title
    const slugProp = props.slug || props.Slug
    const categoryProp = props.category || props.Category
    const publishedProp = props.published || props.Published
    const statusProp = props.status || props.Status

    // 제목 (필수)
    const title = titleProp?.title?.[0]?.plain_text
    if (!title) {
      console.warn(`페이지 ${page.id}: 제목이 없습니다.`)
      return null
    }

    // Slug (필수)
    const slug = slugProp?.rich_text?.[0]?.plain_text
    if (!slug) {
      console.warn(`페이지 ${page.id}: slug가 없습니다.`)
      return null
    }

    // 카테고리 (필수)
    const category = categoryProp?.select?.name
    if (!category) {
      console.warn(`페이지 ${page.id}: 카테고리가 없습니다.`)
      return null
    }

    // 발행일 (필수)
    const publishedAt = publishedProp?.date?.start
    if (!publishedAt) {
      console.warn(`페이지 ${page.id}: 발행일이 없습니다.`)
      return null
    }

    // 상태 (필수)
    const status = statusProp?.select?.name as 'Draft' | 'Published' | undefined
    if (!status || (status !== 'Draft' && status !== 'Published')) {
      console.warn(`페이지 ${page.id}: 유효하지 않은 상태입니다.`)
      return null
    }

    // 선택 속성 추출
    const tagProp = props.tag || props.Tags || props.tags
    const summaryProp = props.summary || props.Summary
    const coverProp = props.cover || props.Cover

    // 태그 (선택)
    const tags = tagProp?.multi_select?.map((tag: any) => tag.name) || []

    // 요약 (선택)
    const summary = summaryProp?.rich_text?.[0]?.plain_text

    // 커버 이미지 (선택)
    let cover: string | undefined
    if (coverProp?.files && coverProp.files.length > 0) {
      const file = coverProp.files[0]
      if (file.type === 'external') {
        cover = file.external?.url
      } else if (file.type === 'file') {
        cover = file.file?.url
      }
    }

    return {
      id: page.id,
      title,
      slug,
      category,
      tags,
      publishedAt,
      status,
      summary,
      cover,
    }
  } catch (error) {
    console.error(`convertNotionPageToPost 오류 (페이지 ${page.id}):`, error)
    return null
  }
}

/**
 * 날짜를 상대적 시간으로 포맷 (예: "3일 전")
 *
 * @param dateString - ISO 8601 날짜 문자열
 * @returns 상대적 시간 문자열
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return '방금 전'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}일 전`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}주 전`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}개월 전`

  return `${Math.floor(diffInSeconds / 31536000)}년 전`
}

/**
 * 날짜를 지정된 포맷으로 변환
 *
 * @param dateString - ISO 8601 날짜 문자열
 * @param formatString - date-fns 포맷 문자열 (기본: 'yyyy년 MM월 dd일')
 * @returns 포맷된 날짜 문자열
 */
export function formatDate(
  dateString: string,
  formatString = 'yyyy년 MM월 dd일'
): string {
  return format(new Date(dateString), formatString)
}
