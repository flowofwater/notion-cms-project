# 개인 개발 블로그 개발 로드맵

> **프로젝트**: Notion CMS 기반 개인 개발 블로그
> **전체 예상 기간**: 11-16일 (약 2-3주)
> **작성일**: 2026-02-08
> **기반 문서**: [PRD.md](./PRD.md)

---

## 📋 개발 원칙

1. **점진적 개발**: 각 Phase는 이전 Phase에 의존하며, 순차적으로 진행
2. **테스트 우선**: 각 Phase 완료 시 기능 검증 필수
3. **문서화 병행**: 코드와 함께 주석 및 README 업데이트
4. **타입 안정성**: TypeScript strict 모드로 모든 타입 명시
5. **재사용성**: 공통 컴포넌트와 유틸리티 함수 우선 개발

---

## Phase 1: 프로젝트 초기 설정 ⚙️

**예상 소요 시간**: 1-2일
**담당자**: 개발자
**목표**: 견고한 개발 환경 구축 및 Notion API 연동

### 📌 주요 작업

#### 1.1 Notion API 설정 (0.5일)
- [ ] Notion Integration 생성 (https://www.notion.so/my-integrations)
  - Integration 이름: "개인 블로그"
  - 권한: Read content
- [ ] API 키 발급 및 안전하게 저장
- [ ] Notion 데이터베이스 생성
  - 필수 속성: Title, Slug, Category, Published, Status, Content
  - 선택 속성: Tags, Summary, Cover
- [ ] Integration에 데이터베이스 공유 권한 부여
- [ ] 데이터베이스 ID 확인 및 저장

#### 1.2 프로젝트 환경 설정 (0.5일)
- [ ] Next.js 16 프로젝트 구조 확인
- [ ] 필수 패키지 설치
  ```bash
  npm install @notionhq/client date-fns
  ```
- [ ] 환경 변수 파일 생성
  - `.env.local` 생성 (Git 무시됨)
  - `.env.example` 생성 (Git 포함)
  ```env
  NOTION_API_KEY=secret_xxxxxxxxxxxxx
  NOTION_DATABASE_ID=xxxxxxxxxxxxx
  ```
- [ ] `.gitignore`에 `.env.local` 추가 확인

#### 1.3 기본 프로젝트 구조 생성 (0.5일)
- [ ] 디렉토리 구조 생성
  ```
  lib/          # 유틸리티 및 API 함수
  types/        # TypeScript 타입 정의
  components/
    ├── blog/   # 블로그 전용 컴포넌트
    ├── common/ # 공통 컴포넌트
    └── layout/ # 레이아웃 컴포넌트
  app/
    ├── posts/[slug]/  # 글 상세 페이지
    └── categories/[category]/  # 카테고리 페이지
  ```
- [ ] 기본 레이아웃 구조 생성 (`app/layout.tsx`)
  - Header, Footer 컴포넌트 placeholder
  - ThemeProvider 설정

### ✅ 완료 기준

- [ ] Notion API 연결 테스트 성공 (간단한 쿼리 실행)
- [ ] 환경 변수 정상 로드 확인
- [ ] TypeScript 컴파일 에러 없음
- [ ] 로컬 개발 서버 정상 실행 (`npm run dev`)
- [ ] Git 커밋 완료 (초기 설정)

### 🚨 주의사항

- API 키는 절대 Git에 커밋하지 않음
- Notion 데이터베이스에 테스트 데이터 최소 3개 생성
- Status "Published"와 "Draft" 데이터를 모두 포함

---

## Phase 2: 공통 모듈 개발 🧩

**예상 소요 시간**: 2-3일
**담당자**: 개발자
**목표**: 재사용 가능한 데이터 레이어 및 공통 컴포넌트 구축

### 📌 주요 작업

#### 2.1 TypeScript 타입 정의 (0.5일)
**파일**: `types/notion.ts`, `types/index.ts`

- [ ] Post 인터페이스 정의
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
  ```
- [ ] NotionBlock 타입 정의 (단계적으로 확장 가능)
  ```typescript
  interface NotionBlock {
    type: 'paragraph' | 'heading_1' | 'heading_2' | 'heading_3' | 'code' | 'image' | 'bulleted_list_item' | 'numbered_list_item' | 'quote' | 'callout' | 'divider'
    id: string
    // 각 타입별 content
  }
  ```
- [ ] NotionPageContent 타입 정의
  ```typescript
  interface NotionPageContent {
    post: Post
    blocks: NotionBlock[]
  }
  ```

#### 2.2 Notion API 클라이언트 및 함수 (1-1.5일)
**파일**: `lib/notion.ts`, `lib/notion-api.ts`

- [ ] Notion 클라이언트 초기화
  ```typescript
  import { Client } from '@notionhq/client'

  export const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  })

  export const DATABASE_ID = process.env.NOTION_DATABASE_ID!
  ```

- [ ] `getPosts(filter?)` 함수 구현
  - Status가 "Published"인 글만 필터링
  - 발행일 내림차순 정렬
  - 카테고리 필터 옵션 지원
  - 반환: `Post[]`

- [ ] `getPostBySlug(slug)` 함수 구현
  - Slug로 페이지 조회
  - 존재하지 않으면 `null` 반환
  - 반환: `Post | null`

- [ ] `getPageContent(pageId)` 함수 구현
  - 페이지 블록 내용 가져오기
  - NotionBlock 타입으로 변환
  - 반환: `NotionBlock[]`

- [ ] `getCategories()` 함수 구현
  - 데이터베이스의 모든 카테고리 목록
  - 중복 제거
  - 반환: `string[]`

- [ ] 데이터 변환 유틸리티 함수
  - Notion API 응답 → Post 타입 변환
  - 날짜 포매팅 (date-fns 활용)

#### 2.3 캐싱 전략 설정 (0.5일)
- [ ] ISR(Incremental Static Regeneration) 설정
  ```typescript
  export const revalidate = 60 // 60초마다 재검증
  ```
- [ ] 각 API 함수에 revalidate 옵션 적용
- [ ] 캐싱 테스트 (Notion 데이터 변경 후 반영 확인)

#### 2.4 공통 UI 컴포넌트 (0.5-1일)
**파일**: `components/blog/`, `components/common/`

- [ ] `PostCard` 컴포넌트 (블로그 글 카드)
  - Props: `post: Post`
  - 표시: 제목, 요약, 카테고리, 태그, 발행일
  - shadcn/ui Card 컴포넌트 활용

- [ ] `CategoryBadge` 컴포넌트
  - Props: `category: string`
  - shadcn/ui Badge 활용

- [ ] `TagList` 컴포넌트
  - Props: `tags: string[]`
  - 최대 3개 태그 표시, 나머지는 "+N" 표시

- [ ] `PostHeader` 컴포넌트 (상세 페이지 헤더)
  - Props: `post: Post`
  - 표시: 제목, 발행일, 카테고리, 태그

### ✅ 완료 기준

- [ ] 모든 타입 정의 완료 (TypeScript 에러 없음)
- [ ] Notion API 함수 단위 테스트 (로컬에서 데이터 확인)
  - `getPosts()` 호출 시 Published 글만 반환
  - `getPostBySlug()` 호출 시 올바른 글 반환
  - `getCategories()` 호출 시 카테고리 목록 반환
- [ ] 공통 컴포넌트 Storybook 또는 개별 페이지에서 시각적 확인
- [ ] ESLint, TypeScript 에러 0개
- [ ] Git 커밋 완료 (공통 모듈 구현)

### 🚨 주의사항

- Notion API Rate Limit (초당 3 요청) 고려
- 서버 컴포넌트에서만 API 호출 (클라이언트에서 API 키 노출 금지)
- 에러 처리 필수 (`try-catch` 또는 에러 바운더리)

---

## Phase 3: 핵심 기능 개발 🎯

**예상 소요 시간**: 3-4일
**담당자**: 개발자
**목표**: 블로그의 가장 기본이 되는 기능 구현

### 📌 주요 작업

#### 3.1 글 목록 페이지 (1-1.5일)
**파일**: `app/page.tsx`

- [ ] 홈 페이지 구현
  ```typescript
  export default async function HomePage() {
    const posts = await getPosts()

    return (
      <main>
        <h1>최근 글</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    )
  }
  ```

- [ ] 반응형 그리드 레이아웃
  - 모바일: 1열
  - 태블릿: 2열
  - 데스크톱: 3열

- [ ] 빈 상태 처리
  - 글이 없을 때: "아직 작성된 글이 없습니다" 메시지

- [ ] 로딩 상태 (`app/loading.tsx`)
  - 스켈레톤 UI 구현
  - shadcn/ui Skeleton 컴포넌트 활용

#### 3.2 글 상세 페이지 (1.5-2일)
**파일**: `app/posts/[slug]/page.tsx`

- [ ] 동적 라우팅 구현
  ```typescript
  export default async function PostPage({
    params
  }: {
    params: { slug: string }
  }) {
    const post = await getPostBySlug(params.slug)

    if (!post) {
      notFound()
    }

    const blocks = await getPageContent(post.id)

    return (
      <article>
        <PostHeader post={post} />
        <NotionRenderer blocks={blocks} />
      </article>
    )
  }
  ```

- [ ] 정적 경로 생성 (`generateStaticParams`)
  ```typescript
  export async function generateStaticParams() {
    const posts = await getPosts()
    return posts.map(post => ({ slug: post.slug }))
  }
  ```

- [ ] 404 처리
  - Slug에 해당하는 글이 없으면 `notFound()` 호출
  - `app/posts/[slug]/not-found.tsx` 생성

- [ ] 로딩 상태 (`app/posts/[slug]/loading.tsx`)

#### 3.3 Notion 컨텐츠 렌더러 (1-1.5일)
**파일**: `components/blog/notion-renderer.tsx`

- [ ] NotionRenderer 컴포넌트 구현
  - Props: `blocks: NotionBlock[]`
  - 각 블록 타입별 렌더링

- [ ] 지원 블록 타입 (우선순위 순)
  1. **텍스트 블록**
     - [ ] `paragraph` (단락)
     - [ ] `heading_1`, `heading_2`, `heading_3` (제목)
     - [ ] `bulleted_list_item` (비순서 목록)
     - [ ] `numbered_list_item` (순서 목록)
     - [ ] `quote` (인용구)

  2. **코드 블록**
     - [ ] `code` (코드 블록)
     - Syntax highlighting 적용 (react-syntax-highlighter 또는 Prism)

  3. **미디어 블록**
     - [ ] `image` (이미지)
     - `next/image` 컴포넌트 사용
     - Notion 이미지 URL 처리 (1시간 만료 고려)

  4. **기타 블록**
     - [ ] `callout` (콜아웃)
     - [ ] `divider` (구분선)

- [ ] 지원되지 않는 블록 처리
  - 대체 텍스트 표시: "이 블록 타입은 지원되지 않습니다"

- [ ] 스타일링
  - Tailwind CSS Typography 플러그인 활용
  - 일관된 여백 및 폰트 크기

### ✅ 완료 기준

- [ ] 홈 페이지에서 Published 글 목록 정상 표시
- [ ] 글 카드 클릭 시 상세 페이지로 이동
- [ ] 상세 페이지에서 Notion 컨텐츠 정상 렌더링
  - 제목, 단락, 리스트, 코드, 이미지 모두 표시 확인
- [ ] 존재하지 않는 slug 접근 시 404 페이지 표시
- [ ] 모바일/태블릿/데스크톱에서 레이아웃 정상 동작
- [ ] ISR 동작 확인 (Notion 데이터 변경 후 60초 이내 반영)
- [ ] Git 커밋 완료 (핵심 기능 구현)

### 🚨 주의사항

- Notion 이미지 URL 만료 문제 (1시간)
  - 프로덕션 환경에서는 이미지 프록시 또는 CDN 업로드 고려
- 코드 블록 syntax highlighting 라이브러리 번들 크기 주의
- 빌드 시 모든 slug에 대한 정적 페이지 생성 확인

---

## Phase 4: 추가 기능 개발 🔧

**예상 소요 시간**: 2-3일
**담당자**: 개발자
**목표**: 사용자 경험 향상 및 콘텐츠 탐색 기능 추가

### 📌 주요 작업

#### 4.1 카테고리 필터링 (1일)
**파일**: `app/categories/[category]/page.tsx`

- [ ] 카테고리 페이지 구현
  ```typescript
  export default async function CategoryPage({
    params
  }: {
    params: { category: string }
  }) {
    const posts = await getPosts({ category: params.category })

    return (
      <main>
        <h1>{params.category}</h1>
        <p>{posts.length}개의 글</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    )
  }
  ```

- [ ] 정적 경로 생성 (`generateStaticParams`)
  ```typescript
  export async function generateStaticParams() {
    const categories = await getCategories()
    return categories.map(category => ({ category }))
  }
  ```

- [ ] 카테고리 네비게이션 추가
  - Header에 카테고리 드롭다운 또는 링크 목록
  - `components/layout/category-nav.tsx` 생성

- [ ] 빈 카테고리 처리
  - 해당 카테고리에 글이 없을 때 메시지 표시

#### 4.2 검색 기능 (0.5-1일)
**파일**: `components/common/search-bar.tsx`, `app/search/page.tsx` (옵션)

- [ ] 검색 바 컴포넌트 구현
  - Header에 검색 아이콘/입력창
  - 실시간 검색 결과 미리보기 (옵션)

- [ ] 검색 함수 추가 (`lib/notion-api.ts`)
  ```typescript
  export async function searchPosts(query: string): Promise<Post[]> {
    const posts = await getPosts()
    return posts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.summary?.toLowerCase().includes(query.toLowerCase())
    )
  }
  ```

- [ ] 검색 결과 페이지 (옵션)
  - `/search?q=검색어` 형태
  - 검색어 하이라이팅

#### 4.3 SEO 최적화 (0.5-1일)
**파일**: `app/layout.tsx`, `app/posts/[slug]/page.tsx`

- [ ] 메타데이터 생성 함수 (`generateMetadata`)
  - 홈 페이지: 블로그 제목, 설명
  - 글 상세 페이지: 글 제목, 요약, 커버 이미지

  ```typescript
  export async function generateMetadata({
    params
  }: {
    params: { slug: string }
  }): Promise<Metadata> {
    const post = await getPostBySlug(params.slug)

    if (!post) {
      return { title: '404 - 페이지를 찾을 수 없습니다' }
    }

    return {
      title: post.title,
      description: post.summary,
      openGraph: {
        title: post.title,
        description: post.summary,
        images: post.cover ? [post.cover] : [],
        type: 'article',
        publishedTime: post.publishedAt,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.summary,
        images: post.cover ? [post.cover] : [],
      },
    }
  }
  ```

- [ ] sitemap.xml 생성 (옵션)
  - `app/sitemap.ts` 파일 생성
  - 모든 글의 URL 포함

- [ ] robots.txt 생성 (옵션)
  - `app/robots.ts` 파일 생성

#### 4.4 공통 레이아웃 개선 (0.5일)
**파일**: `components/layout/header.tsx`, `components/layout/footer.tsx`

- [ ] Header 컴포넌트 완성
  - 블로그 로고/제목 (클릭 시 홈으로)
  - 네비게이션 메뉴: 홈, 카테고리, About (옵션)
  - 검색 바
  - 다크모드 토글 (ThemeToggle 컴포넌트)

- [ ] Footer 컴포넌트 완성
  - 저작권 정보
  - 소셜 미디어 링크 (옵션)

- [ ] 모바일 네비게이션 (햄버거 메뉴)
  - shadcn/ui Sheet 컴포넌트 활용

### ✅ 완료 기준

- [ ] 카테고리 페이지에서 필터링된 글 목록 정상 표시
- [ ] Header 카테고리 네비게이션 동작 확인
- [ ] 검색 기능 정상 작동 (제목/요약 검색)
- [ ] 메타데이터 확인
  - 브라우저 탭에 제목 표시
  - Open Graph 미리보기 (Discord, Slack 등에서 확인)
- [ ] 다크모드 토글 동작 확인
- [ ] 모바일에서 햄버거 메뉴 정상 동작
- [ ] Git 커밋 완료 (추가 기능 구현)

### 🚨 주의사항

- 검색 기능은 클라이언트 사이드 필터링 (초기 버전)
  - 추후 서버 사이드 검색으로 확장 가능
- SEO 메타데이터는 서버 컴포넌트에서만 생성 가능
- 카테고리 URL은 URL-safe 처리 (공백, 특수문자)

---

## Phase 5: 최적화 및 배포 🚀

**예상 소요 시간**: 1-2일
**담당자**: 개발자
**목표**: 성능 최적화 및 프로덕션 배포

### 📌 주요 작업

#### 5.1 성능 최적화 (0.5-1일)

- [ ] 이미지 최적화
  - 모든 이미지에 `next/image` 적용 확인
  - 적절한 `sizes` 속성 설정
  - 블러 placeholder 추가 (옵션)

- [ ] 폰트 최적화
  - `next/font`로 웹 폰트 로딩
  - 폰트 서브셋 설정 (한글 + 영어)

- [ ] 번들 크기 최적화
  - `npm run build` 후 번들 분석
  - 큰 라이브러리 동적 import (옵션)
  ```typescript
  const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter'))
  ```

- [ ] Lighthouse 검사
  - Performance: 90점 이상 목표
  - Accessibility: 95점 이상 목표
  - Best Practices: 90점 이상 목표
  - SEO: 100점 목표

- [ ] Core Web Vitals 확인
  - LCP (Largest Contentful Paint): 2.5초 이내
  - FID (First Input Delay): 100ms 이내
  - CLS (Cumulative Layout Shift): 0.1 이하

#### 5.2 반응형 디자인 개선 (0.5일)

- [ ] 다양한 화면 크기 테스트
  - 모바일: 320px ~ 767px
  - 태블릿: 768px ~ 1023px
  - 데스크톱: 1024px 이상

- [ ] 터치 최적화
  - 버튼/링크 최소 크기: 44px × 44px
  - 적절한 여백 확보

- [ ] 폰트 크기 조정
  - 모바일: 기본 16px
  - 데스크톱: 18px (옵션)

#### 5.3 에러 처리 및 UX 개선 (0.5일)

- [ ] 에러 바운더리 구현
  - `app/error.tsx`: 전역 에러 처리
  - `app/posts/[slug]/error.tsx`: 글 페이지 에러 처리

- [ ] 404 페이지 커스터마이징
  - `app/not-found.tsx` 개선
  - "홈으로 돌아가기" 버튼 추가

- [ ] 로딩 상태 개선
  - Suspense 활용
  - 스켈레톤 UI 일관성 확인

- [ ] 접근성 개선
  - 시맨틱 HTML 태그 사용 확인
  - ARIA 속성 추가 (필요한 경우)
  - 키보드 네비게이션 테스트

#### 5.4 테스트 (0.5일)

- [ ] 기능 테스트
  - 글 목록 페이지 로딩
  - 글 상세 페이지 로딩
  - 카테고리 필터링
  - 검색 기능
  - 다크모드 토글

- [ ] 데이터 동기화 테스트
  - Notion에서 글 작성 → 블로그 반영 확인 (60초 이내)
  - Status "Draft" → "Published" 변경 시 반영
  - 글 수정 시 반영

- [ ] 에러 케이스 테스트
  - 존재하지 않는 slug 접근
  - Notion API 장애 시뮬레이션 (네트워크 끊기)
  - 빈 데이터베이스

#### 5.5 Vercel 배포 (0.5일)

- [ ] Vercel 계정 연동
  - GitHub 저장소 연결
  - 자동 배포 설정

- [ ] 환경 변수 설정 (Vercel 대시보드)
  ```
  NOTION_API_KEY=secret_xxxxxxxxxxxxx
  NOTION_DATABASE_ID=xxxxxxxxxxxxx
  ```

- [ ] 빌드 설정 확인
  - Framework Preset: Next.js
  - Build Command: `npm run build`
  - Output Directory: `.next`

- [ ] 배포 및 검증
  ```bash
  vercel --prod
  ```
  - 프로덕션 URL 접속 확인
  - 모든 기능 정상 동작 확인
  - HTTPS 적용 확인

- [ ] 도메인 연결 (옵션)
  - 커스텀 도메인 설정
  - DNS 레코드 추가

#### 5.6 문서화 (0.5일)

- [ ] README.md 작성
  - 프로젝트 소개
  - 설치 및 실행 방법
  - 환경 변수 설정 가이드
  - Notion 데이터베이스 구조
  - 배포 방법

- [ ] CHANGELOG.md 생성 (옵션)
  - v1.0.0 릴리스 내용 기록

- [ ] 코드 주석 추가
  - 복잡한 로직에 주석 추가
  - JSDoc 주석 (함수 설명)

### ✅ 완료 기준

- [ ] Lighthouse 점수 목표 달성
  - Performance: 90+ ✅
  - Accessibility: 95+ ✅
  - Best Practices: 90+ ✅
  - SEO: 100 ✅

- [ ] 모든 디바이스에서 정상 동작 확인
  - iPhone (Safari)
  - Android (Chrome)
  - 태블릿 (iPad)
  - 데스크톱 (Chrome, Firefox, Safari)

- [ ] Vercel 프로덕션 배포 성공
  - 배포 URL 정상 접속
  - 모든 페이지 로딩 확인
  - ISR 동작 확인

- [ ] README.md 문서 완성

- [ ] Git 커밋 및 태그 생성
  ```bash
  git tag v1.0.0
  git push origin v1.0.0
  ```

### 🚨 주의사항

- Vercel 무료 플랜 제한 확인
  - 빌드 시간: 월 6000분
  - 대역폭: 월 100GB
  - Serverless Functions: 100GB-Hours
- Notion 이미지 만료 문제 해결 방안 마련 (필요시)
- 프로덕션 환경에서 API Rate Limit 모니터링

---

## 🗓️ 전체 타임라인

| Phase | 기간 | 누적 기간 |
|-------|------|-----------|
| Phase 1: 프로젝트 초기 설정 | 1-2일 | 1-2일 |
| Phase 2: 공통 모듈 개발 | 2-3일 | 3-5일 |
| Phase 3: 핵심 기능 개발 | 3-4일 | 6-9일 |
| Phase 4: 추가 기능 개발 | 2-3일 | 8-12일 |
| Phase 5: 최적화 및 배포 | 1-2일 | 9-14일 |
| **버퍼 (예상치 못한 이슈)** | 2일 | **11-16일** |

**목표 완료일**: 약 2-3주 (파트타임 기준: 4-6주)

---

## 📊 진행 상황 추적

### 체크리스트

- [ ] Phase 1: 프로젝트 초기 설정 완료
- [ ] Phase 2: 공통 모듈 개발 완료
- [ ] Phase 3: 핵심 기능 개발 완료
- [ ] Phase 4: 추가 기능 개발 완료
- [ ] Phase 5: 최적화 및 배포 완료

### 마일스톤

| 마일스톤 | 목표일 | 완료일 | 상태 |
|----------|--------|--------|------|
| MVP (Phase 1-3) | 2주차 | - | 🔲 Pending |
| Feature Complete (Phase 4) | 3주차 | - | 🔲 Pending |
| Production Launch (Phase 5) | 3-4주차 | - | 🔲 Pending |

---

## 🎯 성공 지표 (KPI)

### 기술적 지표

- ✅ TypeScript 에러 0개
- ✅ ESLint 경고 0개
- ✅ 빌드 성공 (프로덕션)
- ✅ 모든 테스트 케이스 통과

### 성능 지표

- ✅ Lighthouse Performance > 90
- ✅ LCP < 2.5초
- ✅ FID < 100ms
- ✅ CLS < 0.1

### 기능 지표

- ✅ Notion 데이터 동기화 성공 (60초 이내)
- ✅ 모든 Notion 블록 타입 정상 렌더링
- ✅ 카테고리 필터링 정상 동작
- ✅ 검색 기능 정상 동작

---

## 🔄 Phase 2 이후 로드맵 (추후 계획)

### Phase 2.1: 댓글 시스템 (1주)
- Giscus 또는 Utterances 통합
- 댓글 알림 설정

### Phase 2.2: 분석 및 통계 (1주)
- Google Analytics 연동
- 조회수 카운터
- 인기 글 순위

### Phase 2.3: RSS 피드 (0.5주)
- RSS 피드 생성
- Atom 피드 지원

### Phase 2.4: 고급 기능 (2주)
- 태그 페이지
- 관련 글 추천 (AI 기반)
- 목차 자동 생성
- 읽기 시간 예상
- 코드 복사 버튼

---

## 📞 참고 자료

- [PRD 문서](./PRD.md)
- [Notion API 공식 문서](https://developers.notion.com/)
- [Next.js 16 문서](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vercel 배포 가이드](https://vercel.com/docs)

---

**문서 버전**: 1.0.0
**마지막 업데이트**: 2026-02-08
**다음 리뷰 예정일**: Phase 1 완료 시
