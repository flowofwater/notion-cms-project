"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NavLink } from "@/components/common/nav-link"
import { navLinks, siteConfig } from "@/lib/constants"

/**
 * 모바일 네비게이션 컴포넌트
 * Sheet 기반 슬라이드 메뉴
 */
export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">메뉴 열기</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>
            <Link href="/" onClick={() => setOpen(false)}>
              {siteConfig.name}
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-lg"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-8">
          <Button asChild className="w-full">
            <Link href="/about" onClick={() => setOpen(false)}>
              시작하기
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
