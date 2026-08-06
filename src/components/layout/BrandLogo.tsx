import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { brandConfig } from '@/config/brand';

export type BrandLogoVariant = 'full' | 'compact' | 'mark-only';

export interface BrandLogoProps {
  variant?: BrandLogoVariant;
  /** Текст и focus-ring для тёмной верхней панели */
  onDark?: boolean;
  className?: string;
  /**
   * Совместимость с Footer / старыми вызовами.
   * sm → mark-only | compact, md → compact, lg → full
   */
  size?: 'sm' | 'md' | 'lg';
}

const variantConfig: Record<
  BrandLogoVariant,
  {
    mark: string;
    gap: string;
    wordmark: string;
    showWordmark: boolean;
    hitArea?: string;
  }
> = {
  full: {
    mark: 'w-[72px] h-[72px] xl:w-[78px] xl:h-[78px]',
    gap: 'gap-3.5 xl:gap-4',
    wordmark: 'text-[22px] xl:text-[24px] font-bold tracking-wide',
    showWordmark: true,
  },
  compact: {
    mark: 'w-[46px] h-[46px] md:w-[40px] md:h-[40px]',
    gap: 'gap-2.5 md:gap-3',
    wordmark: 'text-base md:text-[16px] lg:text-[17px] font-bold tracking-wide',
    showWordmark: true,
  },
  'mark-only': {
    mark: 'w-[46px] h-[46px]',
    gap: 'gap-0',
    wordmark: '',
    showWordmark: false,
    hitArea: 'min-h-11 min-w-11 justify-center',
  },
};

function resolveVariant(
  variant: BrandLogoVariant | undefined,
  size: BrandLogoProps['size'],
): BrandLogoVariant {
  if (variant) return variant;
  if (size === 'sm') return 'mark-only';
  if (size === 'md') return 'compact';
  return 'full';
}

/**
 * Фирменный круглый логотип.
 * PNG с прозрачным альфа-каналом — без собственного фона/квадрата.
 */
export function BrandLogo({
  variant,
  onDark = false,
  className,
  size,
}: BrandLogoProps) {
  const resolved = resolveVariant(variant, size);
  const config = variantConfig[resolved];
  const { src, alt, width, height } = brandConfig.logo;

  return (
    <Link
      href="/"
      aria-label="На главную"
      className={cn(
        'brand inline-flex items-center flex-shrink-0 max-w-[380px]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2',
        onDark ? 'focus-visible:ring-offset-[#0B2A4A]' : 'focus-visible:ring-offset-white',
        config.gap,
        config.hitArea,
        className,
      )}
    >
      {/* Без background / border / shadow / overflow crop */}
      <span
        className={cn(
          'brandMark relative block flex-shrink-0 aspect-square',
          config.mark,
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 768px) 48px, 80px"
          className="h-full w-full object-contain"
          style={{ backgroundColor: 'transparent' }}
          priority
          unoptimized
        />
      </span>

      {config.showWordmark && (
        <span
          className={cn(
            'leading-none whitespace-nowrap select-none',
            config.wordmark,
          )}
          aria-hidden="true"
        >
          <span className={onDark ? 'text-white' : 'text-deep-navy'}>Тверь</span>
          <span className="text-brand-green">НефтеРегион</span>
        </span>
      )}
    </Link>
  );
}
