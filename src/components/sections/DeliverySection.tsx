import { Container, Section, SectionHeading, Card } from '@/components/ui';
import { contentProvider } from '@/services';

export async function DeliverySection() {
  const steps = await contentProvider.getDeliverySteps();
  if (steps.length === 0) return null;

  return (
    <Section id="delivery" background="white">
      <Container>
        <SectionHeading
          title="Как проходит поставка"
          subtitle="От заявки до документов — прозрачный процесс"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((step) => (
            <Card key={step.id} padding="md" hover className="relative">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-deep-navy text-white text-sm font-semibold">
                  {step.step}
                </span>
              </div>
              <h3 className="text-base font-semibold text-deep-navy mb-2">{step.title}</h3>
              <p className="text-sm text-secondary-text leading-relaxed">{step.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
