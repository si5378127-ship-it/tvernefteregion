import { Container, Section, SectionHeading } from '@/components/ui';
import { CalculateForm } from '@/components/forms/CalculateForm';
import { contentProvider } from '@/services';

export async function CalculateSection() {
  const products = await contentProvider.getProducts();
  const productOptions = products.map((p) => ({ value: p.id, label: p.title }));

  return (
    <Section id="calculate" background="warm" compact>
      <Container size="narrow">
        <SectionHeading
          title="Быстрый расчет стоимости"
          subtitle="Заполните всего несколько полей — мы быстро подготовим расчет и свяжемся с вами."
          align="center"
        />
        <div className="rounded-[24px] border border-border bg-white p-5 md:p-8 shadow-sm">
          <CalculateForm productOptions={productOptions} />
        </div>
      </Container>
    </Section>
  );
}
