'use client';

import { ButtonLink } from '@/components/ui';
import { getCompanyMaxHref } from '@/config/cta';
import { YM_GOALS, ymGoalAttrs } from '@/lib/yandex-metrika';

export function DieselWholesaleCostCta() {
  const maxHref = getCompanyMaxHref();

  return (
    <div className="mt-6 text-center">
      <ButtonLink
        href={maxHref}
        target="_blank"
        rel="noopener noreferrer"
        variant="green"
        size="lg"
        className="rounded-[14px]"
        {...ymGoalAttrs(YM_GOALS.priceRequest)}
      >
        Узнать стоимость
      </ButtonLink>
    </div>
  );
}
