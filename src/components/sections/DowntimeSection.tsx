import { Container, Section, Card } from '@/components/ui';
import { CheckCircle2 } from 'lucide-react';

const principles = [
  'Согласовываем реальные условия',
  'Заранее уточняем маршрут, подъезд и место слива',
  'Остаёмся на связи до завершения поставки',
];

export function DowntimeSection() {
  return (
    <Section id="downtime" background="navy" compact>
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-[2.15rem] font-semibold tracking-tight text-white mb-3 leading-[1.2]">
            Простой техники стоит дороже своевременной поставки
          </h2>
          <p className="text-base md:text-lg text-[#B9C5CF] leading-relaxed mb-8">
            Когда останавливается техника или оборудование, предприятие теряет время, рабочие часы и деньги.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {principles.map((text) => (
              <Card
                key={text}
                padding="md"
                className="bg-petrol/60 border-white/10 text-white shadow-none"
              >
                <div className="flex flex-col items-center gap-3 text-center">
                  <CheckCircle2 className="h-6 w-6 text-brand-green" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-[#E8EEF5]">{text}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
