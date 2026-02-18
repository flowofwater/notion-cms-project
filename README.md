# Notion CMS 개인 개발 블로그

Notion을 CMS로 활용하는 개인 개발 블로그입니다. Notion에서 글을 작성하면 ISR을 통해 자동으로 블로그에 반영됩니다.

## 기술 스택

- **Next.js** 16.1.6 (App Router, ISR)
- **React** 19.2.3
- **TypeScript** 5.x
- **Tailwind CSS** 4.x
- **shadcn/ui** New York 스타일
- **Notion API** @notionhq/client

## 주요 기능

- Notion 데이터베이스 실시간 연동 (ISR, 60초 재검증)
- 블로그 글 목록 및 상세 페이지
- Notion 블록 렌더링 (제목, 단락, 코드, 이미지, 리스트, 인용구, 콜아웃 등)
- 카테고리별 필터링
- 제목/요약 검색
- 다크모드 지원
- 반응형 디자인 (모바일/태블릿/데스크톱)
- SEO 최적화 (OG 태그, Twitter Card)

## 빠른 시작

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일 생성:

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxx
```

### 3. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인

## Notion 설정

### Integration 생성

1. [Notion Integrations](https://www.notion.so/my-integrations) 접속
2. "New integration" 생성 (권한: Read content)
3. API 키 복사 → `NOTION_API_KEY`에 저장

### 데이터베이스 구조

| 속성명 | 타입 | 필수 | 설명 |
|--------|------|------|------|
| Title | title | ✅ | 글 제목 |
| Category | select | ✅ | 카테고리 |
| Published | date | ✅ | 발행일 |
| Status | select | ✅ | `게시` (공개) / `편집중` (비공개) |
| Slug | rich_text | ⚪ | URL 경로 (없으면 제목으로 자동 생성) |
| Tags | multi_select | ⚪ | 태그 목록 |
| Summary | rich_text | ⚪ | 글 요약 |
| Cover | files | ⚪ | 커버 이미지 |

> **주의**: Status 값은 영어가 아닌 한국어(`게시`, `편집중`)로 입력해야 합니다.

### 데이터베이스 공유

데이터베이스 우측 상단 `•••` → `Connections` → 생성한 Integration 연결

## 페이지 구조

```
/                          홈 (글 목록 + 검색)
/posts/[slug]              글 상세
/categories                카테고리 목록
/categories/[category]     카테고리별 글 목록
```

## 개발 명령어

```bash
npm run dev        # 개발 서버
npm run build      # 프로덕션 빌드
npm run start      # 프로덕션 서버
npm run lint       # ESLint 검사
npx tsc --noEmit   # TypeScript 타입 체크
```

## Vercel 배포

1. GitHub 저장소에 푸시
2. [Vercel](https://vercel.com)에서 Import
3. 환경 변수 추가: `NOTION_API_KEY`, `NOTION_DATABASE_ID`
4. Deploy

## 프로젝트 구조

```
app/
├── layout.tsx              루트 레이아웃
├── page.tsx                홈 (글 목록 + 검색)
├── error.tsx               전역 에러 바운더리
├── not-found.tsx           404 페이지
├── posts/[slug]/           글 상세
│   ├── page.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── error.tsx
└── categories/
    ├── page.tsx            카테고리 목록
    └── [category]/
        ├── page.tsx
        ├── loading.tsx
        ├── not-found.tsx
        └── error.tsx
components/
├── blog/                   블로그 전용 컴포넌트
├── common/                 공통 컴포넌트
├── layout/                 헤더, 푸터
├── providers/              Context Providers
└── ui/                     shadcn/ui 컴포넌트
lib/
├── notion.ts               Notion 클라이언트
├── notion-api.ts           데이터 fetching 함수
└── constants.ts            사이트 설정 상수
types/
└── index.ts                TypeScript 타입 정의
```

## 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [Notion API 문서](https://developers.notion.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
