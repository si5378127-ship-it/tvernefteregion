import type { Product } from '@/types';
import { assetPath } from '@/lib/asset-path';

/**
 * Единый источник данных о продукции и ценах.
 * UI читает цены только отсюда (через ContentProvider).
 * Позже будет заменён на Payload CMS без изменения компонентов.
 */
export const products: Product[] = [
  {
    id: 'diesel-summer',
    slug: 'dizelnoe-toplivo-letnee',
    title: 'Дизельное топливо летнее',
    shortDescription:
      'Летнее дизельное топливо для дорожной, строительной и сельскохозяйственной техники.',
    application:
      'Дорожная техника, строительная техника, сельхозтехника, генераторы, производственное оборудование.',
    priceMode: 'from',
    priceFrom: 80,
    priceUnit: '₽/л',
    availability: 'in_stock',
    updatedAt: undefined,
    image: assetPath('/images/products/diesel-summer.webp'),
    active: true,
  },
  {
    id: 'diesel-interseason',
    slug: 'dizelnoe-toplivo-mezhsezonnoe',
    title: 'Дизельное топливо межсезонное',
    shortDescription:
      'Межсезонное дизельное топливо для техники в переходный период эксплуатации.',
    application:
      'Дорожная техника, строительная техника, сельхозтехника, генераторы, производственное оборудование.',
    priceMode: 'from',
    priceFrom: 80,
    priceUnit: '₽/л',
    availability: 'in_stock',
    updatedAt: undefined,
    image: assetPath('/images/products/diesel-interseason.webp'),
    active: true,
  },
  {
    id: 'diesel-winter',
    slug: 'dizelnoe-toplivo-zimnee',
    title: 'Дизельное топливо зимнее',
    shortDescription:
      'Зимнее дизельное топливо для стабильной работы техники при пониженных температурах.',
    application:
      'Дорожная техника, строительная техника, сельхозтехника, генераторы, производственное оборудование.',
    priceMode: 'from',
    priceFrom: 80,
    priceUnit: '₽/л',
    availability: 'in_stock',
    updatedAt: undefined,
    image: assetPath('/images/products/diesel-winter.webp'),
    active: true,
  },
  {
    id: 'fuel-oil',
    slug: 'mazut-topochnyy',
    title: 'Мазут топочный',
    shortDescription: 'Топочный мазут для промышленных котельных и производственных установок.',
    application:
      'Промышленные котельные, производственные установки. Марка, характеристики и условия поставки согласовываются индивидуально.',
    priceMode: 'on_request',
    priceFrom: undefined,
    priceUnit: undefined,
    availability: 'on_request',
    updatedAt: undefined,
    image: undefined,
    active: false, // временно скрыт; будет включён через CMS
  },
];
