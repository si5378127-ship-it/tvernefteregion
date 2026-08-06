import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const paddings = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  className,
  padding = 'md',
  hover = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[22px] border border-border bg-white shadow-sm',
        paddings[padding],
        hover &&
          'transition-all duration-200 ease-out hover:-translate-y-[3px] hover:shadow-md',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
