'use client';

import { BottomSheet, ContactChannelLink } from '@/components/ui';
import { useContactSheet } from './ContactSheetContext';
import { useDirectContactPanelChannels } from './ContactChannelsContext';
import { CompactInquiryForm } from '@/components/forms/CompactInquiryForm';
import { CompactCallbackForm } from '@/components/forms/CompactCallbackForm';

const CALC_HINTS = [
  'Вид топлива',
  'Объем (литров)',
  'Населенный пункт доставки',
];

export function ContactSheet() {
  const { isOpen, closeContactSheet } = useContactSheet();
  const directChannels = useDirectContactPanelChannels();

  return (
    <BottomSheet open={isOpen} onClose={closeContactSheet} title="Свяжитесь с нами" size="lg">
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <p className="text-sm text-warm-gray-500 leading-relaxed">
            Выберите удобный способ связи.
          </p>
          <p className="text-sm text-warm-gray-500 leading-relaxed">
            Мы быстро ответим, рассчитаем стоимость и уточним сроки поставки.
          </p>
        </div>

        {directChannels.length > 0 && (
          <div className="flex flex-col gap-2">
            {directChannels.map((channel) => (
              <ContactChannelLink
                key={channel.id}
                channel={channel}
                variant="card"
                onClick={closeContactSheet}
              />
            ))}
          </div>
        )}

        <div className="border-t border-border pt-5">
          <h3 className="text-base font-semibold text-graphite mb-3">
            Для быстрого расчета стоимости сообщите
          </h3>
          <ul className="space-y-2 mb-6">
            {CALC_HINTS.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-warm-gray-600">
                <span
                  className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-green flex-shrink-0"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-warm-gray-50 p-4">
              <h4 className="text-sm font-semibold text-graphite mb-3">Форма</h4>
              <CompactInquiryForm />
            </div>
            <div className="rounded-xl border border-border bg-warm-gray-50 p-4">
              <h4 className="text-sm font-semibold text-graphite mb-3">Заказать звонок</h4>
              <CompactCallbackForm />
            </div>
          </div>
        </div>
      </div>
    </BottomSheet>
  );
}
