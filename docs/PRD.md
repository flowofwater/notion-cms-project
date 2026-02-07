# 개인 개발 블로그 PRD

## 1. 프로젝트 개요
- **프로젝트명**: Notion CMS 기반 개인 개발 블로그
- **버전**: 1.0.0
- **작성일**: 2026-02-07
- **작성자**: Claude Code Assistant

## 2. 목적 및 배경

### 프로젝트 목적
개발자가 Notion에서 작성한 글을 자동으로 동기화하여 표시하는 개인 블로그 웹사이트를 구축합니다. Notion의 강력한 에디터 기능을 활용하면서도, 커스터마이징 가능한 독립적인 블로그 플랫폼을 구축하는 것이 목표입니다.

### Notion을 CMS로 선택한 이유
- **편리한 콘텐츠 작성**: Notion의 직관적인 에디터를 사용하여 글 작성 가능
- **구조화된 데이터**: 데이터베이스 기능으로 체계적인 콘텐츠 관리
- **별도의 관리자 페이지 불필요**: Notion 자체가 관리자 인터페이스 역할
- **실시간 동기화**: API를 통해 Notion의 변경사항이 자동으로 반영
- **협업 가능**: 필요시 다른 사람과 쉽게 공유 및 협업 가능

### 해결하고자 하는 문제
- 별도의 CMS 구축 및 유지보수 부담 제거
- 글 작성과 블로그 운영의 분리로 개발자 경험 향상
- 정적 사이트 생성기의 빌드 과정 없이 실시간 콘텐츠 업데이트

## 3. 주요 기능

### 3.1 Notion 데이터베이스 연동
- Notion API를 통한 실시간 데이터 fetching
- 데이터베이스 속성 기반 필터링 및 정렬

### 3.2 블로그 글 목록 표시
- 발행된 글 목록을 카드 형태로 표시
- 제목, 요약, 발행일, 카테고리, 태그 정보 제공
- 페이지네이션 또는 무한 스크롤

### 3.3 개별 글 상세 페이지
- Notion 페이지 내용을 웹 페이지로 렌더링
- 코드 블록, 이미지, 임베드 등 다양한 블록 타입 지원
- 메타데이터 (제목, 날짜, 카테고리, 태그) 표시

### 3.4 카테고리별 필터링
- 카테고리 선택 시 해당 카테고리 글만 필터링
- 카테고리 목록 사이드바 또는 상단 네비게이션

### 3.5 검색 기능
- 글 제목 및 내용 기반 검색
- 실시간 검색 결과 업데이트

### 3.6 반응형 디자인
- 모바일, 태블릿, 데스크톱 모든 디바이스 지원
- shadcn/ui와 Tailwind CSS 기반 현대적인 UI

## 4. 기술 스택

### Frontend
- **Next.js**: 16.1.6 (App Router, SSG/ISR)
- **React**: 19.2.3
- **TypeScript**: 5.x
- **Tailwind CSS**: 4.x
- **shadcn/ui**: New York 스타일 컴포넌트
- **Lucide React**: 아이콘 라이브러리

### Backend/CMS
- **Notion API**: @notionhq/client
- **Notion SDK**: 공식 JavaScript SDK 사용

### Deployment
- **Vercel**: Next.js 최적화된 호스팅 플랫폼
- **환경 변수**: Vercel 환경 변수로 API 키 관리

### 개발 도구
- **ESLint**: 코드 품질 관리
- **Prettier**: 코드 포매팅 (옵션)
- **TypeScript Strict Mode**: 타입 안정성 보장

## 5. Notion 데이터베이스 구조

| 속성명 | 타입 | 설명 | 필수 여부 |
|--------|------|------|-----------|
| Title | title | 글 제목 | ✅ 필수 |
| Slug | rich_text | URL 경로 (예: my-first-post) | ✅ 필수 |
| Category | select | 카테고리 (예: 개발, 디자인, 일상) | ✅ 필수 |
| Tags | multi_select | 태그 목록 (예: React, TypeScript) | ⚪ 선택 |
| Published | date | 발행일 | ✅ 필수 |
| Status | select | 상태 (초안/발행됨) | ✅ 필수 |
| Summary | rich_text | 글 요약 (목록 페이지에 표시) | ⚪ 선택 |
| Cover | files | 커버 이미지 | ⚪ 선택 |
| Content | page content | 본문 내용 (Notion 페이지 본문) | ✅ 필수 |

### Status 값
- **초안 (Draft)**: 작성 중인 글, 블로그에 표시되지 않음
- **발행됨 (Published)**: 블로그에 공개된 글

## 6. 화면 구성

