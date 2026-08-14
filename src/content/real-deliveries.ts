import type { RealDelivery } from '@/types';

/**
 * Реальные поставки на объекты.
 * images: [] — карточка без фото; при появлении файлов добавить { src, alt }.
 */
export const realDeliveries: RealDelivery[] = [
  {
    id: 'kuvshinovsky-district',
    slug: 'kuvshinovsky-district',
    title: 'Поставка дизельного топлива в Кувшиновский район',
    location: 'Кувшиновский район',
    region: 'Тверская область',
    description: 'Доставка дизельного топлива непосредственно на объект заказчика.',
    images: [],
    date: null,
    tags: [],
    featured: true,
  },
  {
    id: 'krasnoholmsky-district',
    slug: 'krasnoholmsky-district',
    title: 'Поставка дизельного топлива в Краснохолмский район',
    location: 'Краснохолмский район',
    region: 'Тверская область',
    description:
      'Доставка дизельного топлива специализированным транспортом непосредственно на объект заказчика.',
    images: [],
    date: null,
    tags: [],
    featured: true,
  },
  {
    id: 'shakhovskaya',
    slug: 'shakhovskaya',
    title: 'Поставка топлива в Шаховскую',
    location: 'Шаховская',
    region: 'Московская область',
    description:
      'На объекте заказчика нет собственной ёмкости для приёма топлива. Поставка организована с переливом топлива из бензовоза в бензовоз.',
    images: [],
    date: null,
    tags: [],
    featured: true,
  },
];
