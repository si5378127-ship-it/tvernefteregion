'use client';

import { ButtonLink } from '@/components/ui';
import { getCompanyMaxHref } from '@/config/cta';

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
      >
        Узнать стоимость
      </ButtonLink>
    </div>
  );
}
