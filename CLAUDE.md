# Claude Next.js Starters 프로젝트 가이드

## 프로젝트 개요

Next.js 16과 최신 React 19 기반의 모던 웹 애플리케이션 스타터 템플릿입니다.
shadcn/ui 컴포넌트와 Tailwind CSS를 활용한 세련된 UI/UX를 제공합니다.

**주요 목적:**
- Next.js 프로젝트의 빠른 시작을 위한 보일러플레이트
- 모범 사례가 적용된 프로젝트 구조 제공
- 재사용 가능한 컴포넌트 라이브러리 포함

## 기술 스택

### 핵심 프레임워크
- **Next.js**: 16.1.6 (App Router)
- **React**: 19.2.3
- **TypeScript**: 5.x
- **Node.js**: 20.x 이상

### UI/스타일링
- **Tailwind CSS**: 4.x (최신 버전)
- **shadcn/ui**: New York 스타일
- **Radix UI**: 접근성 우선 헤드리스 컴포넌트
- **lucide-react**: 아이콘 라이브러리
- **next-themes**: 다크모드 지원

### 유틸리티
- **class-variance-authority**: 컴포넌트 variants 관리
- **tailwind-merge**: Tailwind 클래스 충돌 방지
- **react-responsive**: 반응형 디자인 훅
- **use-local-storage-state**: 로컬 스토리지 상태 관리

## 프로젝트 구조

```
claude-nextjs-starters/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # 홈페이지
│   ├── not-found.tsx        # 404 페이지
│   ├── globals.css          # 전역 스타일
│   └── about/               # About 페이지
│       └── page.tsx
├── components/              # React 컴포넌트
│   ├── ui/                 # shadcn/ui 컴포넌트 (재사용 가능한 기본 컴포넌트)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── sheet.tsx
│   │   └── ...
│   ├── layout/             # 레이아웃 컴포넌트
│   │   ├── main-layout.tsx
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── mobile-nav.tsx
│   ├── common/             # 공통 컴포넌트
│   │   ├── logo.tsx
│   │   ├── nav-link.tsx
│   │   └── theme-toggle.tsx
│   └── providers/          # Context Providers
│       └── theme-provider.tsx
├── hooks/                   # 커스텀 React Hooks
│   └── use-breakpoint.ts
├── lib/                     # 유틸리티 함수
│   ├── utils.ts            # 공통 유틸
│   └── constants.ts        # 상수 정의
├── types/                   # TypeScript 타입 정의
│   └── index.ts
├── public/                  # 정적 파일
├── .claude/                 # Claude Code 설정
│   ├── agents/             # 커스텀 에이전트
│   ├── hooks/              # Claude Code 훅
│   └── commands/           # 커스텀 명령어
└── components.json          # shadcn/ui 설정
```

## 디렉토리 규칙

### components/ui
- shadcn/ui로 생성된 기본 컴포넌트만 배치
- **직접 수정하지 말 것** (업데이트 시 덮어쓰기 가능)
- 새로운 UI 컴포넌트 추가: `npx shadcn@latest add [component-name]`

### components/layout
- 페이지 레이아웃 구조를 담당하는 컴포넌트
- header, footer, navigation 등

### components/common
- 프로젝트 전반에서 재사용되는 커스텀 컴포넌트
- ui 컴포넌트를 조합하여 만든 비즈니스 로직 포함 컴포넌트

### components/providers
- Context API Providers
- 전역 상태 관리 관련 컴포넌트

## 코딩 컨벤션

### TypeScript
- **strict 모드 활성화**: 타입 안정성 최대화
- **명시적 타입 선언**: 함수 파라미터와 리턴 타입 필수
- **any 사용 금지**: unknown 또는 구체적인 타입 사용

### 컴포넌트 작성
```typescript
// ✅ Good
interface ButtonProps {
  variant?: 'default' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Button({ variant = 'default', size = 'md', children }: ButtonProps) {
  // ...
}

// ❌ Bad - 타입 정의 없음
export function Button({ variant, size, children }) {
  // ...
}
```

### Import 순서
```typescript
// 1. React 관련
import React from 'react'
import { useState, useEffect } from 'react'

// 2. 외부 라이브러리
import { cn } from '@/lib/utils'

// 3. 내부 컴포넌트 (path alias 사용)
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'

// 4. 타입
import type { User } from '@/types'

// 5. 상대 경로
import './styles.css'
```

