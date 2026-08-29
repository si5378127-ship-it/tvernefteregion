import Link from 'next/link';
import { Check, MapPin } from 'lucide-react';
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
import { CalculateSection } from '@/components/sections/CalculateSection';
import { RealDeliveriesSection } from '@/components/sections/RealDeliveriesSection';
import {
  dieselWholesaleAudienceIds,
  dieselWholesaleDeliverySteps,
  dieselWholesaleTrustPoints,
} from '@/content/diesel-wholesale-landing';
import {
  tverRegionCities,
  tverRegionFaq,
  tverRegionGeographyDescription,
  tverRegionHeroDescription,
  tverRegionRealDeliveries,
  tverRegionSupplyDescription,
  tverRegionSupplyDirections,
  tverRegionSupplyTitle,
} from '@/content/tver-region-landing';
import { DieselWholesaleHero } from './DieselWholesaleHero';
import { DieselWholesaleCostCta } from './DieselWholesaleCostCta';
import { DieselWholesaleFinalCta } from './DieselWholesaleFinalCta';

const linkClass = 'text-brand-blue underline-offset-2 hover:underline';

export async function TverRegionContent() {
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
      <DieselWholesaleHero
        title={
          <>
            Дизельное топливо оптом
            <br />
            в Тверской области
          </>
        }
        description={tverRegionHeroDescription}
      />

      <Section id="tver-supply" background="white">
        <Container>
          <SectionHeading title={tverRegionSupplyTitle} subtitle={tverRegionSupplyDescription} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tverRegionSupplyDirections.map((direction) => (
              <Card key={direction} padding="md" hover>
                <div className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-green"
                    aria-hidden="true"
                  />
                  <h3 className="text-base font-semibold text-deep-navy">{direction}</h3>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

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
            <Link href="/dizelnoe-toplivo-optom/" className={linkClass}>
              дизельное топливо оптом
            </Link>
            .
          </p>
        </Container>
      </Section>

      <Section id="audience" background="white">
        <Container>
          <SectionHeading
            title="Кому поставляем"
            subtitle="Оптовые поставки дизельного топлива для предприятий, организаций и объектов со спецтехникой в Тверской области"
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
            Подробнее об{' '}
            <Link href="/#delivery" className={linkClass}>
              условиях доставки
            </Link>
            .
          </p>
        </Container>
      </Section>

      <RealDeliveriesSection
        title="Реальные поставки по Тверской области"
        subtitle="Поставляем дизельное топливо непосредственно на объекты заказчиков. Ниже — примеры выполненных поставок в Тверской области."
        items={tverRegionRealDeliveries}
      />

      <Section id="tver-geography" background="warm">
        <Container>
          <SectionHeading
            title="География поставок в Тверской области"
            subtitle={tverRegionGeographyDescription}
          />
          <div className="flex flex-wrap justify-center gap-5">
            {tverRegionCities.map((city) => (
              <Card
                key={city}
                padding="md"
                hover
                className="w-full sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
              >
                <div className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-green"
                    aria-hidden="true"
                  />
                  <h3 className="text-base font-semibold text-deep-navy">{city}</h3>
                </div>
              </Card>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-secondary-text">
            Перечень городов показывает географию обслуживания, а не выполненную поставку в каждый
            населённый пункт. Возможность доставки на конкретный объект уточняется индивидуально.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-secondary-text">
            Общие условия оптовых поставок — на странице{' '}
            <Link href="/dizelnoe-toplivo-optom/" className={linkClass}>
              дизельное топливо оптом
            </Link>
            . О комплекте закрывающих документов — в блоке{' '}
            <Link href="/#documents" className={linkClass}>
              документы на продукцию
            </Link>
            . Связаться с менеджером можно на странице{' '}
            <Link href="/kontakty/" className={linkClass}>
              контакты
            </Link>
            .
          </p>
        </Container>
      </Section>

      <DocumentsSection />
      <div className="bg-white pb-2 text-center">
        <Container>
          <p className="mx-auto max-w-3xl pb-10 text-sm leading-relaxed text-secondary-text">
            Обезличенные образцы документов — в блоке{' '}
            <Link href="/#documents" className={linkClass}>
              документы на продукцию
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
          <SectionHeading
            title="Вопросы о поставке дизельного топлива по Тверской области"
            align="center"
          />
          <Accordion items={tverRegionFaq} />
        </Container>
      </Section>

      <CalculateSection />
      <DieselWholesaleFinalCta />
    </>
  );
}
