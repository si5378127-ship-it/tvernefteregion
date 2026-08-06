import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'blue' | 'green' | 'gray';
}

const variants = {
  default: 'bg-warm-gray-100 text-warm-gray-700',
  blue: 'bg-brand-blue-light text-brand-blue',
  green: 'bg-brand-green-light text-brand-green',
  gray: 'bg-warm-gray-200 text-warm-gray-700',
};

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
