"use client"

import { useMediaQuery } from "react-responsive"

/**
 * Tailwind CSS 브레이크포인트 정의
 * @see https://tailwindcss.com/docs/responsive-design
 */
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const

type Breakpoint = keyof typeof breakpoints

/**
 * Tailwind 브레이크포인트 기반 반응형 훅
 * CSS 미디어 쿼리와 동일한 로직을 JS에서 사용 가능
 *
 * @example
 * const isMobile = useBreakpoint("md", "below") // md 미만 (모바일)
 * const isDesktop = useBreakpoint("lg", "above") // lg 이상 (데스크톱)
 */
export function useBreakpoint(
  breakpoint: Breakpoint,
  direction: "above" | "below" = "above"
): boolean {
  const query =
    direction === "above"
      ? `(min-width: ${breakpoints[breakpoint]}px)`
      : `(max-width: ${breakpoints[breakpoint] - 1}px)`

  return useMediaQuery({ query })
}

/**
 * 현재 활성화된 브레이크포인트 반환
 * SSR에서는 undefined 반환 (hydration 안전)
 */
export function useCurrentBreakpoint(): Breakpoint | undefined {
  const is2xl = useMediaQuery({ minWidth: breakpoints["2xl"] })
  const isXl = useMediaQuery({ minWidth: breakpoints.xl })
  const isLg = useMediaQuery({ minWidth: breakpoints.lg })
  const isMd = useMediaQuery({ minWidth: breakpoints.md })
  const isSm = useMediaQuery({ minWidth: breakpoints.sm })

  if (is2xl) return "2xl"
  if (isXl) return "xl"
  if (isLg) return "lg"
  if (isMd) return "md"
  if (isSm) return "sm"
  return undefined
}

/**
 * 모바일 여부 확인 (md 미만)
 */
export function useIsMobile(): boolean {
  return useBreakpoint("md", "below")
}

/**
 * 데스크톱 여부 확인 (lg 이상)
 */
export function useIsDesktop(): boolean {
  return useBreakpoint("lg", "above")
}
