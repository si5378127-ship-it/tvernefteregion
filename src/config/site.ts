import type { SiteConfig, SEOConfig } from '@/types';
import { assetPath } from '@/lib/asset-path';

const seoTitle = 'Дизельное топливо с доставкой | ТверьНефтеРегион';
const seoDescription =
  'Поставка дизельного топлива для предприятий с доставкой по Тверской, Новгородской, Ярославской и Смоленской областям. Расчёт стоимости и заказ топлива.';

/** Канонический production-домен (без www). */
export const PRODUCTION_SITE_URL = 'https://tvernefteregion.ru';

function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, '');
}

/** Приводит www и прочие зеркала к каноническому apex-домену. */
function normalizeCanonicalUrl(url: string): string {
  try {
    const { hostname } = new URL(url);
    if (hostname === 'tvernefteregion.ru' || hostname === 'www.tvernefteregion.ru') {
      return PRODUCTION_SITE_URL;
    }
  } catch {
    return PRODUCTION_SITE_URL;
  }
  return stripTrailingSlash(url);
}

/**
 * Абсолютный URL сайта для metadataBase / Open Graph (без trailing slash).
 * Production: всегда apex. Localhost — только для локальной разработки.
 */
function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configured || /localhost|127\.0\.0\.1/i.test(configured)) {
    // CI / production static build без явного localhost → canonical apex.
    if (process.env.GITHUB_ACTIONS || process.env.CI) {
      return PRODUCTION_SITE_URL;
    }
    return configured ? stripTrailingSlash(configured) : 'http://localhost:3000';
  }

  return normalizeCanonicalUrl(configured);
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
  ogImage: assetPath('/images/og/default.png'),
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
