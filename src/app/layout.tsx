import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { siteConfig, seoConfig } from '@/config/site';
import { YandexMetrika } from '@/components/layout/YandexMetrika';
import { CookieBanner } from '@/components/legal';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  description: seoConfig.defaultDescription,
  keywords: seoConfig.keywords,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteConfig.url,
    siteName: 'ТверьНефтеРегион',
    title: seoConfig.ogTitle,
    description: seoConfig.defaultDescription,
    images: [
      {
        url: seoConfig.ogImage,
        width: 1280,
        height: 960,
        alt: 'Специализированный транспорт для поставки дизельного топлива — ТверьНефтеРегион',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.ogTitle,
    description: seoConfig.defaultDescription,
    images: [seoConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    yandex: '7eaee94c2479fcf5',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className={`${inter.className} min-h-screen antialiased`}>
        {children}
        <CookieBanner />
        <YandexMetrika />
      </body>
    </html>
  );
}
