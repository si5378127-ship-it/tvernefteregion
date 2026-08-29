import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getIndexedPromotions } from '@/content/promotions';

/** Static export: sitemap генерируется на билде. */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const pages: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/dizelnoe-toplivo-optom`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/dizelnoe-toplivo-optom/tverskaya-oblast`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${base}/kontakty`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${base}/consent`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  for (const promo of getIndexedPromotions()) {
    pages.push({
      url: `${base}/akcii/${promo.slug}`,
      lastModified: promo.publishedAt ? new Date(promo.publishedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  return pages;
}
