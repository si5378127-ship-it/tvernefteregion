'use client';

import { Container, Section, Button, ButtonLink } from '@/components/ui';
import { useContactSheet } from '@/components/layout/ContactSheetContext';
import { getHeaderPhone } from '@/config/contacts';
import { getCompanyMaxHref } from '@/config/cta';

export function FinalCTASection() {
  const { openContactSheet } = useContactSheet();
  const phone = getHeaderPhone();
  const maxHref = getCompanyMaxHref();

  return (
    <Section background="dark">
      <Container>
        <div className="text-center max-w-2xl mx-auto py-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Нужна поставка нефтепродуктов?
          </h2>
          <p className="text-warm-gray-400 mb-8 leading-relaxed">
            Напишите в MAX или позвоните — обсудим условия и согласуем поставку.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink
              href={maxHref}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              variant="green"
            >
              Узнать стоимость
            </ButtonLink>
            <Button
              variant="outline"
              size="lg"
              onClick={openContactSheet}
              className="border-warm-gray-600 text-white hover:bg-graphite-light"
            >
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
