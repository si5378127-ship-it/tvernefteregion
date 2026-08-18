import { Container, Section, SectionHeading, ButtonLink } from '@/components/ui';
import { getCompanyMaxHref, getCompanyPhoneHref } from '@/config/cta';

/** Коммерческий CTA вместо серверной формы расчёта. */
export function CalculateSection() {
  const maxHref = getCompanyMaxHref();
  const phoneHref = getCompanyPhoneHref();

  return (
    <Section id="calculate" background="warm" compact>
      <Container size="narrow">
        <SectionHeading
          title="Быстрый расчет стоимости"
          subtitle="Напишите в MAX — уточним объём и населённый пункт и рассчитаем стоимость поставки."
          align="center"
        />
        <div className="rounded-[24px] border border-border bg-white p-5 md:p-8 shadow-sm text-center">
          <p className="text-base text-secondary-text leading-relaxed mb-6 max-w-lg mx-auto">
            Нужна стоимость с доставкой? Свяжитесь напрямую — подготовим расчёт по вашим условиям.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <ButtonLink
              href={maxHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="green"
              size="lg"
              className="sm:min-w-[240px]"
            >
              Узнать стоимость в MAX
            </ButtonLink>
            {phoneHref && (
              <ButtonLink href={phoneHref} variant="outline" size="lg" className="sm:min-w-[180px]">
                Позвонить
              </ButtonLink>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
