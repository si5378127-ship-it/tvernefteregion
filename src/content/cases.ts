import type { SupplyCase, Testimonial, NewsItem } from '@/types';

/** Последние поставки — placeholder до подключения CMS */
export const supplyCases: SupplyCase[] = [
  {
    id: 'case-1',
    title: 'Поставка дизельного топлива',
    region: 'Тверская область',
    product: 'Дизельное топливо летнее',
    description: 'Регулярное обеспечение дорожной организации.',
    date: undefined, // TODO: заполнить при наличии данных
  },
  {
    id: 'case-2',
    title: 'Поставка межсезонного дизельного топлива',
    region: 'Ярославская область',
    product: 'Дизельное топливо межсезонное',
    description: 'Разовая поставка для производственного предприятия.',
    date: undefined,
  },
  {
    id: 'case-3',
    title: 'Поставка зимнего дизельного топлива',
    region: 'Смоленская область',
    product: 'Дизельное топливо зимнее',
    description: 'Поставка для строительной техники в зимний период.',
    date: undefined,
  },
];

/** Отзывы — только подтверждённые. Пока пустой массив активных отзывов */
export const testimonials: Testimonial[] = [
  // TODO: добавить реальные подтверждённые отзывы через CMS
];

/** Актуальные новости — placeholder */
export const newsItems: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Актуальные условия поставки',
    excerpt: 'Свяжитесь с нами для уточнения текущих условий и наличия продукции.',
    date: undefined,
    slug: 'aktualnye-usloviya',
    active: true,
  },
];
