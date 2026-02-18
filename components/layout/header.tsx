import Link from "next/link"
import { Logo } from "@/components/common/logo"
import { NavLink } from "@/components/common/nav-link"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { MobileNav } from "@/components/layout/mobile-nav"
import { HeaderSearch } from "@/components/common/header-search"
import { navLinks } from "@/lib/constants"

/**
 * 반응형 헤더 컴포넌트
 * 데스크톱: 가로 네비게이션
 * 모바일: 햄버거 메뉴 (Sheet)
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        {/* 로고 */}
        <Logo />

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* 액션 버튼 영역 */}
        <div className="flex items-center gap-2">
          {/* 검색 버튼 */}
          <HeaderSearch />
          <ThemeToggle />
          {/* 모바일 메뉴 */}
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
