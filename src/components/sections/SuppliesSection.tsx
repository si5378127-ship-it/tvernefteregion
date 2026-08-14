import Image from 'next/image';
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
          title="Реальные поставки"
          subtitle="Фото с реальных объектов наших клиентов"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((item) => (
            <Card key={item.id} padding="md" hover className="flex h-full flex-col">
              {item.image ? (
                <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-[16px]">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ) : null}
              <div className="mb-3 flex items-center gap-2">
                <Badge variant="blue">{item.region}</Badge>
              </div>
              <h3 className="mb-1 text-base font-semibold text-deep-navy">{item.title}</h3>
              <p className="mb-2 text-sm text-secondary-text">{item.product}</p>
              <p className="text-sm leading-relaxed text-secondary-text">{item.description}</p>
              {item.date ? (
                <p className="mt-3 text-xs text-secondary-text/80">{formatDate(item.date)}</p>
              ) : null}
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