### 6.1 홈 페이지 (`/`)
- **레이아웃**: 그리드 또는 리스트 형태의 글 카드
- **표시 정보**:
  - 커버 이미지 (있는 경우)
  - 글 제목
  - 요약 (Summary 속성)
  - 발행일 (상대적 시간: "3일 전")
  - 카테고리 뱃지
  - 태그 목록
- **기능**:
  - 최근 발행된 글 순서로 정렬 (기본값)
  - 카테고리 필터 드롭다운 또는 사이드바
  - 검색 바 (상단 헤더)
- **페이지네이션**: 한 페이지당 9개 또는 12개 글 표시

### 6.2 글 상세 페이지 (`/posts/[slug]`)
- **헤더**:
  - 글 제목 (h1)
  - 발행일, 수정일 (있는 경우)
  - 카테고리 뱃지
  - 태그 목록
- **본문**:
  - Notion 페이지 내용 렌더링
  - 지원 블록 타입:
    - 텍스트 (제목, 단락, 리스트)
    - 코드 블록 (syntax highlighting)
    - 이미지
    - 인용구
    - 콜아웃
    - 구분선
- **네비게이션**:
  - 이전 글 / 다음 글 링크 (하단)
  - 목차 (Table of Contents, 사이드바 - 옵션)

### 6.3 카테고리 페이지 (`/categories/[category]`)
- 선택한 카테고리의 글 목록
- 홈 페이지와 동일한 레이아웃
- 카테고리 제목 및 설명 (상단)
- 해당 카테고리의 글 개수 표시

### 6.4 공통 레이아웃
- **헤더**:
  - 블로그 로고/제목
  - 네비게이션 메뉴 (홈, 카테고리, About)
  - 검색 아이콘/버튼
  - 다크모드 토글
- **푸터**:
  - 저작권 정보
  - 소셜 미디어 링크
  - RSS 피드 링크 (추후)

## 7. MVP 범위

### 포함 기능 (Phase 1)
✅ **필수 구현**
- Notion API 연동 및 데이터 fetching
- 글 목록 페이지 (홈)
- 글 상세 페이지
- 카테고리 필터링
- 기본 Notion 블록 렌더링 (텍스트, 제목, 리스트, 코드 블록, 이미지)
- 기본 스타일링 (shadcn/ui + Tailwind CSS)
- 반응형 디자인
- 다크모드 지원
- SEO 메타 태그 (제목, 설명, OG 이미지)

### 제외 기능 (추후 개발)
⏳ **Phase 2 이후**
- 댓글 시스템 (Giscus 또는 Utterances)
- 좋아요/조회수 기능
- 다국어 지원 (i18n)
- RSS 피드 생성
- 고급 검색 (전문 검색)
- 태그 페이지
- 관련 글 추천
- 목차 자동 생성
- 읽기 시간 예상
- 코드 복사 버튼

## 8. 구현 단계

### Phase 1: 환경 설정 (1-2일)

#### 1.1 Notion API 설정
1. Notion 워크스페이스에서 Integration 생성
   - https://www.notion.so/my-integrations
   - Integration 이름: "개인 블로그"
   - 권한: Read content
2. API 키 발급 및 저장
3. Notion 데이터베이스 생성
   - 위에서 정의한 속성 구조대로 생성
   - Integration에 데이터베이스 공유
4. 데이터베이스 ID 확인 및 저장

#### 1.2 프로젝트 설정
```bash
# Notion API 패키지 설치
npm install @notionhq/client

# 추가 패키지 (필요시)
npm install date-fns         # 날짜 포매팅
npm install react-markdown   # 마크다운 렌더링 (옵션)
```

#### 1.3 환경 변수 설정
`.env.local` 파일 생성:
```env
NOTION_API_KEY=secret_xxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxx
```

`.env.example` 파일 생성 (Git에 포함):
```env
NOTION_API_KEY=your_notion_api_key_here
NOTION_DATABASE_ID=your_database_id_here
```

### Phase 2: 데이터 레이어 구현 (2-3일)

#### 2.1 Notion 클라이언트 설정
파일: `lib/notion.ts`
- Notion 클라이언트 초기화
- 환경 변수 검증

#### 2.2 타입 정의
파일: `types/notion.ts`
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
  content: NotionBlock[]
}

