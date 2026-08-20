/**
 * Статические акции / спецпредложения.
 * Пока список пуст — маршруты /akcii и /akcii/[slug] не публикуются.
 * Чтобы опубликовать акцию: добавьте объект в `promotions` и пересоберите сайт.
 */

export interface Promotion {
  slug: string;
  title: string;
  description: string;
  /** Текст H1 на странице акции */
  heading: string;
  body: string[];
  image?: {
    src: string;
    alt: string;
  };
  /** Дата публикации (ISO), опционально */
  publishedAt?: string;
  /** Условия акции */
  terms?: string[];
  /** Показывать в sitemap */
  indexed?: boolean;
}

/** Реальные акции добавляются сюда. Пустой массив = нет публичных страниц. */
export const promotions: Promotion[] = [];

export function getPromotionBySlug(slug: string): Promotion | undefined {
  return promotions.find((p) => p.slug === slug);
}

export function getIndexedPromotions(): Promotion[] {
  return promotions.filter((p) => p.indexed !== false);
}
