import { Container, Section, SectionHeading, ProductCard } from '@/components/ui';
import { contentProvider } from '@/services';

export async function ProductsSection() {
  const products = await contentProvider.getProducts();
  if (products.length === 0) return null;

  return (
    <Section id="products" background="warm">
      <Container>
        <SectionHeading
          title="Нефтепродукты"
          subtitle="Дизельное и печное топливо для предприятий"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
