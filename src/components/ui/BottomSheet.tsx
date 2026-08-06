'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconButton } from './IconButton';
import { usePrefersReducedMotion } from '@/lib/motion';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  size?: 'md' | 'lg';
}

export function BottomSheet({
  open,
  onClose,
  title,
  subtitle,
  children,
  className,
  size = 'md',
}: BottomSheetProps) {
  const reducedMotion = usePrefersReducedMotion();
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[var(--z-modal)] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-graphite/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            initial={reducedMotion ? false : { y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
              duration: reducedMotion ? 0 : undefined,
            }}
            className={cn(
              'relative z-10 w-full rounded-t-2xl sm:rounded-2xl bg-white shadow-lg',
              'max-h-[92vh] sm:max-h-[88vh] overflow-y-auto safe-area-bottom',
              size === 'lg' ? 'sm:max-w-2xl' : 'sm:max-w-lg',
              className,
            )}
          >
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="h-1 w-10 rounded-full bg-warm-gray-300" aria-hidden="true" />
            </div>
            <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-border bg-white/95 backdrop-blur-sm px-5 py-4">
              <div className="min-w-0">
                <h2 id="sheet-title" className="text-xl font-semibold text-graphite">
                  {title}
                </h2>
                {subtitle && <p className="mt-1 text-sm text-warm-gray-500">{subtitle}</p>}
              </div>
              <IconButton label="Закрыть" onClick={onClose}>
                <X className="h-5 w-5" />
              </IconButton>
            </div>
            <div className="px-5 py-4 pb-8">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
