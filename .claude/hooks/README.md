# Claude Code 훅 시스템 가이드

이 프로젝트는 코드 품질을 자동으로 관리하기 위한 3가지 Claude Code 훅을 포함하고 있습니다.

## 구현된 훅 목록

### 1. 코드 품질 검증 훅 (PreToolUse)

**파일**: `pre-write-quality-check.sh`

**동작 시점**: Claude Code가 파일을 작성하기 전

**기능**:
- TypeScript 타입 체크 (`tsc --noEmit`)
- ESLint 자동 수정 및 검증 (`eslint --fix`)

**효과**:
- 코드 작성 전에 타입 오류를 조기에 발견
- 자동 포맷팅으로 코드 스타일 일관성 유지
- 린트 문제를 실시간으로 해결

**예시 출력**:
```
🔍 코드 품질 검증 시작...
📝 TypeScript 타입 체크 중...
✅ TypeScript 타입 체크 통과
✨ ESLint 검증 및 자동 수정 중...
✅ ESLint 검증 완료
🎉 코드 품질 검증 성공!
```

---

### 2. E2E 테스트 자동 실행 훅 (PostToolUse)

**파일**: `post-write-e2e-test.sh`

**동작 시점**: Claude Code가 파일을 작성한 후

**기능**:
- 컴포넌트/페이지 파일(`components/*`, `app/*`) 수정 시에만 실행
- Playwright E2E 테스트 자동 실행
- 개발 서버 자동 시작/종료

**요구사항**:
- Playwright 설치: `npm install -D @playwright/test`
- 브라우저 설치: `npx playwright install`
- 테스트 파일 작성 (예: `tests/` 또는 `e2e/`)

**효과**:
- 컴포넌트 수정 시 자동으로 UI 테스트 실행
- 회귀 테스트로 기존 기능 보호
- 테스트 실패 즉시 감지

**예시 출력**:
```
🎭 컴포넌트/페이지 파일이 수정되었습니다.
🚀 개발 서버 시작 중...
✅ 개발 서버 준비 완료
🎭 Playwright E2E 테스트 실행 중...
✅ E2E 테스트 통과
🎉 E2E 테스트 완료!
```

**참고**: Playwright가 설치되지 않은 경우, 안내 메시지만 표시하고 스킵됩니다.

---

### 3. Git 커밋 품질 검증 훅 (Git pre-commit)

**파일**: `pre-commit-validation.sh`

**동작 시점**: `git commit` 실행 전 (Git 훅)

**기능**:
- 스테이징된 TypeScript 파일만 타입 체크
- 스테이징된 JavaScript/TypeScript 파일만 ESLint 검증
- 검증 실패 시 커밋 차단

**효과**:
- 잘못된 코드가 커밋되는 것을 방지
- 팀원들과 일관된 코드 품질 유지
- CI/CD 파이프라인에서 오류 감소

**예시 출력**:
```
🚀 Git 커밋 전 검증 시작...
📝 TypeScript 타입 체크 중...
✅ TypeScript 타입 체크 통과
✨ ESLint 검증 중...
✅ ESLint 검증 통과
🎉 커밋 전 검증 완료!
```

---

## 설치 방법

### Claude Code 훅 (자동 활성화)

훅 #1 (PreToolUse)과 훅 #2 (PostToolUse)는 `.claude/settings.local.json`에 이미 설정되어 있어 **자동으로 활성화**됩니다.

추가 설치 작업이 필요하지 않습니다!

### Git 훅 (수동 설치 필요)

훅 #3 (Git pre-commit)은 Git의 훅 시스템을 사용하므로 별도로 설치해야 합니다.

#### 설치 명령:

```bash
# 자동 설치 스크립트 실행
./.claude/hooks/install-git-hooks.sh
```

#### 수동 설치 (선택사항):

```bash
# 심볼릭 링크 생성
ln -s ../../.claude/hooks/pre-commit-validation.sh .git/hooks/pre-commit

# 또는 파일 복사
cp .claude/hooks/pre-commit-validation.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

#### 제거 방법:

```bash
# Git 훅 제거
rm .git/hooks/pre-commit

