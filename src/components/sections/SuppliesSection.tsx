import { Container, Section, SectionHeading, Card, Badge } from '@/components/ui';
import { contentProvider } from '@/services';
import { formatDate } from '@/lib/utils';

export async function SuppliesSection() {
  const cases = await contentProvider.getSupplyCases();
  if (cases.length === 0) return null;

  return (
    <Section id="supplies" background="white">
      <Container>
        <SectionHeading
          title="Последние поставки"
          subtitle="Примеры выполненных поставок"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map((item) => (
            <Card key={item.id} padding="md" hover>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="blue">{item.region}</Badge>
              </div>
              <h3 className="text-base font-semibold text-deep-navy mb-1">{item.title}</h3>
              <p className="text-sm text-secondary-text mb-2">{item.product}</p>
              <p className="text-sm text-secondary-text leading-relaxed">{item.description}</p>
              {item.date && (
                <p className="text-xs text-secondary-text/80 mt-3">{formatDate(item.date)}</p>
              )}
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
