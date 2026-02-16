'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSessionStorage } from './useSessionStorage'

/**
 * Configuration options for the exit intent detection hook
 */
interface ExitIntentOptions {
  /** Minimum time user must spend on page before exit intent can trigger (in milliseconds). Default: 10000 (10 seconds) */
  minTimeOnPage?: number
  /** Minimum scroll depth required before exit intent can trigger (0-1 percentage). Default: 0.3 (30%) */
  minScrollDepth?: number
  /** Distance from top of viewport to trigger exit intent on mouse leave (in pixels). Default: 10 */
  topThreshold?: number
}

/**
 * A React hook that detects user exit intent on both desktop and mobile devices.
 *
 * **Desktop behavior:** Triggers when the user's mouse leaves the viewport from the top,
 * indicating they might be navigating away via the browser controls.
 *
 * **Mobile behavior:** Triggers when the user rapidly scrolls upward to the top of the page,
 * a common gesture before leaving the page.
 *
 * The hook respects user engagement by only triggering after minimum time on page and scroll depth
 * thresholds are met. It uses session storage to ensure the exit intent is shown only once per session.
 *
 * @param options - Configuration options for exit intent behavior
 * @returns An object containing toast state and control methods
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { showToast, closeToast, isMobile, canShow } = useExitIntent({
 *     minTimeOnPage: 5000,    // 5 seconds
 *     minScrollDepth: 0.2,    // 20% scroll
 *     topThreshold: 15        // 15px from top
 *   });
 *
 *   return (
 *     <>
 *       {showToast && (
 *         <ExitIntentModal onClose={closeToast} />
 *       )}
 *     </>
 *   );
 * }
 * ```
 */
export function useExitIntent(options: ExitIntentOptions = {}) {
  const {
    minTimeOnPage = 10000, // 10 seconds
    minScrollDepth = 0.3, // 30%
    topThreshold = 10, // 10px from top
  } = options

  const [showToast, setShowToast] = useState(false)
  const [hasShown, setHasShown, isClient] = useSessionStorage('exit-intent-shown', false)
  const [timeOnPage, setTimeOnPage] = useState(0)
  const [scrollDepth, setScrollDepth] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Detect if device is mobile/touch
  useEffect(() => {
    if (!isClient) return

    const checkMobile = () => {
      const hasTouch = window.matchMedia('(pointer: coarse)').matches
      const isSmallScreen = window.innerWidth < 768
      setIsMobile(hasTouch || isSmallScreen)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [isClient])

  // Track time on page
  useEffect(() => {
    if (!isClient) return

    const timer = setInterval(() => {
      setTimeOnPage((prev) => prev + 1000)
    }, 1000)

    return () => clearInterval(timer)
  }, [isClient])

  // Track scroll depth
  useEffect(() => {
    if (!isClient) return

    // callback, to calculate scroll depth as a percentage of total scrollable height
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const scrollableHeight = documentHeight - windowHeight

      if (scrollableHeight > 0) {
        const depth = scrollTop / scrollableHeight
        setScrollDepth(depth)
      }
    }

    handleScroll() // Initial calculation
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isClient])

  // Desktop: Mouse leave detection
  useEffect(() => {
    if (!isClient || hasShown || isMobile) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= topThreshold &&
        timeOnPage >= minTimeOnPage &&
        scrollDepth >= minScrollDepth &&
        !hasShown
      ) {
        setShowToast(true)
        setHasShown(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [
    isClient,
    hasShown,
    isMobile,
    timeOnPage,
    scrollDepth,
    minTimeOnPage,
    minScrollDepth,
    topThreshold,
    setHasShown,
  ])

  // Mobile: Rapid scroll to top detection
  // Detects when user quickly scrolls upward to top of page, a common exit gesture on mobile
  useEffect(() => {
    if (!isClient || hasShown || !isMobile) return

    let lastScrollY = window.scrollY
    let scrollVelocity = 0

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = lastScrollY - currentScrollY // Positive when scrolling up
      scrollVelocity = delta
      lastScrollY = currentScrollY

      // Trigger when: rapid upward scroll + near top + engagement thresholds met
      if (
        scrollVelocity > 50 && // Scrolling up quickly (50px+ per scroll event)
        currentScrollY < 300 && // Near the top of the page
        timeOnPage >= minTimeOnPage &&
        scrollDepth >= minScrollDepth &&
        !hasShown
      ) {
        setShowToast(true)
        setHasShown(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [
    isClient,
    hasShown,
    isMobile,
    timeOnPage,
    scrollDepth,
    minTimeOnPage,
    minScrollDepth,
    setHasShown,
  ])

  const closeToast = useCallback(() => {
    setShowToast(false)
  }, [])

  const openToast = useCallback(() => {
    if (!hasShown) {
      setShowToast(true)
      setHasShown(true)
    }
  }, [hasShown, setHasShown])

  return {
    /** Whether the exit intent toast should currently be displayed */
    showToast,
    /** Callback to manually close/hide the toast */
    closeToast,
    /** Callback to manually trigger the toast (respects session storage, won't show if already shown) */
    openToast,
    /** Whether the current device is detected as mobile/touch-enabled */
    isMobile,
    /** Time user has spent on the page in milliseconds */
    timeOnPage,
    /** Current scroll depth as a decimal (0-1, where 1 is fully scrolled) */
    scrollDepth,
    /** Whether the exit intent is eligible to show (meets time/scroll requirements and hasn't been shown) */
    canShow: timeOnPage >= minTimeOnPage && scrollDepth >= minScrollDepth && !hasShown,
  }
}
