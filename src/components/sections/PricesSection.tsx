import Link from 'next/link';
import { Container, Section, SectionHeading, PriceCard } from '@/components/ui';
import { contentProvider } from '@/services';
import { priceDisclaimer } from '@/config/site';

export async function PricesSection() {
  const products = await contentProvider.getProducts();
  if (products.length === 0) return null;

  return (
    <Section id="prices" background="white">
      <Container>
        <SectionHeading
          title="Стоимость топлива"
          subtitle="Итоговая цена зависит от вида продукта, объёма, маршрута и актуальной оптовой цены"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <PriceCard key={product.id} product={product} hover />
          ))}
        </div>
        <p className="mt-6 text-sm text-secondary-text text-center max-w-2xl mx-auto">
          {priceDisclaimer}{' '}
          Условия{' '}
          <Link
            href="/dizelnoe-toplivo-optom"
            className="font-medium text-brand-blue underline-offset-2 hover:underline"
          >
            оптовой поставки с доставкой
          </Link>{' '}
          — на отдельной странице.
        </p>
      </Container>
    </Section>
  );
}
