'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSessionStorage } from './useSessionStorage';

interface ExitIntentOptions {
  minTimeOnPage?: number; // milliseconds
  minScrollDepth?: number; // 0-1 percentage
  topThreshold?: number; // pixels from top
}

export function useExitIntent(options: ExitIntentOptions = {}) {
  const {
    minTimeOnPage = 10000, // 10 seconds
    minScrollDepth = 0.3, // 30%
    topThreshold = 10, // 10px from top
  } = options;

  const [showToast, setShowToast] = useState(false);
  const [hasShown, setHasShown, isClient] = useSessionStorage('exit-intent-shown', false);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if device is mobile/touch
  useEffect(() => {
    if (!isClient) return;

    const checkMobile = () => {
      const hasTouch = window.matchMedia('(pointer: coarse)').matches;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(hasTouch || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isClient]);

  // Track time on page
  useEffect(() => {
    if (!isClient) return;

    const timer = setInterval(() => {
      setTimeOnPage((prev) => prev + 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, [isClient]);

  // Track scroll depth
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;

      if (scrollableHeight > 0) {
        const depth = scrollTop / scrollableHeight;
        setScrollDepth(depth);
      }
    };

    handleScroll(); // Initial calculation
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient]);

  // Desktop: Mouse leave detection
  useEffect(() => {
    if (!isClient || hasShown || isMobile) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= topThreshold &&
        timeOnPage >= minTimeOnPage &&
        scrollDepth >= minScrollDepth &&
        !hasShown
      ) {
        setShowToast(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
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
  ]);

  // Mobile: Rapid scroll to top detection
  useEffect(() => {
    if (!isClient || hasShown || !isMobile) return;

    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = lastScrollY - currentScrollY;
      scrollVelocity = delta;
      lastScrollY = currentScrollY;

      // Rapid upward scroll (going back to top quickly)
      if (
        scrollVelocity > 50 && // Scrolling up quickly
        currentScrollY < 300 && // Near the top
        timeOnPage >= minTimeOnPage &&
        scrollDepth >= minScrollDepth &&
        !hasShown
      ) {
        setShowToast(true);
        setHasShown(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [
    isClient,
    hasShown,
    isMobile,
    timeOnPage,
    scrollDepth,
    minTimeOnPage,
    minScrollDepth,
    setHasShown,
  ]);

  const closeToast = useCallback(() => {
    setShowToast(false);
  }, []);

  const openToast = useCallback(() => {
    if (!hasShown) {
      setShowToast(true);
      setHasShown(true);
    }
  }, [hasShown, setHasShown]);

  return {
    showToast,
    closeToast,
    openToast,
    isMobile,
    timeOnPage,
    scrollDepth,
    canShow: timeOnPage >= minTimeOnPage && scrollDepth >= minScrollDepth && !hasShown,
  };
}
