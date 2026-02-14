'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Percent } from 'lucide-react';

interface MobileCTABarProps {
  isVisible: boolean;
  onClick: () => void;
}

export default function MobileCTABar({ isVisible, onClick }: MobileCTABarProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          <button
            onClick={onClick}
            className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-4 px-4 flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-transform"
            style={{ minHeight: '56px' }} // 44px minimum for touch targets + padding
          >
            <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
              <Percent className="w-4 h-4" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-bold text-base">Get 20% Off</div>
              <div className="text-sm text-blue-100">Limited Time Offer</div>
            </div>
            <div className="text-2xl font-bold">→</div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
