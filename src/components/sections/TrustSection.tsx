import Image from 'next/image';
import { Container, Section, SectionHeading } from '@/components/ui';

export function TrustSection() {
  return (
    <Section id="about" background="white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <SectionHeading
              title="Люди возвращаются к людям, которым доверяют"
              subtitle="В поставках нефтепродуктов важно понимать, кто отвечает на звонок, кто знает условия поставки и кто остаётся на связи после согласования заказа."
            />
            <ul className="mt-6 space-y-3">
              {[
                'Личная ответственность за каждую поставку',
                'Многолетний практический опыт специалистов',
                'Работа с проверенными водителями и перевозчиками',
                'Реальные поставки с документами на продукцию',
              ].map((text) => (
                <li key={text} className="flex items-start gap-2.5 text-sm text-primary-text">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-green flex-shrink-0" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[24px] overflow-hidden shadow-md ring-1 ring-border">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/transport/gazelle.jpg"
                alt="Специализированный транспорт для поставки нефтепродуктов"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
