# Shrimp Task Manager - AI Agent Rules

> **프로젝트**: Notion CMS 기반 개인 개발 블로그
> **작성일**: 2026-02-08
> **목적**: AI Agent가 프로젝트 작업 시 준수해야 할 규칙 및 가이드

---

## 1. 프로젝트 컨텍스트

### 프로젝트 목표
Notion을 CMS로 활용하는 개인 개발 블로그를 구축합니다. Notion API를 통해 글을 가져오고, Next.js로 렌더링하여 독립적인 블로그 플랫폼을 만듭니다.

### 핵심 기술 스택
- **Frontend**: Next.js 16.1.6, React 19.2.3, TypeScript 5.x
- **스타일링**: Tailwind CSS 4.x, shadcn/ui (New York 스타일)
- **CMS**: Notion API (@notionhq/client)
- **배포**: Vercel
- **개발 도구**: ESLint, TypeScript strict mode

### 참고 문서
- **PRD**: @docs/PRD.md
- **로드맵**: @docs/ROADMAP.md
- **프로젝트 가이드**: @CLAUDE.md

---

## 2. 디렉토리 구조 규칙

### 절대 수정하지 말 것
```
components/ui/*           # shadcn/ui 자동 생성 컴포넌트 (업데이트 시 덮어쓰기됨)
.next/                    # Next.js 빌드 캐시
app/globals.css           # Tailwind 기본 설정 (추가는 가능, 삭제 금지)
```

### 새 파일 생성 위치
```
components/
  ├── blog/              # 블로그 전용 컴포넌트 (PostCard, NotionRenderer 등)
  ├── common/            # 공통 컴포넌트 (Logo, SearchBar 등)
  ├── layout/            # 레이아웃 컴포넌트 (Header, Footer 등)
  └── providers/         # Context Providers

lib/                     # 유틸리티 및 API 함수
  ├── notion.ts          # Notion 클라이언트 초기화
  ├── notion-api.ts      # Notion API 함수 (getPosts, getPostBySlug 등)
  └── utils.ts           # 공통 유틸리티

types/                   # TypeScript 타입 정의
  ├── notion.ts          # Notion 관련 타입
  └── index.ts           # 공통 타입

app/                     # Next.js App Router
  ├── posts/[slug]/      # 글 상세 페이지
  └── categories/[category]/  # 카테고리 페이지
```

---

## 3. Notion API 연동 규칙

### 환경 변수
```env
NOTION_API_KEY=secret_xxx...      # 서버 사이드 전용 (NEXT_PUBLIC_ 금지)
NOTION_DATABASE_ID=xxx...         # 서버 사이드 전용
```

### API 호출 제약사항
1. **서버 컴포넌트에서만 호출**
   - 클라이언트 컴포넌트에서 Notion API 직접 호출 금지
   - `'use client'` 없는 컴포넌트에서만 사용

2. **Rate Limit 고려**
   - Notion API: 초당 3 요청
   - ISR(Incremental Static Regeneration) 활용 필수
   - `revalidate` 옵션 설정 (기본 60초)

3. **캐싱 전략**
   ```typescript
   export const revalidate = 60  // 60초마다 재검증
   ```

### 필수 함수 구현 (lib/notion-api.ts)
```typescript
// 글 목록 가져오기 (Status가 "Published"만)
export async function getPosts(filter?: {
  category?: string
}): Promise<Post[]>

// Slug로 개별 글 가져오기
export async function getPostBySlug(slug: string): Promise<Post | null>

// 페이지 블록 내용 가져오기
export async function getPageContent(pageId: string): Promise<NotionBlock[]>

// 카테고리 목록 가져오기
export async function getCategories(): Promise<string[]>
```

---

## 4. TypeScript 규칙

### Strict Mode 필수
- `tsconfig.json`의 `strict: true` 유지
- `any` 타입 사용 금지 (unknown 또는 구체적인 타입 사용)

### 타입 정의 (types/notion.ts)
```typescript
interface Post {
  id: string
  title: string
  slug: string
  category: string
  tags: string[]
  publishedAt: string
  status: 'Draft' | 'Published'
  summary?: string
  cover?: string
}

interface NotionBlock {
  type: 'paragraph' | 'heading_1' | 'heading_2' | 'heading_3' |
        'code' | 'image' | 'bulleted_list_item' | 'numbered_list_item' |
        'quote' | 'callout' | 'divider'
  id: string
  // 각 타입별 content
}
```