interface NotionBlock {
  // Notion 블록 타입 정의
}
```

#### 2.3 데이터 fetching 함수 구현
파일: `lib/notion-api.ts`
- `getPosts(filter?)`: 글 목록 가져오기
  - 필터: 카테고리, 태그, 검색어
  - 정렬: 발행일 내림차순
  - Status가 "Published"인 글만
- `getPostBySlug(slug)`: 개별 글 가져오기
  - Slug로 페이지 조회
  - 페이지 블록 내용 가져오기
- `getCategories()`: 카테고리 목록 가져오기
- `getTags()`: 태그 목록 가져오기

#### 2.4 캐싱 전략
- Next.js ISR(Incremental Static Regeneration) 활용
- `revalidate` 옵션 설정 (예: 60초)
```typescript
export const revalidate = 60 // 60초마다 재검증
```

### Phase 3: UI 구현 (3-4일)

#### 3.1 공통 컴포넌트
- `components/blog/post-card.tsx`: 글 카드 컴포넌트
- `components/blog/category-badge.tsx`: 카테고리 뱃지
- `components/blog/tag-list.tsx`: 태그 목록
- `components/blog/post-header.tsx`: 글 헤더 (상세 페이지)
- `components/blog/notion-renderer.tsx`: Notion 블록 렌더러

#### 3.2 글 목록 페이지
파일: `app/page.tsx`
```typescript
export default async function HomePage() {
  const posts = await getPosts()

  return (
    <div>
      <h1>최근 글</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
```

#### 3.3 글 상세 페이지
파일: `app/posts/[slug]/page.tsx`
```typescript
export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  return (
    <article>
      <PostHeader post={post} />
      <NotionRenderer blocks={post.content} />
    </article>
  )
}

// 정적 경로 생성
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map(post => ({ slug: post.slug }))
}
```

#### 3.4 카테고리 페이지
파일: `app/categories/[category]/page.tsx`
- 카테고리별 필터링된 글 목록
- 홈 페이지와 유사한 레이아웃

### Phase 4: 스타일링 및 최적화 (2-3일)

#### 4.1 shadcn/ui 컴포넌트 활용
```bash
# 필요한 컴포넌트 추가
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add button
npx shadcn@latest add separator
```

#### 4.2 반응형 디자인
- Tailwind breakpoints 활용
- 모바일 우선 (mobile-first) 접근
- 그리드 레이아웃 반응형 조정

#### 4.3 이미지 최적화
- `next/image` 컴포넌트 사용
- Notion 이미지 URL 프록시 (필요시)
- 블러 placeholder 적용

#### 4.4 로딩 상태
파일: `app/loading.tsx`, `app/posts/[slug]/loading.tsx`
- 스켈레톤 UI 구현
- Suspense 활용

#### 4.5 에러 처리
파일: `app/error.tsx`, `app/posts/[slug]/error.tsx`
- 에러 바운더리 구현
- 404 페이지 커스터마이징

#### 4.6 SEO 최적화
- 메타데이터 생성 함수 구현
```typescript
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug)

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      images: [post.cover],
    },
  }
}
```

### Phase 5: 테스트 및 배포 (1-2일)

#### 5.1 로컬 테스트
- 다양한 화면 크기에서 테스트
- Notion 데이터 변경 시 반영 확인
- 에러 케이스 테스트 (존재하지 않는 slug 등)

#### 5.2 성능 최적화
- Lighthouse 검사
- Core Web Vitals 확인
- 이미지 최적화 검증

#### 5.3 Vercel 배포
```bash
# Vercel CLI 설치
npm install -g vercel

