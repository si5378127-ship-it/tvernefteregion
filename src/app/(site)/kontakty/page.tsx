import type { Metadata } from 'next';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { ContactsSection } from '@/components/sections/ContactsSection';
import { Breadcrumbs } from '@/components/ui';
import { Container } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Контакты',
  description:
    'Свяжитесь с ТверьНефтеРегион удобным способом: телефон, мессенджеры или форма обратной связи.',
  alternates: {
    canonical: '/kontakty',
  },
};

export default function ContactsPage() {
  return (
    <SiteLayout>
      <div className="bg-warm-gray-50 py-4">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Контакты' },
            ]}
          />
        </Container>
      </div>
      <ContactsSection />
    </SiteLayout>
  );
}
