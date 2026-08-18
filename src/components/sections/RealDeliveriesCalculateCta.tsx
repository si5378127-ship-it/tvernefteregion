'use client';

import { ButtonLink } from '@/components/ui';
import { getCompanyMaxHref } from '@/config/cta';

export function RealDeliveriesCalculateCta() {
  const maxHref = getCompanyMaxHref();

  return (
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
  );
}
