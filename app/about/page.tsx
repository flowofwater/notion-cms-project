import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { siteConfig } from "@/lib/constants"

export const metadata: Metadata = {
  title: `소개 | ${siteConfig.name}`,
  description: "스타터킷의 기능과 사용법을 알아보세요.",
}

/**
 * 포함된 기술 스택
 */
const techStack = [
  "Next.js 16 App Router",
  "React 19",
  "TypeScript 5",
  "Tailwind CSS v4",
  "shadcn/ui (new-york)",
  "lucide-react 아이콘",
  "next-themes (다크모드)",
  "react-responsive (반응형)",
  "use-local-storage-state",
]

/**
 * 빠른 시작 단계
 */
const quickStartSteps = [
  {
    step: 1,
    title: "저장소 클론",
    command: "git clone https://github.com/your-repo/starter-kit.git",
  },
  {
    step: 2,
    title: "의존성 설치",
    command: "npm install",
  },
  {
    step: 3,
    title: "개발 서버 실행",
    command: "npm run dev",
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 */}
      <section className="container max-w-screen-2xl py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            스타터킷 소개
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            이 스타터킷은 모던 웹 개발에 필요한 모든 것을 갖추고 있습니다.
            복잡한 설정 없이 바로 개발을 시작하세요.
          </p>
        </div>
      </section>

      {/* 기술 스택 섹션 */}
      <section className="container max-w-screen-2xl py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">기술 스택</h2>
            <p className="mt-4 text-muted-foreground">
              검증된 최신 기술들로 구성되어 있습니다.
            </p>
            <ul className="mt-8 space-y-3">
              {techStack.map((tech) => (
                <li key={tech} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 빠른 시작 */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight">빠른 시작</h2>
            <p className="mt-4 text-muted-foreground">
              3단계만으로 프로젝트를 시작할 수 있습니다.
            </p>
            <div className="mt-8 space-y-4">
              {quickStartSteps.map((item) => (
                <Card key={item.step}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {item.step}
                      </span>
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <code className="rounded bg-muted px-2 py-1 text-sm">
                      {item.command}
                    </code>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="border-t border-border/40 bg-muted/50">
        <div className="container max-w-screen-2xl py-16 md:py-24">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              준비가 되셨나요?
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              지금 바로 프로젝트를 시작하고 아이디어를 현실로 만들어보세요.
            </p>
            <div className="mt-8 flex gap-4">
              <Button size="lg" asChild>
                <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
                  GitHub에서 시작하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/">
                  홈으로 돌아가기
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
