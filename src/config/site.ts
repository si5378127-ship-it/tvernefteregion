import type { SiteConfig, SEOConfig } from '@/types';

const seoTitle = 'Дизельное топливо с доставкой | ТверьНефтеРегион';
const seoDescription =
  'Поставка дизельного топлива для предприятий с доставкой по Тверской, Новгородской, Ярославской и Смоленской областям. Расчёт стоимости и заказ топлива.';

export const siteConfig: SiteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'ТверьНефтеРегион',
  legalName: 'ТверьНефтеРегион', // TODO: заполнить юридическое наименование
  tagline: 'Надёжная поставка нефтепродуктов для предприятий',
  description: seoDescription,
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
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
