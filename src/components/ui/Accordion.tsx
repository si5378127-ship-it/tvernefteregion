'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/lib/motion';

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className={cn('divide-y divide-border border border-border rounded-xl', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              className={cn(
                'flex w-full items-center justify-between gap-4 px-5 py-4 text-left',
                'hover:bg-warm-gray-50 transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-blue',
                'min-h-[44px]',
              )}
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              <span className="text-sm md:text-base font-medium text-graphite">{item.question}</span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 flex-shrink-0 text-warm-gray-500 transition-transform',
                  isOpen && 'rotate-180',
                )}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 text-sm md:text-base text-warm-gray-600 leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
