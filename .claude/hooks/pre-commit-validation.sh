#!/bin/bash

# Git pre-commit 훅: 커밋 전 코드 품질 검증
# Claude Code가 git commit을 실행하기 전에 자동으로 품질 검증을 수행합니다.

set -e  # 오류 발생 시 즉시 종료

echo "🚀 Git 커밋 전 검증 시작..."

# 프로젝트 디렉토리로 이동
cd "$CLAUDE_PROJECT_DIR" || cd "$(git rev-parse --show-toplevel)" || exit 1

# 스테이징된 파일 목록 가져오기
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM)

if [ -z "$STAGED_FILES" ]; then
    echo "⚠️  스테이징된 파일이 없습니다."
    exit 0
fi

# TypeScript/React 파일 필터링
TS_FILES=$(echo "$STAGED_FILES" | grep -E '\.(ts|tsx)$' || true)

if [ -n "$TS_FILES" ]; then
    echo "📝 TypeScript 타입 체크 중..."

    # 스테이징된 TS 파일만 타입 체크
    if ! npx tsc --noEmit --pretty 2>&1; then
        echo ""
        echo "❌ TypeScript 타입 오류: 커밋이 차단되었습니다."
        echo "💡 타입 오류를 수정한 후 다시 커밋해주세요."
        exit 1
    fi

    echo "✅ TypeScript 타입 체크 통과"
fi

# JavaScript/TypeScript 파일 ESLint 검증
LINT_FILES=$(echo "$STAGED_FILES" | grep -E '\.(ts|tsx|js|jsx)$' || true)

if [ -n "$LINT_FILES" ]; then
    echo "✨ ESLint 검증 중..."

    # shellcheck disable=SC2086
    if ! echo "$LINT_FILES" | xargs npx eslint --max-warnings=0 2>&1; then
        echo ""
        echo "❌ ESLint 오류: 커밋이 차단되었습니다."
        echo "💡 린트 오류를 수정한 후 다시 커밋해주세요."
        echo "💡 자동 수정: npx eslint . --fix"
        exit 1
    fi

    echo "✅ ESLint 검증 통과"
fi

echo ""
echo "🎉 커밋 전 검증 완료!"
exit 0