### 함수 시그니처
```typescript
// ✅ Good - 명시적 타입
export async function getPosts(filter?: { category?: string }): Promise<Post[]> {
  // ...
}

// ❌ Bad - 타입 없음
export async function getPosts(filter) {
  // ...
}
```

---

## 5. 컴포넌트 작성 규칙

### 파일 명명
- **컴포넌트 파일**: `kebab-case.tsx` (예: `post-card.tsx`)
- **컴포넌트명**: `PascalCase` (예: `PostCard`)
- **변수/함수**: `camelCase` (예: `fetchPosts`)

### Props 인터페이스
```typescript
// ✅ Good
interface PostCardProps {
  post: Post
  showCategory?: boolean
}

export function PostCard({ post, showCategory = true }: PostCardProps) {
  // ...
}

// ❌ Bad - Props 타입 없음
export function PostCard({ post, showCategory }) {
  // ...
}
```

### Import 순서
```typescript
// 1. React 관련
import React from 'react'
import { useState } from 'react'

// 2. 외부 라이브러리
import { cn } from '@/lib/utils'

// 3. 내부 컴포넌트 (path alias @/* 필수)
import { Button } from '@/components/ui/button'
import { PostCard } from '@/components/blog/post-card'

// 4. 타입
import type { Post } from '@/types'

// 5. 상대 경로 (최소화)
import './styles.css'
```

### Path Alias 사용 필수
```typescript
// ✅ Good
import { Button } from '@/components/ui/button'
import { getPosts } from '@/lib/notion-api'

// ❌ Bad - 상대 경로
import { Button } from '../../../components/ui/button'
import { getPosts } from '../../lib/notion-api'
```

---

## 6. 스타일링 규칙

### Tailwind CSS 우선 사용
```typescript
// ✅ Good - Tailwind 클래스
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* ... */}
</div>

// ❌ Bad - 인라인 스타일
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
  {/* ... */}
</div>
```

### cn() 유틸 함수 활용
```typescript
import { cn } from '@/lib/utils'

<div className={cn(
  'base-class',
  variant === 'primary' && 'bg-primary text-white',
  isActive && 'ring-2 ring-primary'
)} />
```

### shadcn/ui 컴포넌트 추가
```bash
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add button
```

---

## 7. 데이터 Fetching 규칙

### Server Component (기본)
```typescript
// app/page.tsx
export default async function HomePage() {
  const posts = await getPosts()  // 서버에서 직접 호출

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
```

### ISR 설정
```typescript
// app/page.tsx
export const revalidate = 60  // 60초마다 재검증

export default async function HomePage() {
  // ...
}
```

### 정적 경로 생성
```typescript
// app/posts/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map(post => ({
    slug: post.slug
  }))
}
```

---

## 8. 에러 처리 규칙

### 404 처리
```typescript
// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()  // app/posts/[slug]/not-found.tsx 표시
  }

  return <article>{/* ... */}</article>
}
```

### 에러 바운더리
```typescript
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>문제가 발생했습니다</h2>
      <button onClick={reset}>다시 시도</button>
    </div>
  )
}
```

### try-catch (API 함수)
```typescript
// lib/notion-api.ts
export async function getPosts(): Promise<Post[]> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Status',
        select: { equals: 'Published' }
      },
      sorts: [
        { property: 'Published', direction: 'descending' }
      ]
    })

    return response.results.map(mapNotionPageToPost)
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    return []  // 빈 배열 반환 (사용자에게는 "글이 없습니다" 표시)
  }
}
```

---

## 9. Git 커밋 규칙

### 커밋 메시지 형식 (한국어)
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포매팅, 세미콜론 누락 등
refactor: 코드 리팩토링
test: 테스트 코드 추가
chore: 빌드 작업, 패키지 매니저 설정 등
```

### 예시
```bash
git commit -m "feat: Notion API 연동 및 getPosts 함수 구현"
git commit -m "fix: 존재하지 않는 slug 접근 시 404 처리"
git commit -m "docs: README.md에 환경 변수 설정 가이드 추가"
```

---

## 10. 보안 규칙

### 환경 변수 관리
```bash
# ✅ Git에 포함
.env.example

# ❌ Git에서 제외 (.gitignore)
.env.local
.env
```

### API 키 노출 방지
```typescript
// ✅ Good - 서버 컴포넌트에서만 사용
export async function getPosts() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  // ...
}

