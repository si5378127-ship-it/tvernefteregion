'use client';

import { Container, Section, ButtonLink } from '@/components/ui';
import { useHeaderPhone } from '@/components/layout/ContactChannelsContext';
import { getCompanyMaxHref } from '@/config/cta';

export function DieselWholesaleFinalCta() {
  const phone = useHeaderPhone();
  const maxHref = getCompanyMaxHref();

  return (
    <Section background="navy" compact>
      <Container>
        <div className="mx-auto max-w-2xl py-6 text-center">
          <h2 className="mb-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Нужна оптовая поставка дизельного топлива?
          </h2>
          <p className="mb-6 leading-relaxed text-white/70">
            Напишите в MAX или позвоните — уточним вид топлива, объём и адрес доставки.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
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
