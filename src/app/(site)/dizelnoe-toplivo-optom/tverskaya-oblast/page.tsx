import type { Metadata } from 'next';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { Breadcrumbs, Container } from '@/components/ui';
import { TverRegionContent } from '@/components/sections/diesel-wholesale/TverRegionContent';
import {
  tverRegionDescription,
  tverRegionDocumentTitle,
  tverRegionFaq,
  tverRegionPagePath,
} from '@/content/tver-region-landing';
import { siteConfig } from '@/config/site';
import { getBreadcrumbJsonLd, getFaqPageJsonLd } from '@/lib/seo';

const pageTitle = 'Дизельное топливо оптом в Тверской области с доставкой';

export const metadata: Metadata = {
  title: {
    absolute: tverRegionDocumentTitle,
  },
  description: tverRegionDescription,
  alternates: {
    canonical: tverRegionPagePath,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${pageTitle} | ТверьНефтеРегион`,
    description: tverRegionDescription,
    url: tverRegionPagePath,
    type: 'website',
    locale: 'ru_RU',
    siteName: 'ТверьНефтеРегион',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pageTitle} | ТверьНефтеРегион`,
    description: tverRegionDescription,
  },
};

export default function TverRegionDieselPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Главная', url: siteConfig.url },
    {
      name: 'Дизельное топливо оптом',
      url: `${siteConfig.url}/dizelnoe-toplivo-optom`,
    },
    {
      name: 'Тверская область',
      url: `${siteConfig.url}${tverRegionPagePath}`,
    },
  ]);
  const faqJsonLd = getFaqPageJsonLd(tverRegionFaq);

  return (
    <SiteLayout hideFooterCtaBand>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="bg-warm-gray-50 py-4">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Дизельное топливо оптом', href: '/dizelnoe-toplivo-optom/' },
              { label: 'Тверская область' },
            ]}
          />
        </Container>
      </div>
      <TverRegionContent />
    </SiteLayout>
  );
}
