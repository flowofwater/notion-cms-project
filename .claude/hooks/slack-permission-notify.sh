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

# 필요한 정보 추출 (Notification 이벤트용)
MESSAGE=$(echo "$INPUT" | jq -r '.message // "Unknown"')
NOTIFICATION_TYPE=$(echo "$INPUT" | jq -r '.notification_type // "Unknown"')
PROJECT_PATH=$(echo "$INPUT" | jq -r '.cwd // "Unknown"')
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // "Unknown"')

# 메시지 이스케이프 처리
MESSAGE_ESCAPED=$(echo "$MESSAGE" | sed 's/"/\\"/g' | sed "s/'/\\'/g")

# Slack 메시지 전송
curl -X POST "$SLACK_WEBHOOK_URL" \
  -H 'Content-Type: application/json' \
  -s -o /dev/null \
  -d @- <<EOF
{
  "text": "🔐 Claude Code 권한 요청",
  "blocks": [
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "🔐 권한 요청"
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*메시지:*\n$MESSAGE_ESCAPED"
      }
    },
    {
      "type": "section",
      "fields": [
        {
          "type": "mrkdwn",
          "text": "*알림 유형:*\n\`$NOTIFICATION_TYPE\`"
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
        "text": "*경로:*\n\`$PROJECT_PATH\`"
      }
    }
  ]
}
EOF

exit 0
