import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide';
}

export function Container({ className, size = 'default', children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'container-site',
        size === 'narrow' && 'max-w-3xl',
        size === 'wide' && 'max-w-7xl',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