# 배포
vercel
```

- 환경 변수 설정 (Vercel 대시보드)
- 도메인 연결 (옵션)

## 9. 성공 지표

### 기능적 지표
✅ **필수 달성 목표**
- Notion 데이터베이스의 글이 실시간으로 블로그에 반영됨 (60초 이내)
- Status가 "Published"인 글만 표시됨
- 모든 카테고리 필터가 정상 작동
- 모바일/태블릿/데스크톱에서 정상적으로 표시됨

### 성능 지표
🎯 **목표치**
- **페이지 로딩 속도**: 초기 로딩 3초 이내 (3G 네트워크 기준)
- **Lighthouse 점수**:
  - Performance: 90점 이상
  - Accessibility: 95점 이상
  - Best Practices: 90점 이상
  - SEO: 100점
- **Core Web Vitals**:
  - LCP (Largest Contentful Paint): 2.5초 이내
  - FID (First Input Delay): 100ms 이내
  - CLS (Cumulative Layout Shift): 0.1 이하

### 사용자 경험 지표
📊 **측정 항목**
- 페이지 이탈률 (Bounce Rate) < 60%
- 평균 세션 시간 > 2분
- 페이지/세션 > 2

## 10. 리스크 및 제약사항

### 기술적 제약사항

#### 10.1 Notion API Rate Limit
- **제한**: 초당 3 요청 (평균)
- **대응 방안**:
  - ISR(Incremental Static Regeneration) 활용
  - 데이터 캐싱 (60초 revalidate)
  - 빌드 타임에 정적 페이지 생성
  - 클라이언트 사이드에서 직접 API 호출 금지

#### 10.2 Notion 블록 타입 제한
- **제한**: 일부 고급 블록 타입은 API에서 제공되지 않음
  - 싱크 블록 (Synced blocks)
  - 데이터베이스 뷰
  - 일부 임베드 타입
- **대응 방안**:
  - 지원되는 블록만 렌더링
  - 지원되지 않는 블록은 대체 텍스트 표시
  - 단계적으로 블록 타입 지원 확대

#### 10.3 이미지 호스팅
- **제한**: Notion 이미지 URL은 만료됨 (1시간)
- **대응 방안**:
  - 이미지를 외부 CDN에 업로드 (옵션)
  - Notion URL을 Next.js Image Proxy로 처리
  - 이미지 캐싱 전략 수립

### 운영상 리스크

#### 10.4 데이터 일관성
- **리스크**: Notion에서 글 삭제/수정 시 블로그 반영 지연
- **대응**: ISR revalidate 주기 단축 (30초) 또는 On-Demand Revalidation

#### 10.5 Notion API 장애
- **리스크**: Notion API 다운타임 시 콘텐츠 접근 불가
- **대응**:
  - Fallback 데이터 캐싱
  - 에러 페이지에 안내 메시지 표시
  - Notion 상태 페이지 모니터링

### 보안 고려사항

#### 10.6 API 키 노출
- **리스크**: 프론트엔드에서 API 키 노출
- **대응**:
  - 서버 컴포넌트에서만 API 호출
  - 환경 변수를 클라이언트에 노출하지 않음
  - `.env.local` 파일을 Git에서 제외

#### 10.7 민감 정보
- **리스크**: 초안 또는 비공개 글이 노출될 가능성
- **대응**:
  - Status 필터링 철저히 구현
  - Notion 데이터베이스 권한 관리
  - 배포 전 테스트 데이터 확인

## 11. 타임라인 (예상)

### Week 1: 환경 설정 및 데이터 레이어
- **Day 1-2**: Notion API 설정, 데이터베이스 생성
- **Day 3-4**: 데이터 fetching 함수 구현
- **Day 5**: 타입 정의 및 캐싱 전략 수립
- **Day 6-7**: 데이터 레이어 테스트

### Week 2: UI 구현
- **Day 1-2**: 공통 컴포넌트 개발
- **Day 3-4**: 글 목록 페이지 구현
- **Day 5-7**: 글 상세 페이지 및 Notion 렌더러 구현

### Week 3: 스타일링 및 카테고리 기능
- **Day 1-3**: shadcn/ui 컴포넌트 스타일링
- **Day 4-5**: 카테고리 페이지 구현
- **Day 6-7**: 반응형 디자인 적용

### Week 4: 최적화 및 배포
- **Day 1-2**: 성능 최적화 (이미지, 로딩 속도)
- **Day 3-4**: SEO 메타데이터 구현
- **Day 5**: 통합 테스트
- **Day 6**: Vercel 배포
- **Day 7**: 최종 검증 및 문서화

**총 예상 기간**: 약 4주 (28일)

## 12. 참고 자료

### 공식 문서
- [Notion API 공식 문서](https://developers.notion.com/)
- [Notion SDK for JavaScript](https://github.com/makenotion/notion-sdk-js)
- [Next.js 16 문서](https://nextjs.org/docs)
- [shadcn/ui 컴포넌트 갤러리](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel 배포 가이드](https://vercel.com/docs)

### 오픈소스 참고 프로젝트
- [react-notion-x](https://github.com/NotionX/react-notion-x) - Notion 블록 렌더러
- [notion-blog](https://github.com/ijjk/notion-blog) - Notion 기반 블로그 예제
- [transitive-bullshit/nextjs-notion-starter-kit](https://github.com/transitive-bullshit/nextjs-notion-starter-kit)

### 유용한 도구
- [Notion API Playground](https://developers.notion.com/reference/intro)
- [Postman Notion API Collection](https://www.postman.com/notionhq/workspace/notion-s-api-workspace)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

### 추가 학습 자료
- [Next.js ISR 가이드](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [SEO 최적화 베스트 프랙티스](https://nextjs.org/learn/seo/introduction-to-seo)

---

**문서 버전**: 1.0.0
**마지막 업데이트**: 2026-02-07
**승인자**: -
**다음 리뷰 예정일**: 2026-02-21
