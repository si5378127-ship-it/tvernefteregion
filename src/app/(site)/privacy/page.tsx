import type { Metadata } from 'next';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { LegalDocumentView } from '@/components/legal';
import { legalProvider } from '@/services/legal';

export const metadata: Metadata = {
  title: 'Политика обработки персональных данных',
  description:
    'Политика обработки персональных данных ООО «ТверьНефтеРегион»: цели, правовые основания, сроки хранения и права субъектов персональных данных.',
  alternates: {
    canonical: '/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function PrivacyPage() {
  const document = await legalProvider.getDocument('privacy-policy');

  return (
    <SiteLayout>
      <LegalDocumentView document={document} />
    </SiteLayout>
  );
}
