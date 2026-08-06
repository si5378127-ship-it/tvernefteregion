'use client';

import { Button } from '@/components/ui';
import { useContactSheet } from './ContactSheetContext';

export function FooterActions() {
  const { openContactSheet, scrollToSection } = useContactSheet();

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:justify-center">
      <Button
        variant="green"
        size="lg"
        className="rounded-[14px] sm:min-w-[220px]"
        onClick={() => scrollToSection('calculate')}
      >
        Рассчитать стоимость
      </Button>
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
