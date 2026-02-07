import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

interface MainLayoutProps {
  children: React.ReactNode
}

/**
 * 메인 레이아웃 래퍼 컴포넌트
 * Header와 Footer를 포함한 전체 페이지 구조
 */
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
