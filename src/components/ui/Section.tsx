import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  /** white | warm | cool | navy | petrol; gray/dark — совместимость */
  background?: 'white' | 'warm' | 'cool' | 'gray' | 'navy' | 'petrol' | 'dark';
  /** Уменьшенные вертикальные отступы */
  compact?: boolean;
}

const backgrounds = {
  white: 'bg-white',
  warm: 'bg-warm-light',
  cool: 'bg-cool-light',
  gray: 'bg-warm-light',
  navy: 'bg-deep-navy text-white',
  petrol: 'bg-petrol text-white',
  dark: 'bg-deep-navy text-white',
};

export function Section({
  className,
  id,
  background = 'white',
  compact = false,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        compact ? 'section-padding-compact' : 'section-padding',
        backgrounds[background],
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
