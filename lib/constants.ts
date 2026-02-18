/**
 * 사이트 설정 상수
 */
export const siteConfig = {
  name: "개발 블로그",
  description: "Notion으로 작성하는 개발 이야기",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  ogImage: `${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/og.jpg`,
  links: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com",
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com",
  },
} as const

/**
 * 네비게이션 링크 정의
 */
export const navLinks = [
  { href: "/", label: "홈" },
  { href: "/categories", label: "카테고리" },
] as const

/**
 * 푸터 링크 타입 정의
 */
type FooterLink = { href: string; label: string }

/**
 * 푸터 링크 그룹 정의
 * 존재하는 페이지만 유지 (404 오류 방지)
 */
export const footerLinks: {
  product: readonly FooterLink[]
  company: readonly FooterLink[]
  legal: readonly FooterLink[]
} = {
  product: [],
  company: [
    { href: "/about", label: "소개" },
  ],
  legal: [],
}
