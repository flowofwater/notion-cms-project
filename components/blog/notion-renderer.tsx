/**
 * Notion 블록 렌더러
 * Notion API에서 가져온 블록을 React 컴포넌트로 렌더링
 */

'use client'

import { cn } from '@/lib/utils'

interface NotionRendererProps {
  /** Notion 블록 배열 */
  blocks: any[]
}

/**
 * Notion 리치 텍스트 렌더링
 */
function RichText({ richText }: { richText: any[] }) {
  if (!richText || richText.length === 0) return null

  return (
    <>
      {richText.map((text: any, index: number) => {
        const { annotations, plain_text, href } = text
        const { bold, italic, strikethrough, underline, code } = annotations || {}

        let element = <span key={index}>{plain_text}</span>

        if (code) {
          element = (
            <code
              key={index}
              className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm"
            >
              {plain_text}
            </code>
          )
        }

        if (bold) element = <strong key={index}>{element}</strong>
        if (italic) element = <em key={index}>{element}</em>
        if (strikethrough) element = <s key={index}>{element}</s>
        if (underline) element = <u key={index}>{element}</u>

        if (href) {
          element = (
            <a
              key={index}
              href={href}
              className="text-primary underline underline-offset-4 hover:text-primary/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              {element}
            </a>
          )
        }

        return element
      })}
    </>
  )
}

/**
 * 개별 Notion 블록 렌더링
 */
function NotionBlock({ block }: { block: any }) {
  const { type, id } = block

  switch (type) {
    // 단락
    case 'paragraph': {
      const { paragraph } = block
      return (
        <p className="my-4 leading-7">
          <RichText richText={paragraph.rich_text} />
        </p>
      )
    }

    // 제목 1
    case 'heading_1': {
      const { heading_1 } = block
      return (
        <h1
          id={id}
          className="mb-4 mt-8 scroll-m-20 text-4xl font-bold tracking-tight"
        >
          <RichText richText={heading_1.rich_text} />
        </h1>
      )
    }

    // 제목 2
    case 'heading_2': {
      const { heading_2 } = block
      return (
        <h2
          id={id}
          className="mb-4 mt-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
        >
          <RichText richText={heading_2.rich_text} />
        </h2>
      )
    }

    // 제목 3
    case 'heading_3': {
      const { heading_3 } = block
      return (
        <h3
          id={id}
          className="mb-4 mt-6 scroll-m-20 text-2xl font-semibold tracking-tight"
        >
          <RichText richText={heading_3.rich_text} />
        </h3>
      )
    }

    // 비순서 목록
    case 'bulleted_list_item': {
      const { bulleted_list_item } = block
      return (
        <li className="my-2 ml-6 list-disc">
          <RichText richText={bulleted_list_item.rich_text} />
        </li>
      )
    }

    // 순서 목록
    case 'numbered_list_item': {
      const { numbered_list_item } = block
      return (
        <li className="my-2 ml-6 list-decimal">
          <RichText richText={numbered_list_item.rich_text} />
        </li>
      )
    }

    // 인용구
    case 'quote': {
      const { quote } = block
      return (
        <blockquote className="my-5 border-l-4 border-primary py-1 pl-5">
          <div className="italic text-muted-foreground">
            <RichText richText={quote.rich_text} />
          </div>
        </blockquote>
      )
    }

    // 코드 블록
    case 'code': {
      const { code } = block
      const codeText = code.rich_text.map((t: any) => t.plain_text).join('')
      const language = code.language || 'plain text'
      return (
        <div className="my-6 overflow-hidden rounded-xl border border-border/50 bg-zinc-950 dark:bg-zinc-900">
          <div className="flex items-center border-b border-white/10 bg-white/5 px-4 py-2">
            <span className="text-xs font-medium text-zinc-400">{language}</span>
          </div>
          <pre className="overflow-x-auto p-4">
            <code className="font-mono text-sm text-zinc-100">{codeText}</code>
          </pre>
        </div>
      )
    }

    // 이미지
    case 'image': {
      const { image } = block
      const src =
        image.type === 'external' ? image.external.url : image.file?.url
      const caption = image.caption?.[0]?.plain_text || ''

      if (!src) return null

      return (
        <figure className="my-6">
          <img
            src={src}
            alt={caption}
            className="rounded-lg border"
            loading="lazy"
          />
          {caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {caption}
            </figcaption>
          )}
        </figure>
      )
    }

    // 콜아웃
    case 'callout': {
      const { callout } = block
      const icon =
        callout.icon?.type === 'emoji' ? callout.icon.emoji : '💡'

      return (
        <div className="my-5 flex gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <div className="mt-0.5 text-xl">{icon}</div>
          <div className="flex-1 text-sm leading-relaxed">
            <RichText richText={callout.rich_text} />
          </div>
        </div>
      )
    }

    // 구분선
    case 'divider': {
      return <hr className="my-8 border-border" />
    }

    // To-do 항목
    case 'to_do': {
      const { to_do } = block
      return (
        <div className="my-2 flex items-start gap-2">
          <input
            type="checkbox"
            checked={to_do.checked}
            readOnly
            className="mt-1 h-4 w-4 rounded border-gray-300"
          />
          <div className={cn(to_do.checked && 'line-through opacity-60')}>
            <RichText richText={to_do.rich_text} />
          </div>
        </div>
      )
    }

    // 토글
    case 'toggle': {
      const { toggle } = block
      return (
        <details className="my-4 rounded-lg border p-4">
          <summary className="cursor-pointer font-medium">
            <RichText richText={toggle.rich_text} />
          </summary>
        </details>
      )
    }

    // 지원되지 않는 블록 타입
    default: {
      return (
        <div className="my-4 rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
          지원되지 않는 블록 타입: <code>{type}</code>
        </div>
      )
    }
  }
}

/**
 * Notion 블록 목록 렌더러
 */
export function NotionRenderer({ blocks }: NotionRendererProps) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        콘텐츠가 없습니다
      </div>
    )
  }

  // 리스트 그룹화를 위한 처리
  const groupedBlocks: any[][] = []
  let currentList: any[] = []
  let currentListType: string | null = null

  blocks.forEach((block) => {
    const { type } = block

    if (type === 'bulleted_list_item' || type === 'numbered_list_item') {
      if (currentListType === type) {
        currentList.push(block)
      } else {
        if (currentList.length > 0) {
          groupedBlocks.push([...currentList])
        }
        currentList = [block]
        currentListType = type
      }
    } else {
      if (currentList.length > 0) {
        groupedBlocks.push([...currentList])
        currentList = []
        currentListType = null
      }
      groupedBlocks.push([block])
    }
  })

  // 마지막 리스트 추가
  if (currentList.length > 0) {
    groupedBlocks.push([...currentList])
  }

  return (
    <div className="notion-content">
      {groupedBlocks.map((group, groupIndex) => {
        const firstBlock = group[0]
        const { type } = firstBlock

        // 리스트 그룹 렌더링
        if (type === 'bulleted_list_item') {
          return (
            <ul key={`group-${groupIndex}`} className="my-4 space-y-2">
              {group.map((block) => (
                <NotionBlock key={block.id} block={block} />
              ))}
            </ul>
          )
        }

        if (type === 'numbered_list_item') {
          return (
            <ol key={`group-${groupIndex}`} className="my-4 space-y-2">
              {group.map((block) => (
                <NotionBlock key={block.id} block={block} />
              ))}
            </ol>
          )
        }

        // 일반 블록 렌더링
        return <NotionBlock key={firstBlock.id} block={firstBlock} />
      })}
    </div>
  )
}
