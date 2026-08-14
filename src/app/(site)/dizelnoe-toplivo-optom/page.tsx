import type { Metadata } from 'next';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { Breadcrumbs, Container } from '@/components/ui';
import { DieselWholesaleContent } from '@/components/sections/diesel-wholesale/DieselWholesaleContent';
import { dieselWholesaleFaq } from '@/content/diesel-wholesale-landing';
import { siteConfig } from '@/config/site';
import { getBreadcrumbJsonLd, getFaqPageJsonLd } from '@/lib/seo';

const pageTitle = 'Дизельное топливо оптом с доставкой';
/** Полный document title (absolute — без повторного применения titleTemplate). */
const documentTitle = 'Дизельное топливо оптом с доставкой — ТверьНефтеРегион';
const pageDescription =
  'Оптовая поставка дизельного топлива с доставкой предприятиям и на объекты. Летнее, межсезонное и зимнее ДТ. Доставка по Тверской и другим рабочим направлениям компании. Расчёт стоимости поставки.';

export const metadata: Metadata = {
  title: {
    absolute: documentTitle,
  },
  description: pageDescription,
  alternates: {
    canonical: '/dizelnoe-toplivo-optom',
  },
  openGraph: {
    title: `${pageTitle} | ТверьНефтеРегион`,
    description: pageDescription,
    url: '/dizelnoe-toplivo-optom',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'ТверьНефтеРегион',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pageTitle} | ТверьНефтеРегион`,
    description: pageDescription,
  },
};

export default function DieselWholesalePage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Главная', url: siteConfig.url },
    {
      name: pageTitle,
      url: `${siteConfig.url}/dizelnoe-toplivo-optom`,
    },
  ]);
  const faqJsonLd = getFaqPageJsonLd(dieselWholesaleFaq);

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
              { label: 'Дизельное топливо оптом' },
            ]}
          />
        </Container>
      </div>
      <DieselWholesaleContent />
    </SiteLayout>
  );
}
