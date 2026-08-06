import type { Metadata } from 'next';
import { seoConfig } from '@/config/site';

export const metadata: Metadata = {
  title: seoConfig.defaultTitle,
  description: seoConfig.defaultDescription,
  alternates: {
    canonical: '/',
  },
};

export default function SiteGroupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
