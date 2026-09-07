'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, SparklesIcon } from 'lucide-react';
import { useAuditModal } from '@/components/audit/AuditModalContext';

interface StickyMobileCTAProps {
  onOpenAudit?: () => void;
  hidden?: boolean;
}

export function StickyMobileCTA({ onOpenAudit, hidden }: StickyMobileCTAProps) {
  const modal = useAuditModal();
  const handleOpenAudit = onOpenAudit || modal.openAudit;
  const isHidden = hidden ?? modal.isAuditOpen;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && !isHidden && (
        <>
          {/* Mobile Bottom Bar - Large Prominent Button */}
          <motion.div
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 p-3 pb-4 backdrop-blur-md bg-offwhite/95 border-t border-navy/10 lg:hidden shadow-[0_-10px_30px_rgba(12,40,70,0.25)]"
          >
            <button
              type="button"
              onClick={handleOpenAudit}
              aria-haspopup="dialog"
              className="avero-focus group relative flex h-15 w-full items-center justify-between rounded-full border-2 border-gold/60 bg-navy p-2 pr-2.5 shadow-2xl active:scale-[0.98] transition-transform duration-200"
            >
              <div className="flex items-center gap-3.5 pl-1.5">
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-navy-900 shadow-md">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  >
                    <SparklesIcon className="h-6 w-6 fill-navy-900 text-navy-900" />
                  </motion.div>
                </span>
                <div className="flex flex-col text-left">
                  <span className="font-display text-[16.5px] font-extrabold text-white leading-tight">
                    Get My 15-Mins Audit
                  </span>
                  <span className="font-mono text-[11px] font-bold text-gold uppercase tracking-wider">
                    Find Ad Leaks Now →
                  </span>
                </div>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/20 text-gold border border-gold/30 shadow-md">
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                  <ArrowRightIcon className="h-5 w-5 text-gold stroke-[2.5]" />
                </motion.div>
              </div>
            </button>
          </motion.div>

          {/* Desktop Bottom-Right Nudge Badge with Eye-Catching Halo Pulse & Bounce */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: [0, -6, 0, -3, 0] }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{
              scale: { duration: 0.3 },
              opacity: { duration: 0.3 },
              y: { repeat: Infinity, duration: 3.5, repeatDelay: 2, ease: 'easeInOut' }
            }}
            className="fixed bottom-6 right-6 z-40 hidden lg:flex"
          >
            {/* Outer Glowing Gold Halo */}
            <motion.span
              className="absolute -inset-1 rounded-full bg-gold/40 blur-md pointer-events-none"
              animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.98, 1.06, 0.98] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            />

            <button
              type="button"
              onClick={handleOpenAudit}
              aria-haspopup="dialog"
              className="avero-focus group relative flex items-center gap-3.5 rounded-full border border-gold/60 bg-navy p-1.5 pr-6 text-white shadow-[0_15px_35px_-5px_rgba(12,40,70,0.5)] transition-transform duration-200 ease-premium hover:-translate-y-1 hover:shadow-gold/30"
            >
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gold text-navy-900 shadow-md">
                <motion.div
                  animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.25, 1] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                >
                  <SparklesIcon className="h-5 w-5 fill-navy-900 text-navy-900" />
                </motion.div>
              </span>

              <div className="flex flex-col text-left">
                <span className="font-display text-sm font-bold text-white tracking-wide">
                  Get My 15-Mins Audit
                </span>
                <span className="font-mono text-[10.5px] font-bold text-gold uppercase tracking-wider flex items-center gap-1">
                  Find Ad Leaks Now
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  >
                    →
                  </motion.span>
                </span>
              </div>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
