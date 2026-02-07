import Link from "next/link"
import { ArrowRight, Code2, Palette, Zap, Moon, Layers, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { siteConfig } from "@/lib/constants"
import type { Feature } from "@/types"

/**
 * 기능 카드 데이터
 */
const features: Feature[] = [
  {
    icon: Code2,
    title: "Next.js 16 App Router",
    description: "최신 Next.js의 App Router를 활용한 서버 컴포넌트와 스트리밍 지원",
  },
  {
    icon: Palette,
    title: "shadcn/ui",
    description: "접근성을 고려한 아름다운 UI 컴포넌트 라이브러리",
  },
  {
    icon: Zap,
    title: "Tailwind CSS v4",
    description: "유틸리티 우선 CSS 프레임워크로 빠른 스타일링",
  },
  {
    icon: Moon,
    title: "다크모드",
    description: "시스템 설정 감지 및 수동 전환 가능한 테마 시스템",
  },
  {
    icon: Layers,
    title: "TypeScript",
    description: "타입 안전성을 보장하는 TypeScript 기반 개발",
  },
  {
    icon: Smartphone,
    title: "반응형 디자인",
    description: "모바일부터 데스크톱까지 완벽한 반응형 레이아웃",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 */}
      <section className="container max-w-screen-2xl py-24 md:py-32">
        <div className="flex flex-col items-center text-center">
          <Badge variant="secondary" className="mb-4">
            v1.0 출시
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            모던 웹 개발을 위한
            <br />
            <span className="text-primary">완벽한 스타터킷</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Next.js, shadcn/ui, Tailwind CSS를 활용한 프로덕션 레디 스타터킷.
            다크모드, 반응형 디자인, TypeScript를 모두 지원합니다.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/about">
                시작하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 기능 섹션 */}
      <section className="container max-w-screen-2xl py-24 md:py-32">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            주요 기능
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            생산성을 높이는 모든 것이 준비되어 있습니다
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border/50">
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary" />
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="border-t border-border/40 bg-muted/50">
        <div className="container max-w-screen-2xl py-24 md:py-32">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              지금 바로 시작하세요
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              몇 분 만에 프로젝트를 시작할 수 있습니다.
              복잡한 설정 없이 바로 개발에 집중하세요.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/about">
                  더 알아보기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
