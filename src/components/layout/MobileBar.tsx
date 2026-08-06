'use client';

import { Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ContactIcon } from '@/components/ui/ContactIcon';
import { useContactSheet } from './ContactSheetContext';
import { useMobileBarPhone } from './ContactChannelsContext';

export function MobileBar() {
  const phone = useMobileBarPhone();
  const { openContactSheet, scrollToSection } = useContactSheet();

  const actionClass =
    'flex flex-col items-center justify-center gap-1 text-xs font-medium text-warm-gray-700 hover:text-brand-blue hover:bg-warm-gray-50 transition-colors min-h-[44px]';

  const columns = phone ? 3 : 2;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[var(--z-mobile-bar)] md:hidden bg-white border-t border-border safe-area-bottom"
      role="navigation"
      aria-label="Быстрые действия"
    >
      <div
        className={cn(
          'grid h-[4.5rem] items-stretch',
          columns === 3 ? 'grid-cols-3' : 'grid-cols-2',
        )}
      >
        {phone && (
          <a href={phone.href} className={actionClass} aria-label={`Позвонить: ${phone.label}`}>
            <ContactIcon type="phone" size={20} alt="Позвонить" />
            Позвонить
          </a>
        )}

        <button type="button" onClick={openContactSheet} className={actionClass}>
          <ContactIcon type="max" alt="" />
          Связаться
        </button>

        <button
          type="button"
          onClick={() => scrollToSection('calculate')}
          className={actionClass}
        >
          <Calculator className="h-5 w-5" aria-hidden="true" />
          Рассчитать
        </button>
      </div>
    </div>
  );
}
