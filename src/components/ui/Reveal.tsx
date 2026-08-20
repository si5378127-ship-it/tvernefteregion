'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/lib/motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Длительность появления, сек. По умолчанию 0.5. */
  duration?: number;
  /** Смещение по Y при появлении, px. По умолчанию 16. */
  offsetY?: number;
}

/**
 * Мягкое появление при скролле.
 * Контент всегда видим до гидрации и при reduced-motion —
 * не оставляем opacity: 0 «навсегда».
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.5,
  offsetY = 16,
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  // SSR / до гидрации / reduced-motion — сразу видимый контент
  if (!ready || reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: offsetY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
