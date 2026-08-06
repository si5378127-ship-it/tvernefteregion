import type {
  ContentProvider,
  DeliveryStep,
  FAQItem,
  Industry,
  NewsItem,
  Product,
  Region,
  SupplyCase,
  Testimonial,
} from '@/types';

/**
 * Заготовка провайдера Payload CMS.
 * Не подключена: нет DATABASE_URI / PAYLOAD_SECRET.
 * После интеграции реализовать методы через payload.find / payload.findByID
 * и вернуть данные, совместимые с типами из @/types.
 *
 * Переключение: src/services/content/index.ts
 */
export class PayloadContentProvider implements ContentProvider {
  private notReady(): never {
    throw new Error(
      'PayloadContentProvider ещё не подключён. Используйте LocalContentProvider или задайте CONTENT_SOURCE=payload после настройки CMS.',
    );
  }

  async getProducts(): Promise<Product[]> {
    return this.notReady();
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    void slug;
    return this.notReady();
  }

  async getIndustries(): Promise<Industry[]> {
    return this.notReady();
  }

  async getRegions(): Promise<Region[]> {
    return this.notReady();
  }

  async getDeliverySteps(): Promise<DeliveryStep[]> {
    return this.notReady();
  }

  async getSupplyCases(): Promise<SupplyCase[]> {
    return this.notReady();
  }

  async getFAQ(): Promise<FAQItem[]> {
    return this.notReady();
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return this.notReady();
  }

  async getNews(): Promise<NewsItem[]> {
    return this.notReady();
  }
}
