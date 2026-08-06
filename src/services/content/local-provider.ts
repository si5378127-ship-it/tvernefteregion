import type { ContentProvider } from '@/types';
import { products } from '@/content/products';
import { industries } from '@/content/industries';
import { regions } from '@/content/regions';
import { deliverySteps } from '@/content/delivery';
import { supplyCases, testimonials, newsItems } from '@/content/cases';
import { faqItems } from '@/content/faq';

/**
 * Локальный провайдер контента.
 * При подключении Payload CMS будет заменён на PayloadContentProvider
 * с тем же интерфейсом ContentProvider — UI не потребует изменений.
 */
export class LocalContentProvider implements ContentProvider {
  async getProducts() {
    return products.filter((p) => p.active);
  }

  async getProductBySlug(slug: string) {
    return products.find((p) => p.slug === slug && p.active) ?? null;
  }

  async getIndustries() {
    return industries;
  }

  async getRegions() {
    return regions;
  }

  async getDeliverySteps() {
    return deliverySteps;
  }

  async getSupplyCases() {
    const activeTitles = new Set(
      products.filter((p) => p.active).map((p) => p.title.toLowerCase()),
    );
    return supplyCases.filter((item) =>
      activeTitles.has(item.product.toLowerCase()),
    );
  }

  async getFAQ() {
    return faqItems;
  }

  async getTestimonials() {
    return testimonials.filter((t) => t.active);
  }

  async getNews() {
    return newsItems.filter((n) => n.active);
  }
}