### Path Alias 사용
**절대 경로 사용 필수** (tsconfig.json의 `@/*` 매핑)
```typescript
// ✅ Good
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// ❌ Bad - 상대 경로
import { Button } from '../../../components/ui/button'
import { cn } from '../../lib/utils'
```

### 스타일링
- **Tailwind CSS 우선 사용**
- **cn() 유틸 함수**로 조건부 클래스 병합
```typescript
import { cn } from '@/lib/utils'

<div className={cn(
  'base-class',
  variant === 'primary' && 'primary-class',
  isActive && 'active-class'
)} />
```

### 파일 명명 규칙
- 컴포넌트: `kebab-case.tsx` (예: `theme-toggle.tsx`)
- 유틸리티: `kebab-case.ts` (예: `use-breakpoint.ts`)
- 타입: `kebab-case.ts` 또는 `index.ts`

## 개발 워크플로우

### 로컬 개발
```bash
npm run dev      # 개발 서버 시작 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 시작
npm run lint     # ESLint 검사
```

### 새로운 페이지 추가
1. `app/` 디렉토리에 폴더 생성
2. `page.tsx` 파일 작성
3. 필요시 `layout.tsx`, `loading.tsx`, `error.tsx` 추가

### 새로운 컴포넌트 추가
1. **shadcn/ui 컴포넌트**: `npx shadcn@latest add [component]`
2. **커스텀 컴포넌트**: 적절한 디렉토리에 생성
   - 재사용 가능 → `components/common/`
   - 레이아웃 → `components/layout/`

### 새로운 훅 추가
- `hooks/` 디렉토리에 `use-*.ts` 형식으로 생성

## Claude Code 통합

이 프로젝트는 Claude Code 최적화가 적용되어 있습니다.

### 훅 시스템
`.claude/hooks/` 디렉토리의 자동화 스크립트:
- **pre-write-quality-check.sh**: 파일 작성 전 품질 검사
- **post-write-e2e-test.sh**: 파일 작성 후 E2E 테스트
- **pre-commit-validation.sh**: 커밋 전 유효성 검사
- **slack-*.sh**: Slack 알림 통합

### 커스텀 에이전트
- **code-reviewer**: 코드 리뷰 전문 에이전트 (`.claude/agents/code-reviewer.md`)

### 커스텀 명령어
- `/commit`: 이모지와 컨벤셔널 커밋 메시지로 커밋 생성

### 환경 변수
- `.claude/hooks/.env`: Slack 웹훅 URL 등 민감 정보 (Git 무시됨)

## 주의사항 및 제약사항

### ⚠️ 절대 수정하지 말 것
- `components/ui/*`: shadcn/ui 자동 생성 컴포넌트
- `app/globals.css`의 Tailwind 기본 설정 (추가는 가능)
- `.next/`: Next.js 빌드 캐시

### ⚠️ 보안
- **환경변수**: `.env*` 파일은 절대 커밋하지 않음 (`.env.example` 제외)
- **API 키**: 클라이언트에서 사용하는 키는 `NEXT_PUBLIC_` 접두사 필수
- `.claude/hooks/.env`: Slack 웹훅 등 민감 정보 포함 (Git 무시됨)

### ⚠️ 성능
- **Client Component**: `'use client'`는 필요한 경우에만 사용
- **이미지**: `next/image` 컴포넌트 사용 (자동 최적화)
- **폰트**: `next/font`로 최적화된 폰트 로딩

### ⚠️ 빌드
- 프로덕션 배포 전 `npm run build` 로컬 테스트 필수
- TypeScript 에러는 빌드 실패로 이어짐

## 자주 사용하는 명령어

### shadcn/ui 컴포넌트 추가
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

### 타입 체크
```bash
npx tsc --noEmit
```

### Git 커밋 (Claude Code)
```bash
/commit  # Claude Code CLI에서 실행
```

## 참고 자료

- [Next.js 16 문서](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Claude Code 문서](https://github.com/anthropics/claude-code)

## 프로젝트 목표

1. **개발자 경험 최적화**: 타입 안정성과 자동 완성
2. **성능 우선**: Next.js 16의 최신 기능 활용
3. **접근성**: Radix UI로 WCAG 준수
4. **유지보수성**: 명확한 구조와 컨벤션
5. **확장성**: 새로운 기능 추가가 쉬운 아키텍처

---

**마지막 업데이트**: 2026-02-02
**유지관리자**: Claude Code Assistant
