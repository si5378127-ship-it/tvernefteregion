'use client';

import { Container, Section, Button } from '@/components/ui';
import { useContactSheet } from '@/components/layout/ContactSheetContext';
import { useHeaderPhone } from '@/components/layout/ContactChannelsContext';

export function DieselWholesaleFinalCta() {
  const { scrollToSection } = useContactSheet();
  const phone = useHeaderPhone();

  return (
    <Section background="navy" compact>
      <Container>
        <div className="mx-auto max-w-2xl py-6 text-center">
          <h2 className="mb-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Нужна оптовая поставка дизельного топлива?
          </h2>
          <p className="mb-6 leading-relaxed text-white/70">
            Оставьте заявку на расчёт или позвоните — уточним вид топлива, объём и адрес доставки.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant="green"
              size="lg"
              className="rounded-[14px]"
              onClick={() => scrollToSection('calculate')}
            >
              Рассчитать стоимость поставки
            </Button>
            {phone && (
              <a
                href={phone.href}
                className="inline-flex min-h-[44px] items-center justify-center rounded-[14px] border border-white/30 px-6 text-base font-medium text-white transition-colors hover:bg-white/10"
              >
                Позвонить
              </a>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
