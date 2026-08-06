import type { SiteConfig, SEOConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'ТверьНефтеРегион',
  legalName: 'ТверьНефтеРегион', // TODO: заполнить юридическое наименование
  tagline: 'Надёжная поставка нефтепродуктов для предприятий',
  description:
    'Организуем поставки дизельного и печного топлива по Тверской, Новгородской, Ярославской и Смоленской областям.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  locale: 'ru_RU',
};

/** Адрес для верхней панели Header. Пустое значение — не отображается. */
export const companyAddress = process.env.NEXT_PUBLIC_COMPANY_ADDRESS?.trim() || '';

export const seoConfig: SEOConfig = {
  defaultTitle: 'Доставка нефтепродуктов для предприятий',
  titleTemplate: '%s | ТверьНефтеРегион',
  defaultDescription: siteConfig.description,
  ogImage: '/images/og/default.jpg', // TODO: добавить реальное OG-изображение
  keywords: [
    'нефтепродукты',
    'дизельное топливо',
    'печное топливо',
    'поставка топлива',
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
