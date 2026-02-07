import Link from "next/link"
import { siteConfig } from "@/lib/constants"

interface LogoProps {
  className?: string
}

/**
 * 브랜드 로고 컴포넌트
 * 홈페이지로 이동하는 링크 포함
 */
export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={className}>
      <span className="text-xl font-bold tracking-tight">{siteConfig.name}</span>
    </Link>
  )
}
