'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Copy, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { DISCOUNT_CODE, DISCOUNT_PERCENTAGE } from '@/lib/constants';
import { copyToClipboard } from '@/lib/utils';
import { useState } from 'react';

interface ExitIntentToastProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

export default function ExitIntentToast({ isOpen, onClose, isMobile = false }: ExitIntentToastProps) {
  const [copied, setCopied] = useState(false);
  const [autoDismissTimer, setAutoDismissTimer] = useState<NodeJS.Timeout | null>(null);

  const handleCopy = async () => {
    await copyToClipboard(DISCOUNT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Auto-dismiss after 15 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 15000);
      setAutoDismissTimer(timer);

      return () => {
        if (timer) clearTimeout(timer);
      };
    }
  }, [isOpen, onClose]);

  // Escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const desktopVariants = {
    initial: { x: -400, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -400, opacity: 0 },
  };

  const mobileVariants = {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={isMobile ? mobileVariants.initial : desktopVariants.initial}
          animate={isMobile ? mobileVariants.animate : desktopVariants.animate}
          exit={isMobile ? mobileVariants.exit : desktopVariants.exit}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`fixed z-50 bg-white rounded-2xl shadow-2xl p-6 max-w-md ${
            isMobile
              ? 'bottom-20 left-4 right-4 mx-auto'
              : 'bottom-6 left-6'
          }`}
          role="alert"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>

          {/* Icon */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-3 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              {/* Headline */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Wait! Special Offer
              </h3>

              {/* Body */}
              <p className="text-gray-600 mb-4">
                Get <span className="font-bold text-primary-600">{DISCOUNT_PERCENTAGE}% off</span> your first month when you activate today!
              </p>

              {/* Discount code */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 bg-gradient-to-r from-primary-50 to-accent-50 border-2 border-primary-200 rounded-lg px-4 py-2">
                  <div className="text-xs text-gray-600 mb-1">Discount Code</div>
                  <div className="text-xl font-bold text-primary-600 font-mono">
                    {DISCOUNT_CODE}
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className="p-3 rounded-lg bg-primary-100 hover:bg-primary-200 transition-colors flex-shrink-0"
                  aria-label="Copy discount code"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-success" />
                  ) : (
                    <Copy className="w-5 h-5 text-primary-600" />
                  )}
                </button>
              </div>

              {/* CTA */}
              <Button
                fullWidth
                size="md"
                onClick={() => {
                  // Handle claim discount action
                  console.log('Claim discount clicked');
                }}
              >
                Claim Discount
              </Button>

              {/* Fine print */}
              <p className="text-xs text-gray-500 mt-3 text-center">
                Valid for new customers only
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
