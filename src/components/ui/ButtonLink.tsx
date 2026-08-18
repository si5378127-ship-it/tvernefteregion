import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'green';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const variants = {
  primary:
    'bg-brand-blue text-white hover:bg-brand-blue-hover active:bg-brand-blue-hover focus-visible:ring-brand-blue',
  secondary:
    'bg-warm-gray-100 text-graphite hover:bg-warm-gray-200 active:bg-warm-gray-300 focus-visible:ring-warm-gray-400',
  outline:
    'border border-brand-blue/25 bg-white text-brand-blue hover:bg-brand-blue-light active:bg-brand-blue-light focus-visible:ring-brand-green',
  ghost:
    'bg-transparent text-graphite hover:bg-warm-gray-100 active:bg-warm-gray-200 focus-visible:ring-brand-green',
  green:
    'bg-brand-green text-white hover:bg-brand-green-hover active:bg-deep-green focus-visible:ring-brand-green shadow-sm hover:shadow-md',
};

const sizes = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
};

/** Ссылка в стиле кнопки — для MAX / tel / внешних CTA без JS API. */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      children,
      ...props
    },
    ref,
  ) => (
    <a
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-[14px] font-medium transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'min-h-9 min-w-9',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  ),
);
ButtonLink.displayName = 'ButtonLink';
