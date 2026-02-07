# Notion CMS 기반 개인 개발 블로그

Notion을 CMS로 활용하는 개인 개발 블로그 웹 애플리케이션입니다. Next.js 16과 React 19를 기반으로 구축되었으며, shadcn/ui와 Tailwind CSS로 세련된 UI를 제공합니다.

## 📋 프로젝트 개요

Notion에서 작성한 글을 자동으로 동기화하여 블로그에 표시하는 프로젝트입니다. Notion의 강력한 에디터 기능을 활용하면서도, 커스터마이징 가능한 독립적인 블로그 플랫폼을 제공합니다.

### 주요 특징

- 🎨 **Notion CMS**: Notion을 콘텐츠 관리 시스템으로 활용
- ⚡ **Next.js 16**: App Router와 Server Components 사용
- 🎯 **TypeScript**: 타입 안정성 보장
- 💅 **shadcn/ui**: 재사용 가능한 고품질 UI 컴포넌트
- 🌙 **다크모드**: next-themes를 활용한 테마 전환
- 📱 **반응형 디자인**: 모든 디바이스에서 최적화된 경험
- 🚀 **ISR**: Incremental Static Regeneration으로 성능 최적화

## 🛠️ 기술 스택

### Frontend
- **Next.js**: 16.1.6
- **React**: 19.2.3
- **TypeScript**: 5.x
- **Tailwind CSS**: 4.x
- **shadcn/ui**: New York 스타일
- **Lucide React**: 아이콘 라이브러리

### Backend/CMS
- **Notion API**: @notionhq/client

### 배포
- **Vercel**: Next.js 최적화된 호스팅

## 📁 프로젝트 구조

```
notion-cms-project/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # 홈페이지
│   ├── globals.css          # 전역 스타일
│   └── about/               # About 페이지
├── components/              # React 컴포넌트
│   ├── ui/                 # shadcn/ui 컴포넌트
│   ├── layout/             # 레이아웃 컴포넌트
│   ├── common/             # 공통 컴포넌트
│   └── providers/          # Context Providers
├── hooks/                   # 커스텀 React Hooks
├── lib/                     # 유틸리티 함수
├── types/                   # TypeScript 타입 정의
├── docs/                    # 프로젝트 문서
│   └── PRD.md              # 제품 요구사항 문서
└── public/                  # 정적 파일
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 20.x 이상
- npm, yarn, pnpm 또는 bun

### 설치

```bash
# 저장소 클론
git clone https://github.com/YOUR_USERNAME/notion-cms-project.git

# 디렉토리 이동
cd notion-cms-project

# 의존성 설치
npm install
```

### 환경 변수 설정

`.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
NOTION_API_KEY=your_notion_api_key_here
NOTION_DATABASE_ID=your_database_id_here
```

**Notion API 키 발급 방법:**
1. [Notion Integrations](https://www.notion.so/my-integrations) 페이지 접속
2. "New integration" 버튼 클릭
3. Integration 이름 입력 및 권한 설정 (Read content)
4. API 키 복사
5. Notion 데이터베이스에 Integration 연결

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 📝 사용 가능한 스크립트

```bash
npm run dev      # 개발 서버 시작
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 시작
npm run lint     # ESLint 검사
```

## 📚 문서

프로젝트에 대한 자세한 정보는 다음 문서를 참조하세요:

- [PRD (Product Requirements Document)](./docs/PRD.md) - 제품 요구사항 문서
- [Claude.md](./CLAUDE.md) - 프로젝트 가이드 및 코딩 컨벤션

## 🔧 개발 가이드

### 새로운 페이지 추가

```bash
# app 디렉토리에 새 폴더 생성
mkdir app/new-page

# page.tsx 파일 생성
touch app/new-page/page.tsx
```

### shadcn/ui 컴포넌트 추가

```bash
npx shadcn@latest add [component-name]

# 예시
npx shadcn@latest add button
npx shadcn@latest add card
```

### 커스텀 컴포넌트 추가

- 재사용 가능한 컴포넌트: `components/common/`
- 레이아웃 컴포넌트: `components/layout/`
- UI 기본 컴포넌트: `components/ui/` (shadcn/ui 전용)

## 🎯 로드맵

### Phase 1 (현재)
- [x] 프로젝트 초기 설정
- [x] PRD 문서 작성
- [ ] Notion API 연동
- [ ] 블로그 글 목록 페이지
- [ ] 블로그 글 상세 페이지

### Phase 2 (예정)
- [ ] 카테고리 필터링
- [ ] 검색 기능
- [ ] SEO 최적화
- [ ] 성능 최적화

### Phase 3 (향후)
- [ ] 댓글 시스템
- [ ] RSS 피드
- [ ] 다국어 지원

## 🤝 기여하기

이슈와 풀 리퀘스트를 환영합니다!

1. 저장소 Fork
2. Feature 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🔗 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [Notion API 문서](https://developers.notion.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 👨‍💻 제작자

**개인 개발 블로그 프로젝트**

---

**마지막 업데이트**: 2026-02-07