// ❌ Bad - 클라이언트 노출 위험
'use client'
export function PostList() {
  const apiKey = process.env.NOTION_API_KEY  // undefined! (클라이언트에서는 NEXT_PUBLIC_만 접근 가능)
  // ...
}
```

---

## 11. 성능 최적화 규칙

### 이미지 최적화
```typescript
import Image from 'next/image'

// ✅ Good
<Image
  src={post.cover}
  alt={post.title}
  width={800}
  height={400}
  className="rounded-lg"
/>

// ❌ Bad - 일반 img 태그
<img src={post.cover} alt={post.title} />
```

### 폰트 최적화
```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

### 번들 크기 최적화 (필요시)
```typescript
// 큰 라이브러리는 동적 import
import dynamic from 'next/dynamic'

const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter'), {
  loading: () => <p>로딩 중...</p>,
  ssr: false
})
```

---

## 12. 테스트 체크리스트

### 각 작업 완료 시 확인
- [ ] TypeScript 에러 0개 (`npx tsc --noEmit`)
- [ ] ESLint 경고 0개 (`npm run lint`)
- [ ] 로컬 빌드 성공 (`npm run build`)
- [ ] 개발 서버 정상 실행 (`npm run dev`)
- [ ] 모바일/태블릿/데스크톱 반응형 확인
- [ ] 다크모드 정상 동작 확인
- [ ] Git 커밋 메시지 규칙 준수

### Phase 완료 시 확인
- [ ] ROADMAP.md의 완료 기준 충족
- [ ] 관련 문서 업데이트 (필요시)
- [ ] Git 커밋 및 푸시

---

## 13. 작업 우선순위

### 필수 (MUST)
1. TypeScript strict 모드 준수
2. 서버 컴포넌트에서만 Notion API 호출
3. Path alias (@/*) 사용
4. ROADMAP.md 순서 준수 (Phase 1 → 2 → 3 → 4 → 5)

### 권장 (SHOULD)
1. shadcn/ui 컴포넌트 활용
2. Tailwind CSS 우선 사용
3. 에러 처리 (404, try-catch)
4. 주석 추가 (복잡한 로직)

### 선택 (MAY)
1. Storybook 활용 (컴포넌트 시각화)
2. 단위 테스트 작성
3. 성능 프로파일링 (React DevTools)

---

## 14. Phase별 중점 사항

### Phase 1: 프로젝트 초기 설정
- Notion API 연결 테스트 성공 필수
- 환경 변수 올바르게 설정
- TypeScript 컴파일 에러 0개

### Phase 2: 공통 모듈 개발
- 타입 정의 완료 (Post, NotionBlock)
- Notion API 함수 구현 (getPosts, getPostBySlug)
- 캐싱 전략 설정 (ISR)

### Phase 3: 핵심 기능 개발
- 글 목록 페이지 정상 동작
- 글 상세 페이지 렌더링
- Notion 블록 타입별 렌더링 (최소: paragraph, heading, code, image)

### Phase 4: 추가 기능 개발
- 카테고리 필터링
- 검색 기능
- SEO 메타데이터

### Phase 5: 최적화 및 배포
- Lighthouse 점수 90+ 달성
- Vercel 배포 성공
- 모든 환경 변수 설정 완료

---

## 15. 금지 사항 (DO NOT)

### 절대 금지
- ❌ components/ui/* 직접 수정
- ❌ .env.local을 Git에 커밋
- ❌ 클라이언트 컴포넌트에서 Notion API 호출
- ❌ any 타입 사용
- ❌ 상대 경로 import (../../../)
- ❌ Notion API Rate Limit 무시

### 피해야 할 것
- ⚠️ 인라인 스타일 (style 속성)
- ⚠️ 일반 img 태그 (next/image 사용)
- ⚠️ 과도한 클라이언트 사이드 로직
- ⚠️ 불필요한 'use client' 선언

---

## 16. 참고 링크

### 공식 문서
- [Notion API](https://developers.notion.com/)
- [Next.js 16](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

### 프로젝트 문서
- [PRD](./docs/PRD.md)
- [ROADMAP](./docs/ROADMAP.md)
- [CLAUDE.md](./CLAUDE.md)

---

**문서 버전**: 1.0.0
**마지막 업데이트**: 2026-02-08
**다음 리뷰**: Phase 1 완료 시
