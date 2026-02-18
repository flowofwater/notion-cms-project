/**
 * Notion API 클라이언트 초기화
 */

import { Client } from '@notionhq/client'

// 환경 변수 검증
if (!process.env.NOTION_API_KEY) {
  throw new Error('NOTION_API_KEY 환경 변수가 설정되지 않았습니다.')
}

if (!process.env.NOTION_DATABASE_ID) {
  throw new Error('NOTION_DATABASE_ID 환경 변수가 설정되지 않았습니다.')
}

/**
 * Notion API 클라이언트 인스턴스
 */
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

/**
 * Notion 데이터베이스 ID
 */
export const DATABASE_ID = process.env.NOTION_DATABASE_ID
