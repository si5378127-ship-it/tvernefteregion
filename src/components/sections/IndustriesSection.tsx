import { Container, Section, SectionHeading, IndustryCard } from '@/components/ui';
import { contentProvider } from '@/services';

export async function IndustriesSection() {
  const industries = await contentProvider.getIndustries();
  if (industries.length === 0) return null;

  return (
    <Section id="industries" background="white">
      <Container>
        <SectionHeading
          title="Для каких предприятий работаем"
          subtitle="Организуем поставки для организаций, где техника и оборудование не могут простаивать"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {industries.map((industry) => (
            <IndustryCard key={industry.id} industry={industry} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
