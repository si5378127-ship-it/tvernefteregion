import Link from 'next/link';
import { Check } from 'lucide-react';
import {
  Container,
  Section,
  SectionHeading,
  ProductCard,
  IndustryCard,
  Card,
  Accordion,
} from '@/components/ui';
import { contentProvider } from '@/services';
import { DocumentsSection } from '@/components/sections/DocumentsSection';
import { GeographySection } from '@/components/sections/GeographySection';
import { CalculateSection } from '@/components/sections/CalculateSection';
import {
  dieselWholesaleAudienceIds,
  dieselWholesaleDeliverySteps,
  dieselWholesaleFaq,
  dieselWholesaleTrustPoints,
} from '@/content/diesel-wholesale-landing';
import { DieselWholesaleHero } from './DieselWholesaleHero';
import { DieselWholesaleCostCta } from './DieselWholesaleCostCta';
import { DieselWholesaleFinalCta } from './DieselWholesaleFinalCta';

export async function DieselWholesaleContent() {
  const [products, industries] = await Promise.all([
    contentProvider.getProducts(),
    contentProvider.getIndustries(),
  ]);

  const dieselProducts = products.filter((p) => p.id.startsWith('diesel-'));
  const audience = industries.filter((item) =>
    (dieselWholesaleAudienceIds as readonly string[]).includes(item.id),
  );

  return (
    <>
      <DieselWholesaleHero />

      <Section id="fuel-types" background="warm">
        <Container>
          <SectionHeading
            title="Виды дизельного топлива"
            subtitle="Летнее, межсезонное и зимнее ДТ для оптовой поставки предприятиям"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dieselProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-secondary-text">
            Актуальную стоимость поставки рассчитает менеджер с учётом вида топлива, объёма и адреса
            доставки. Цены на карточках — ориентир «от»; итоговая стоимость согласуется индивидуально.{' '}
            <Link href="/#products" className="text-brand-blue underline-offset-2 hover:underline">
              Смотреть продукцию на главной
            </Link>
            .
          </p>
        </Container>
      </Section>

      <Section id="audience" background="white">
        <Container>
          <SectionHeading
            title="Кому поставляем"
            subtitle="Оптовые поставки дизельного топлива для предприятий, организаций и объектов со спецтехникой"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {audience.map((industry) => (
              <IndustryCard key={industry.id} industry={industry} />
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-secondary-text">
            Также работаем с объектами, у которых есть собственная ёмкость для хранения топлива, и с
            владельцами техники, которую заправляют непосредственно на объекте.
          </p>
        </Container>
      </Section>

      <Section id="pricing" background="warm">
        <Container size="narrow">
          <SectionHeading
            title="Как формируется стоимость"
            subtitle="Стоимость оптовой поставки рассчитывается индивидуально"
            align="center"
          />
          <Card padding="lg" className="mx-auto max-w-2xl">
            <p className="mb-4 text-base leading-relaxed text-secondary-text">
              Итоговая цена зависит от:
            </p>
            <ul className="mb-6 space-y-2.5">
              {[
                'вида дизельного топлива',
                'объёма',
                'населённого пункта и адреса объекта',
                'условий доставки',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-base text-primary-text">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-green" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <DieselWholesaleCostCta />
          </Card>
        </Container>
      </Section>

      <Section id="delivery-process" background="white">
        <Container>
          <SectionHeading
            title="Как проходит поставка"
            subtitle="От заявки до слива топлива в ёмкость на объекте"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {dieselWholesaleDeliverySteps.map((step) => (
              <Card key={step.id} padding="md" hover className="relative">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-deep-navy text-sm font-semibold text-white">
                    {step.step}
                  </span>
                </div>
                <h3 className="mb-2 text-base font-semibold text-deep-navy">{step.title}</h3>
                <p className="text-sm leading-relaxed text-secondary-text">{step.description}</p>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-secondary-text">
            Подробнее о процессе — в разделе{' '}
            <Link href="/#delivery" className="text-brand-blue underline-offset-2 hover:underline">
              доставки на главной
            </Link>
            .
          </p>
        </Container>
      </Section>

      <GeographySection />
      <div className="bg-warm-light pb-2 text-center">
        <Container>
          <p className="mx-auto max-w-3xl pb-10 text-base leading-relaxed text-secondary-text">
            Организуем поставки дизельного топлива предприятиям и на объекты в Тверской области и по
            другим рабочим направлениям компании.
          </p>
        </Container>
      </div>

      <DocumentsSection />
      <div className="bg-white pb-2 text-center">
        <Container>
          <p className="mx-auto max-w-3xl pb-10 text-sm leading-relaxed text-secondary-text">
            Обезличенные образцы документов — в блоке{' '}
            <Link href="/#documents" className="text-brand-blue underline-offset-2 hover:underline">
              документов на главной
            </Link>
            . Актуальный паспорт предоставляется на конкретную партию.
          </p>
        </Container>
      </div>

      <Section id="trust" background="warm">
        <Container size="narrow">
          <SectionHeading
            title="Почему обращаются в ТверьНефтеРегион"
            subtitle="Понятные условия поставки без лишних обещаний"
            align="center"
          />
          <ul className="mx-auto max-w-2xl space-y-3">
            {dieselWholesaleTrustPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-xl border border-border bg-white px-4 py-3 text-base text-primary-text"
              >
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-green" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="faq" background="white">
        <Container size="narrow">
          <SectionHeading title="Частые вопросы" align="center" />
          <Accordion items={dieselWholesaleFaq} />
        </Container>
      </Section>

      <CalculateSection />
      <DieselWholesaleFinalCta />
    </>
  );
}
