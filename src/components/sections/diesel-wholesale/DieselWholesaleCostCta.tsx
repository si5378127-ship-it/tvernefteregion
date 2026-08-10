'use client';

import { Button } from '@/components/ui';
import { useContactSheet } from '@/components/layout/ContactSheetContext';

export function DieselWholesaleCostCta() {
  const { scrollToSection } = useContactSheet();

  return (
    <Button
      variant="green"
      size="lg"
      className="w-full rounded-[14px] sm:w-auto"
      onClick={() => scrollToSection('calculate')}
    >
      Рассчитать стоимость
    </Button>
  );
}
