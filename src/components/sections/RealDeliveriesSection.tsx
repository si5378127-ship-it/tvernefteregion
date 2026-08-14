import Image from 'next/image';
import Link from 'next/link';
import { Container, Section, SectionHeading, Card, Badge } from '@/components/ui';
import { realDeliveries } from '@/content/real-deliveries';
import { RealDeliveriesCalculateCta } from './RealDeliveriesCalculateCta';

export function RealDeliveriesSection() {
  if (realDeliveries.length === 0) return null;

  return (
    <Section id="real-deliveries" background="white">
      <Container>
        <SectionHeading
          title="Реальные поставки на объекты"
          subtitle={
            <>
              Доставляем{' '}
              <Link
                href="/dizelnoe-toplivo-optom"
                className="font-medium text-brand-blue underline-offset-2 hover:underline"
              >
                дизельное топливо
              </Link>{' '}
              предприятиям и непосредственно на объекты заказчиков. Здесь — несколько примеров
              реальных поставок по рабочим направлениям компании.
            </>
          }
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {realDeliveries.map((item) => {
            const cover = item.images[0];

            return (
              <Card key={item.id} padding="md" hover className="flex h-full flex-col">
                {cover ? (
                  <div className="relative mb-4 aspect-[3/2] w-full overflow-hidden rounded-[16px] bg-warm-light">
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      fill
                      className="object-cover"
                      style={
                        cover.objectPosition
                          ? { objectPosition: cover.objectPosition }
                          : undefined
                      }
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={false}
                    />
                  </div>
                ) : null}

                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge variant="blue">{item.region}</Badge>
                </div>

                <p className="mb-1 text-sm font-medium text-brand-green">{item.location}</p>
                <h3 className="mb-2 text-base font-semibold leading-snug text-deep-navy">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-secondary-text">{item.description}</p>

                {item.date ? (
                  <p className="mt-3 text-xs text-secondary-text/80">{item.date}</p>
                ) : null}
              </Card>
            );
          })}
        </div>

        <div className="mt-10 rounded-[22px] border border-border bg-warm-light px-5 py-8 text-center md:mt-12 md:px-8">
          <h3 className="mb-2 text-xl font-semibold tracking-tight text-deep-navy md:text-2xl">
            Нужна поставка в ваш район?
          </h3>
          <p className="mx-auto mb-6 max-w-xl text-base leading-relaxed text-secondary-text">
            Сообщите населённый пункт, вид топлива и необходимый объём — рассчитаем возможность и
            стоимость доставки.
          </p>
          <RealDeliveriesCalculateCta />
        </div>
      </Container>
    </Section>
  );
}
