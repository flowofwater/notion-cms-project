#!/bin/bash

# .env 파일에서 Slack 웹훅 URL 로드
SCRIPT_DIR="$(dirname "$0")"
ENV_FILE="$SCRIPT_DIR/.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "경고: .env 파일이 존재하지 않습니다: $ENV_FILE" >&2
  exit 0
fi

source "$ENV_FILE"

if [ -z "$SLACK_WEBHOOK_URL" ]; then
  echo "경고: SLACK_WEBHOOK_URL이 설정되지 않았습니다" >&2
  exit 0
fi

# stdin으로 받은 JSON 파싱
INPUT=$(cat)

# jq가 설치되어 있는지 확인
if ! command -v jq &> /dev/null; then
  echo "경고: jq가 설치되지 않았습니다. brew install jq를 실행하세요" >&2
  exit 0
fi

# 필요한 정보 추출
TRANSCRIPT_PATH=$(echo "$INPUT" | jq -r '.transcript_path // ""')
PROJECT_PATH=$(echo "$INPUT" | jq -r '.cwd // "Unknown"')
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // "Unknown"')
COMPLETION_TIME=$(date '+%Y-%m-%d %H:%M:%S')

# transcript에서 마지막 사용자 메시지 추출
TASK_SUMMARY="작업 완료"
if [ -f "$TRANSCRIPT_PATH" ]; then
  # 마지막 사용자 메시지 추출 (최근 20줄에서 검색)
  LAST_USER_MSG=$(tail -n 20 "$TRANSCRIPT_PATH" | grep '"role":"user"' | tail -n 1 | jq -r '.content // ""' 2>/dev/null || echo "")

  if [ -n "$LAST_USER_MSG" ]; then
    # 첫 100자만 추출하고, 줄바꿈을 공백으로 변환
    TASK_SUMMARY=$(echo "$LAST_USER_MSG" | tr '\n' ' ' | cut -c 1-100)
    if [ ${#LAST_USER_MSG} -gt 100 ]; then
      TASK_SUMMARY="${TASK_SUMMARY}..."
    fi
  fi
fi

# 이스케이프 처리
TASK_SUMMARY=$(echo "$TASK_SUMMARY" | sed 's/"/\\"/g' | sed "s/'/\\'/g")

# Slack 메시지 전송
curl -X POST "$SLACK_WEBHOOK_URL" \
  -H 'Content-Type: application/json' \
  -s -o /dev/null \
  -d @- <<EOF
{
  "text": "✅ Claude Code 작업 완료",
  "blocks": [
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "✅ 작업 완료"
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*작업:*\n$TASK_SUMMARY"
      }
    },
    {
      "type": "section",
      "fields": [
        {
          "type": "mrkdwn",
          "text": "*경로:*\n\`$PROJECT_PATH\`"
        },
        {
          "type": "mrkdwn",
          "text": "*세션:*\n\`${SESSION_ID:0:8}...\`"
        }
      ]
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*완료 시각:*\n$COMPLETION_TIME"
      }
    }
  ]
}
EOF

exit 0
