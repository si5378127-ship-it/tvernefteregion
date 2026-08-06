/**
 * Фирменные медиа-ассеты.
 * Пути можно переопределить через env — удобно для будущей замены через CMS.
 */
export const brandConfig = {
  name: 'ТверьНефтеРегион',
  shortName: 'ТверьНефтеРегион',
  logo: {
    /** Круглый знак с прозрачным фоном (без чёрного/синего квадрата) */
    src: process.env.NEXT_PUBLIC_BRAND_LOGO_SRC || '/brand/logo.png',
    alt: 'ТверьНефтеРегион — поставка нефтепродуктов',
    width: 391,
    height: 391,
  },
  heroImage: {
    src: process.env.NEXT_PUBLIC_HERO_IMAGE_SRC || '/images/hero/transport.jpg',
    alt: 'Специализированный транспорт для поставки нефтепродуктов',
    width: 1600,
    height: 1200,
  },
} as const;
