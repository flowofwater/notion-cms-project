#!/bin/bash

# Git 훅 설치 스크립트
# pre-commit 훅을 .git/hooks에 설치합니다.

set -e

echo "🔧 Git 훅 설치 시작..."

# 프로젝트 루트로 이동
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/../.." && pwd )"

cd "$PROJECT_ROOT" || exit 1

# Git 저장소 확인
if [ ! -d ".git" ]; then
    echo "❌ Git 저장소가 아닙니다."
    exit 1
fi

# .git/hooks 디렉토리 확인 및 생성
if [ ! -d ".git/hooks" ]; then
    mkdir -p .git/hooks
    echo "✅ .git/hooks 디렉토리 생성"
fi

# pre-commit 훅 설치
PRE_COMMIT_SOURCE=".claude/hooks/pre-commit-validation.sh"
PRE_COMMIT_DEST=".git/hooks/pre-commit"

if [ -f "$PRE_COMMIT_DEST" ]; then
    echo "⚠️  기존 pre-commit 훅이 존재합니다."
    echo "   백업 생성: $PRE_COMMIT_DEST.backup"
    mv "$PRE_COMMIT_DEST" "$PRE_COMMIT_DEST.backup"
fi

# 심볼릭 링크 생성 (상대 경로 사용)
ln -s "../../$PRE_COMMIT_SOURCE" "$PRE_COMMIT_DEST"

echo "✅ pre-commit 훅 설치 완료"
echo ""
echo "📝 설치된 훅:"
echo "   - pre-commit: TypeScript 타입 체크 + ESLint 검증"
echo ""
echo "💡 훅을 제거하려면: rm .git/hooks/pre-commit"
echo "💡 기존 훅 복원: mv .git/hooks/pre-commit.backup .git/hooks/pre-commit"
echo ""
echo "🎉 Git 훅 설치가 완료되었습니다!"
