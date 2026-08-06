import { Container, Section, SectionHeading, Card } from '@/components/ui';
import { contentProvider } from '@/services';
import { formatDate } from '@/lib/utils';

export async function NewsSection() {
  const news = await contentProvider.getNews();

  if (news.length === 0) return null;

  return (
    <Section id="news" background="warm">
      <Container>
        <SectionHeading title="Актуально сейчас" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {news.map((item) => (
            <Card key={item.id} padding="md" hover>
              <h3 className="text-base font-semibold text-graphite mb-2">{item.title}</h3>
              <p className="text-sm text-warm-gray-600 leading-relaxed">{item.excerpt}</p>
              {item.date && (
                <p className="text-xs text-warm-gray-400 mt-3">{formatDate(item.date)}</p>
              )}
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
