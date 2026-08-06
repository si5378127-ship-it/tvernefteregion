import type { Metadata } from 'next';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { LegalDocumentView } from '@/components/legal';
import { legalProvider } from '@/services/legal';

export const metadata: Metadata = {
  title: 'Согласие на обработку персональных данных',
  description:
    'Согласие на обработку персональных данных при использовании сайта и форм обратной связи ТверьНефтеРегион.',
  alternates: {
    canonical: '/consent',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function ConsentPage() {
  const document = await legalProvider.getDocument('consent');

  return (
    <SiteLayout>
      <LegalDocumentView document={document} />
    </SiteLayout>
  );
}
