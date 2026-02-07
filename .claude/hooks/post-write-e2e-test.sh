#!/bin/bash

# Claude Code post-write 훅: Playwright E2E 테스트 자동 실행
# 컴포넌트나 페이지 파일 수정 후 자동으로 E2E 테스트를 실행합니다.

set -e  # 오류 발생 시 즉시 종료

# 프로젝트 디렉토리로 이동
cd "$CLAUDE_PROJECT_DIR" || exit 1

# CLAUDE_MODIFIED_FILE 환경 변수가 없으면 모든 변경 사항 확인
if [ -z "$CLAUDE_MODIFIED_FILE" ]; then
    # Git으로 최근 변경된 파일 확인
    MODIFIED_FILES=$(git diff --name-only HEAD 2>/dev/null || echo "")
else
    MODIFIED_FILES="$CLAUDE_MODIFIED_FILE"
fi

# 컴포넌트 또는 페이지 파일이 수정되었는지 확인
if echo "$MODIFIED_FILES" | grep -qE '(components|app)/.*\.(tsx?|jsx?)$'; then
    echo "🎭 컴포넌트/페이지 파일이 수정되었습니다."

    # Playwright가 설치되어 있는지 확인
    if ! command -v playwright &> /dev/null && ! npx playwright --version &> /dev/null; then
        echo "⚠️  Playwright가 설치되어 있지 않습니다."
        echo "💡 설치 방법: npm install -D @playwright/test && npx playwright install"
        echo "💡 MCP 서버만 활성화되어 있고, Playwright 자체는 아직 설치되지 않았습니다."
        exit 0
    fi

    # Playwright 테스트 파일이 있는지 확인
    if [ ! -d "tests" ] && [ ! -d "e2e" ] && [ ! -f "playwright.config.ts" ]; then
        echo "⚠️  Playwright 테스트 파일이 없습니다."
        echo "💡 테스트를 작성한 후 다시 실행해주세요."
        exit 0
    fi

    echo "🎭 Playwright E2E 테스트 실행 중..."

    # 백그라운드에서 개발 서버 실행 (이미 실행 중이면 스킵)
    if ! lsof -i :3000 &> /dev/null; then
        echo "🚀 개발 서버 시작 중..."
        npm run dev &
        DEV_PID=$!

        # 서버가 시작될 때까지 대기 (최대 30초)
        echo "⏳ 서버 준비 중..."
        for i in {1..30}; do
            if lsof -i :3000 &> /dev/null; then
                echo "✅ 개발 서버 준비 완료"
                break
            fi
            sleep 1
        done
    else
        echo "✅ 개발 서버가 이미 실행 중입니다."
        DEV_PID=""
    fi

    # E2E 테스트 실행
    if npx playwright test --reporter=line 2>&1; then
        echo "✅ E2E 테스트 통과"
    else
        echo "❌ E2E 테스트 실패"

        # 개발 서버 종료
        if [ -n "$DEV_PID" ]; then
            kill "$DEV_PID" 2>/dev/null || true
        fi

        exit 1
    fi

    # 개발 서버 종료
    if [ -n "$DEV_PID" ]; then
        echo "🛑 개발 서버 종료 중..."
        kill "$DEV_PID" 2>/dev/null || true
    fi

    echo "🎉 E2E 테스트 완료!"
else
    echo "ℹ️  컴포넌트/페이지 파일이 아니므로 E2E 테스트를 스킵합니다."
fi

exit 0
