import Link from 'next/link';
import { Container, Section, SectionHeading, Card } from '@/components/ui';
import { contentProvider } from '@/services';
import { MapPin } from 'lucide-react';

export async function GeographySection({
  regionHrefs,
}: {
  regionHrefs?: Partial<Record<string, string>>;
} = {}) {
  const regions = await contentProvider.getRegions();
  if (regions.length === 0) return null;

  return (
    <Section id="geography" background="warm">
      <Container>
        <SectionHeading
          title="География поставок"
          subtitle="Работаем по пяти областям Центральной России"
        />
        {/*
          Адаптив для 5 карточек:
          mobile 1 | tablet 2+2+1 (центр) | desktop 3+2 (центр)
        */}
        <div className="flex flex-wrap justify-center gap-5">
          {regions.map((region) => (
            <Card
              key={region.id}
              padding="md"
              hover
              className="w-full sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
            >
              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-green"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="mb-1 text-base font-semibold text-deep-navy">
                    {regionHrefs?.[region.slug] ? (
                      <Link
                        href={regionHrefs[region.slug]!}
                        className="text-deep-navy hover:text-brand-blue"
                      >
                        {region.name}
                      </Link>
                    ) : (
                      region.name
                    )}
                  </h3>
                  <p className="text-sm leading-relaxed text-secondary-text">{region.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
