'use client';

import { ButtonLink } from '@/components/ui';
import { useContactSheet } from './ContactSheetContext';
import { getCompanyMaxHref } from '@/config/cta';
import { YM_GOALS, ymGoalAttrs } from '@/lib/yandex-metrika';

export function FooterActions() {
  const { openContactSheet } = useContactSheet();
  const maxHref = getCompanyMaxHref();

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:justify-center">
      <ButtonLink
        href={maxHref}
        target="_blank"
        rel="noopener noreferrer"
        variant="green"
        size="lg"
        className="rounded-[14px] sm:min-w-[220px]"
        {...ymGoalAttrs(YM_GOALS.priceRequest)}
      >
        Узнать стоимость
      </ButtonLink>
      <button
        type="button"
        onClick={openContactSheet}
        className="inline-flex items-center justify-center rounded-[14px] sm:min-w-[220px] h-12 px-6 text-base font-medium bg-white text-deep-navy border border-white transition-colors duration-200 hover:bg-brand-green hover:text-white hover:border-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-petrol"
      >
        Связаться
      </button>
    </div>
  );
}
