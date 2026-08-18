import { assetPath } from '@/lib/asset-path';

export type QualityDocument = {
  id: string;
  title: string;
  product: string;
  image: string;
  alt: string;
  description: string;
};

/**
 * Обезличенные образцы паспортов качества для карусели.
 * Изображения: public/documents/
 */
export const qualityDocuments: QualityDocument[] = [
  {
    id: 'diesel-summer',
    title: 'Паспорт качества — дизельное топливо летнее',
    product: 'Дизельное топливо летнее',
    image: assetPath('/documents/diesel-summer.webp'),
    alt: 'Обезличенный образец паспорта качества на летнее дизельное топливо',
    description:
      'Образец документа. Актуальный паспорт предоставляется на конкретную партию.',
  },
  {
    id: 'diesel-interseason',
    title: 'Паспорт качества — дизельное топливо межсезонное',
    product: 'Дизельное топливо межсезонное',
    image: assetPath('/documents/diesel-interseason.webp'),
    alt: 'Обезличенный образец паспорта качества на межсезонное дизельное топливо',
    description:
      'Образец документа. Актуальный паспорт предоставляется на конкретную партию.',
  },
  {
    id: 'diesel-winter',
    title: 'Паспорт качества — дизельное топливо зимнее',
    product: 'Дизельное топливо зимнее',
    image: assetPath('/documents/diesel-winter.webp'),
    alt: 'Обезличенный образец паспорта качества на зимнее дизельное топливо',
    description:
      'Образец документа. Актуальный паспорт предоставляется на конкретную партию.',
  },
];
