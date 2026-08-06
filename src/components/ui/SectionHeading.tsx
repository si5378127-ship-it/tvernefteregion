import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h2' | 'h3';
  /** Для тёмных секций */
  onDark?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  align = 'left',
  className,
  as: Tag = 'h2',
  onDark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-8 md:mb-10',
        align === 'center' && 'text-center mx-auto max-w-2xl',
        className,
      )}
    >
      <Tag
        className={cn(
          'text-2xl md:text-3xl lg:text-[2.15rem] font-semibold tracking-tight leading-[1.2]',
          onDark ? 'text-white' : 'text-deep-navy',
        )}
      >
        {title}
      </Tag>
      {subtitle && (
        <p
          className={cn(
            'mt-2.5 text-base md:text-lg leading-relaxed',
            onDark ? 'text-white/70' : 'text-secondary-text',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
