/**
 * Notion API 테스트 엔드포인트
 * 접속: http://localhost:3000/api/test-notion
 */

import { NextResponse } from 'next/server'
import { getPosts, getCategories } from '@/lib/notion-api'

export async function GET() {
  try {
    console.log('🧪 Notion API 테스트 시작')

    // 1. 모든 글 가져오기
    const posts = await getPosts()

    // 2. 카테고리 목록 가져오기
    const categories = await getCategories()

    return NextResponse.json({
      success: true,
      data: {
        totalPosts: posts.length,
        posts: posts.slice(0, 3), // 처음 3개만
        categories,
      },
      message: '✅ Notion API 연동 성공!',
    })
  } catch (error) {
    console.error('❌ Notion API 테스트 실패:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류',
      },
      { status: 500 }
    )
  }
}
