import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { Breadcrumbs, Container, Section, ButtonLink } from '@/components/ui';
import { getCompanyMaxHref } from '@/config/cta';
import { siteConfig } from '@/config/site';
import {
  getIndexedPromotions,
  getPromotionBySlug,
  type Promotion,
} from '@/content/promotions';

/**
 * Static export requires generateStaticParams to yield ≥1 path for dynamic
 * segments. With an empty promotions list, emit a non-public placeholder that
 * always 404s (not in sitemap). Real slugs replace this once promotions exist.
 */
export function generateStaticParams() {
  const params = getIndexedPromotions().map((p) => ({ slug: p.slug }));
  return params.length > 0 ? params : [{ slug: '_' }];
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const promo = getPromotionBySlug(slug);
  if (!promo) {
    return {
      title: 'Страница не найдена',
      robots: { index: false, follow: false },
    };
  }

  const path = `/akcii/${promo.slug}`;
  return {
    title: promo.title,
    description: promo.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${promo.title} | ТверьНефтеРегион`,
      description: promo.description,
      url: path,
      type: 'website',
      locale: 'ru_RU',
      siteName: 'ТверьНефтеРегион',
      ...(promo.image
        ? { images: [{ url: promo.image.src, alt: promo.image.alt }] }
        : {}),
    },
  };
}

function promotionJsonLd(promo: Promotion) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: promo.title,
    description: promo.description,
    url: `${siteConfig.url}/akcii/${promo.slug}`,
    seller: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export default async function PromotionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const promo = getPromotionBySlug(slug);
  if (!promo) notFound();

  const maxHref = getCompanyMaxHref();

  return (
    <SiteLayout hideFooterCtaBand>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(promotionJsonLd(promo)) }}
      />
      <div className="bg-warm-gray-50 py-4">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: promo.heading },
            ]}
          />
        </Container>
      </div>
      <Section background="white">
        <Container size="narrow">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-deep-navy mb-4">
            {promo.heading}
          </h1>
          {promo.publishedAt && (
            <p className="text-sm text-secondary-text mb-6">
              {new Date(promo.publishedAt).toLocaleDateString('ru-RU')}
            </p>
          )}
          {promo.image && (
            <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-[20px]">
              <Image
                src={promo.image.src}
                alt={promo.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>
          )}
          <div className="space-y-4 text-base leading-relaxed text-secondary-text mb-8">
            {promo.body.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
          {promo.terms && promo.terms.length > 0 && (
            <div className="mb-8 rounded-[16px] border border-border bg-warm-light p-5">
              <h2 className="text-lg font-semibold text-deep-navy mb-3">Условия</h2>
              <ul className="space-y-2">
                {promo.terms.map((term) => (
                  <li key={term} className="text-sm text-secondary-text leading-relaxed">
                    {term}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <ButtonLink
            href={maxHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="green"
            size="lg"
          >
            Написать в MAX
          </ButtonLink>
        </Container>
      </Section>
    </SiteLayout>
  );
}
