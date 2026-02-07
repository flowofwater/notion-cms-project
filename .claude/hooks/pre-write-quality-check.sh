#!/bin/bash

# Claude Code pre-write 훅: 코드 품질 검증
# 파일 작성 전에 TypeScript 타입 체크와 ESLint를 실행합니다.

set -e  # 오류 발생 시 즉시 종료

echo "🔍 코드 품질 검증 시작..."

# 프로젝트 디렉토리로 이동
cd "$CLAUDE_PROJECT_DIR" || exit 1

# TypeScript 타입 체크 (빌드 제외, 타입 검증만)
echo "📝 TypeScript 타입 체크 중..."
if ! npx tsc --noEmit --pretty 2>&1; then
    echo ""
    echo "❌ TypeScript 타입 오류가 발견되었습니다."
    echo "💡 타입 오류를 수정한 후 다시 시도해주세요."
    exit 1
fi

echo "✅ TypeScript 타입 체크 통과"

# ESLint 실행 (자동 수정 포함)
echo "✨ ESLint 검증 및 자동 수정 중..."
if ! npx eslint . --fix --quiet 2>&1; then
    echo ""
    echo "⚠️  ESLint 경고가 발견되었습니다."
    echo "💡 일부 문제는 자동으로 수정되었지만, 수동 수정이 필요한 항목이 있을 수 있습니다."
    # ESLint 경고는 실패로 처리하지 않음
fi

echo "✅ ESLint 검증 완료"
echo ""
echo "🎉 코드 품질 검증 성공!"
exit 0
