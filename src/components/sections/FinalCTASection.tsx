'use client';

import { Container, Section, Button } from '@/components/ui';
import { useContactSheet } from '@/components/layout/ContactSheetContext';
import { getHeaderPhone } from '@/config/contacts';

export function FinalCTASection() {
  const { openContactSheet, scrollToSection } = useContactSheet();
  const phone = getHeaderPhone();

  return (
    <Section background="dark">
      <Container>
        <div className="text-center max-w-2xl mx-auto py-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Нужна поставка нефтепродуктов?
          </h2>
          <p className="text-warm-gray-400 mb-8 leading-relaxed">
            Оставьте заявку на расчёт или свяжитесь с нами — обсудим условия и согласуем поставку.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={() => scrollToSection('calculate')}>
              Рассчитать стоимость
            </Button>
            <Button variant="outline" size="lg" onClick={openContactSheet} className="border-warm-gray-600 text-white hover:bg-graphite-light">
              Связаться
            </Button>
            {phone && (
              <a
                href={phone.href}
                className="inline-flex items-center justify-center h-12 px-6 text-base rounded-lg font-medium text-white hover:bg-graphite-light transition-colors min-h-[44px]"
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
