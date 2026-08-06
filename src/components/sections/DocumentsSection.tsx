import { FileCheck, FileSpreadsheet, ClipboardList } from 'lucide-react';
import { Container, Section, SectionHeading, Card } from '@/components/ui';
import { DocumentCarousel } from '@/components/ui/DocumentCarousel';
import { qualityDocuments } from '@/content/documents';

const items = [
  {
    icon: FileCheck,
    title: 'Паспорт качества',
    description: 'Предоставляем паспорт качества на поставляемую партию продукции.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Документы для бухгалтерии',
    description: 'Работаем с НДС и предоставляем комплект закрывающих документов.',
  },
  {
    icon: ClipboardList,
    title: 'Согласование до поставки',
    description: 'Характеристики топлива и условия поставки согласовываются до отгрузки.',
  },
];

export function DocumentsSection() {
  return (
    <Section id="documents" background="warm">
      <Container>
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
            <SectionHeading
              title="Качество подтверждается документами"
              subtitle="Каждая поставка сопровождается документами на конкретную партию топлива."
              className="mb-0"
            />
          </div>

          <div className="lg:col-span-7 lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <DocumentCarousel documents={qualityDocuments} />
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:row-start-2">
            <div className="space-y-3.5 md:space-y-4">
              {items.map((item) => (
                <Card key={item.title} padding="md" hover>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-green-light">
                      <item.icon className="h-5 w-5 text-brand-green" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-base font-semibold text-deep-navy">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-secondary-text">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <p className="mt-5 text-sm leading-relaxed text-secondary-text md:mt-6">
              Оригиналы документов предоставляются вместе с конкретной поставкой.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
