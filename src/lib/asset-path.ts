/**
 * Префикс для файлов из `public/` при сборке под subpath (GitHub Pages project site).
 * Production на apex: PAGES_BASE_PATH пустой → пути вида `/brand/...`.
 * Pages test: PAGES_BASE_PATH=/tvernefteregion → `/tvernefteregion/brand/...`.
 *
 * next/link и /_next учитывают basePath сами; next/image для строковых src — нет.
 */
export function getAssetBasePath(): string {
  return (process.env.PAGES_BASE_PATH || '').replace(/\/$/, '');
}

/** Путь к asset из public с учётом необязательного basePath. */
export function assetPath(path: string): string {
  const base = getAssetBasePath();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
