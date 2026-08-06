import { Container, Section, SectionHeading, Card } from '@/components/ui';
import { contentProvider } from '@/services';
import { MapPin } from 'lucide-react';

export async function GeographySection() {
  const regions = await contentProvider.getRegions();
  if (regions.length === 0) return null;

  return (
    <Section id="geography" background="warm">
      <Container>
        <SectionHeading
          title="География поставок"
          subtitle="Работаем по четырём областям Центральной России"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {regions.map((region) => (
            <Card key={region.id} padding="md" hover>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-green flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-base font-semibold text-deep-navy mb-1">{region.name}</h3>
                  <p className="text-sm text-secondary-text leading-relaxed">{region.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
