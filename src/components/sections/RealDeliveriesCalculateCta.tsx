'use client';

import { Button } from '@/components/ui';
import { useContactSheet } from '@/components/layout/ContactSheetContext';

/** CTA секции реальных поставок → существующая форма расчёта. */
export function RealDeliveriesCalculateCta() {
  const { scrollToSection } = useContactSheet();

  return (
    <Button
      variant="green"
      size="lg"
      className="rounded-[14px]"
      onClick={() => scrollToSection('calculate')}
    >
      Рассчитать стоимость поставки
    </Button>
  );
}
