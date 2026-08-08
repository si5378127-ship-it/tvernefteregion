import type { SiteConfig, SEOConfig } from '@/types';

const seoTitle = 'Дизельное топливо с доставкой | ТверьНефтеРегион';
const seoDescription =
  'Поставка дизельного топлива для предприятий с доставкой по Тверской, Новгородской, Ярославской и Смоленской областям. Расчёт стоимости и заказ топлива.';

/** Абсолютный URL сайта для metadataBase / Open Graph (без trailing slash). */
function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
  const isLocalhost = !configured || /localhost|127\.0\.0\.1/i.test(configured);

  // На Vercel не отдаём localhost в og:image — мессенджеры его не откроют.
  if (isLocalhost) {
    const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(/^https?:\/\//, '');
    if (vercelProd) return `https://${vercelProd}`;

    const vercelUrl = process.env.VERCEL_URL?.replace(/^https?:\/\//, '');
    if (vercelUrl) return `https://${vercelUrl}`;
  }

  return configured || 'http://localhost:3000';
}

export const siteConfig: SiteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'ТверьНефтеРегион',
  legalName: 'ТверьНефтеРегион', // TODO: заполнить юридическое наименование
  tagline: 'Надёжная поставка нефтепродуктов для предприятий',
  description: seoDescription,
  url: resolveSiteUrl(),
  locale: 'ru_RU',
};

/** Адрес для верхней панели Header. Пустое значение — не отображается. */
export const companyAddress = process.env.NEXT_PUBLIC_COMPANY_ADDRESS?.trim() || '';

export const seoConfig: SEOConfig = {
  /** Без суффикса бренда: его добавляет titleTemplate */
  defaultTitle: 'Дизельное топливо с доставкой',
  titleTemplate: '%s | ТверьНефтеРегион',
  defaultDescription: seoDescription,
  /** Полный title для og/twitter (без повторного применения template) */
  ogTitle: seoTitle,
  /** Специальная OG-карточка для предпросмотра в мессенджерах */
  ogImage: '/images/og/default.png',
  keywords: [
    'нефтепродукты',
    'дизельное топливо',
    'поставка топлива',
    'доставка дизельного топлива',
    'Тверская область',
    'Новгородская область',
    'Ярославская область',
    'Смоленская область',
    'B2B',
  ],
};

export const priceDisclaimer =
  'Итоговая стоимость зависит от вида продукта, объёма, адреса доставки, маршрута и актуальной оптовой цены.';

export const yandexMetrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || '';
