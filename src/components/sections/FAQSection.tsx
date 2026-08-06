import { Container, Section, SectionHeading, Accordion } from '@/components/ui';
import { contentProvider } from '@/services';

export async function FAQSection() {
  const faq = await contentProvider.getFAQ();

  return (
    <Section id="faq" background="white">
      <Container size="narrow">
        <SectionHeading title="Частые вопросы" align="center" />
        <Accordion items={faq} />
      </Container>
    </Section>
  );
}
