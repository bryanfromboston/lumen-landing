'use client';

import { ReactNode } from 'react';
import { useExitIntent } from '@/hooks/useExitIntent';
import ExitIntentToast from './ExitIntentToast';
import MobileCTABar from './MobileCTABar';

interface ExitIntentProviderProps {
  children: ReactNode;
}

export default function ExitIntentProvider({ children }: ExitIntentProviderProps) {
  const { showToast, closeToast, openToast, isMobile, canShow } = useExitIntent({
    minTimeOnPage: 10000, // 10 seconds
    minScrollDepth: 0.3, // 30%
    topThreshold: 10, // 10px from top
  });

  return (
    <>
      {children}

      {/* Mobile: Persistent CTA Bar */}
      {isMobile && (
        <MobileCTABar isVisible={canShow} onClick={openToast} />
      )}

      {/* Toast notification (both desktop and mobile) */}
      <ExitIntentToast isOpen={showToast} onClose={closeToast} isMobile={isMobile} />
    </>
  );
}
