import { Container, Section, SectionHeading, Card } from '@/components/ui';
import { contentProvider } from '@/services';

export async function TestimonialsSection() {
  const testimonials = await contentProvider.getTestimonials();

  // Пустой блок не показываем — нет подтверждённых отзывов
  if (testimonials.length === 0) return null;

  return (
    <Section id="testimonials" background="white">
      <Container>
        <SectionHeading title="Отзывы" align="center" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <Card key={t.id} padding="md" hover>
              <p className="text-sm text-primary-text leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="text-sm font-semibold text-deep-navy">{t.author}</p>
                {t.company && (
                  <p className="text-xs text-secondary-text mt-0.5">{t.company}</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