# 기존 훅 복원 (백업이 있는 경우)
mv .git/hooks/pre-commit.backup .git/hooks/pre-commit
```

---

## 훅 비활성화 방법

### 특정 훅 비활성화

`.claude/settings.local.json`에서 해당 훅 섹션을 주석 처리하거나 제거:

```json
{
  "hooks": {
    // "PreToolUse": [...],  // 코드 품질 검증 훅 비활성화
    "PostToolUse": [...],
    "Notification": [...],
    "Stop": [...]
  }
}
```

### 모든 훅 비활성화

`.claude/settings.local.json`에 추가:

```json
{
  "disableAllHooks": true
}
```

### Git 훅 일시적으로 스킵

```bash
# 특정 커밋만 훅 스킵
git commit --no-verify -m "커밋 메시지"
```

---

## 문제 해결

### TypeScript 타입 체크 실패

```bash
# 타입 오류 확인
npx tsc --noEmit

# 타입 정의 설치
npm install -D @types/node @types/react @types/react-dom
```

### ESLint 검증 실패

```bash
# 자동 수정 시도
npx eslint . --fix

# 특정 파일 검증
npx eslint src/components/Button.tsx
```

### E2E 테스트 실패

```bash
# Playwright 설치 확인
npx playwright --version

# 브라우저 재설치
npx playwright install

# 테스트 실행 (수동)
npx playwright test
```

### 개발 서버 포트 충돌

```bash
# 포트 3000이 이미 사용 중인 경우
lsof -i :3000
kill -9 <PID>
```

---

## 추가 기능

### Slack 알림 통합

이 프로젝트는 이미 Slack 알림 훅도 포함하고 있습니다:

- `slack-permission-notify.sh`: 권한 요청 시 Slack 알림
- `slack-completion-notify.sh`: 작업 완료 시 Slack 알림

Slack 웹훅 URL은 `.claude/hooks/.env`에 설정되어 있습니다.

---

## 커스터마이징

### 타입 체크 옵션 변경

`pre-write-quality-check.sh` 또는 `pre-commit-validation.sh`에서:

```bash
# strict 모드 추가
npx tsc --noEmit --strict

# 특정 프로젝트만 체크
npx tsc --noEmit --project tsconfig.json
```

### ESLint 규칙 변경

```bash
# 경고를 오류로 처리
npx eslint . --max-warnings=0

# 자동 수정 비활성화
npx eslint .  # --fix 제거
```

### E2E 테스트 범위 변경

`post-write-e2e-test.sh`에서 매처 패턴 수정:

```bash
# 모든 TypeScript 파일에 대해 실행
if echo "$MODIFIED_FILES" | grep -qE '\.(tsx?|jsx?)$'; then
```

---

## 권장 워크플로우

1. **로컬 개발**
   - Claude Code가 코드 작성 시 자동으로 품질 검증 (PreToolUse 훅)
   - 파일 저장 후 E2E 테스트 자동 실행 (PostToolUse 훅)

2. **커밋 전**
   - Git pre-commit 훅이 자동으로 품질 검증
   - 검증 통과 후 커밋 생성

3. **CI/CD**
   - 동일한 검증 스크립트를 CI 파이프라인에서도 사용
   - 일관된 품질 기준 유지

---

## 참고 문서

- [Claude Code 공식 문서](https://docs.anthropic.com/claude-code)
- [Playwright 공식 문서](https://playwright.dev)
- [Git Hooks 가이드](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- [TypeScript 컴파일러 옵션](https://www.typescriptlang.org/tsconfig)
- [ESLint 설정 가이드](https://eslint.org/docs/user-guide/configuring/)

---

## 기여하기

훅 스크립트 개선 사항이나 버그 리포트는 프로젝트 이슈 트래커에 제보해주세요.

---

**작성일**: 2026-02-02
**Claude Code 버전**: Sonnet 4.5
**프로젝트**: Claude Next.js Starter Kit
