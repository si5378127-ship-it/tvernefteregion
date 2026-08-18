import type { NextConfig } from 'next';

/**
 * Для тестового GitHub Pages (project site) задайте PAGES_BASE_PATH=/tvernefteregion.
 * Для production на корне домена оставьте пустым.
 */
const pagesBasePath = (process.env.PAGES_BASE_PATH || '').replace(/\/$/, '');

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  ...(pagesBasePath
    ? {
        basePath: pagesBasePath,
        assetPrefix: pagesBasePath,
      }
    : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
