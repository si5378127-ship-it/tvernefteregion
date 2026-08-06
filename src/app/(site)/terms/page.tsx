import { SiteLayout } from '@/components/layout/SiteLayout';
import { Container, Section, SectionHeading } from '@/components/ui';

export default function TermsPage() {
  return (
    <SiteLayout>
      <Section>
        <Container size="narrow">
          <SectionHeading title="Пользовательское соглашение" />
          <p className="text-sm text-warm-gray-600 leading-relaxed">
            Документ находится в разработке. TODO: добавить утверждённое пользовательское
            соглашение.
          </p>
        </Container>
      </Section>
    </SiteLayout>
  );
}
