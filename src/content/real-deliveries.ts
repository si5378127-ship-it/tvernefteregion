import type { RealDelivery } from '@/types';
import { assetPath } from '@/lib/asset-path';

/**
 * Реальные поставки на объекты.
 * images[0] — обложка карточки; objectPosition подбирается под кадр.
 */
export const realDeliveries: RealDelivery[] = [
  {
    id: 'kuvshinovsky-district',
    slug: 'kuvshinovsky-district',
    title: 'Поставка дизельного топлива в Кувшиновский район',
    location: 'Кувшиновский район',
    region: 'Тверская область',
    description: 'Доставка дизельного топлива непосредственно на объект заказчика.',
    images: [
      {
        src: assetPath('/images/delivery/kuvshinovsky-delivery.png'),
        alt: 'Поставка дизельного топлива на объект заказчика в Кувшиновском районе Тверской области',
        // Кабина бензовоза слева, ёмкость с площадкой справа — держим оба в кадре.
        objectPosition: '42% 40%',
      },
    ],
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
    images: [
      {
        src: assetPath('/images/delivery/krasnokholmsky-delivery.png'),
        alt: 'Поставка дизельного топлива на объект заказчика в Краснохолмском районе Тверской области',
        // Бензовоз слева и зона слива справа — лёгкий сдвиг к центру кадра.
        objectPosition: '45% 48%',
      },
    ],
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
    images: [
      {
        src: assetPath('/images/delivery/shakhovskaya-delivery.jpg'),
        alt: 'Перелив дизельного топлива из бензовоза в бензовоз на объекте в Шаховской, Московская область',
        // Два бензовоза и шланг по центру квадратного кадра.
        objectPosition: 'center 46%',
      },
    ],
    date: null,
    tags: [],
    featured: true,
  },
  {
    id: 'nelidovsky-district',
    slug: 'nelidovsky-district',
    title: 'Поставка дизельного топлива в Нелидовский район',
    location: 'Нелидовский район',
    region: 'Тверская область',
    description:
      'Доставка дизельного топлива на территорию клиента. Топливо слито из бензовоза в ёмкость заказчика.',
    images: [
      {
        src: assetPath('/images/delivery/nelidovsky-delivery.webp'),
        alt: 'Поставка дизельного топлива в Нелидовском районе Тверской области',
        // Квадратный кадр в превью 3:2: бензовоз слева, шланг и ёмкость справа.
        objectPosition: 'center 45%',
      },
    ],
    date: null,
    tags: [],
    featured: true,
  },
];
