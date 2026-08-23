'use client';

import { BottomSheet, ContactChannelLink, ManagerContactCard, ButtonLink } from '@/components/ui';
import { getManagerContact } from '@/config/contacts';
import { getCompanyMaxHref } from '@/config/cta';
import { YM_GOALS, ymGoalAttrs } from '@/lib/yandex-metrika';
import { useContactSheet } from './ContactSheetContext';
import { useDirectContactPanelChannels, useHeaderPhone } from './ContactChannelsContext';

const CALC_HINTS = [
  'Вид топлива',
  'Объем (литров)',
  'Населенный пункт доставки',
];

export function ContactSheet() {
  const { isOpen, closeContactSheet } = useContactSheet();
  const directChannels = useDirectContactPanelChannels();
  const companyPhone = useHeaderPhone();
  const manager = getManagerContact();
  const maxHref = getCompanyMaxHref();

  const sheetChannels = [
    ...(companyPhone ? [companyPhone] : []),
    ...directChannels.filter((c) => c.id !== companyPhone?.id),
  ];

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

        <div className="flex flex-col gap-2">
          {sheetChannels.map((channel) => (
            <ContactChannelLink
              key={channel.id}
              channel={channel}
              variant="card"
              onClick={closeContactSheet}
            />
          ))}
          <ManagerContactCard
            manager={manager}
            variant="sheet"
            onNavigate={closeContactSheet}
          />
        </div>

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

          <div className="flex flex-col gap-3">
            <ButtonLink
              href={maxHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="green"
              size="lg"
              fullWidth
              onClick={closeContactSheet}
              {...ymGoalAttrs(YM_GOALS.priceRequest)}
            >
              Узнать стоимость в MAX
            </ButtonLink>
            {companyPhone && (
              <ButtonLink
                href={companyPhone.href}
                variant="outline"
                size="lg"
                fullWidth
                onClick={closeContactSheet}
              >
                Позвонить
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </BottomSheet>
  );
}
