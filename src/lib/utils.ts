import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Product } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Форматирует числовое значение цены из модели продукта. */
export function formatPrice(value: number, unit: string): string {
  return `от ${value.toLocaleString('ru-RU')} ${unit}`;
}

/**
 * Единое отображение цены продукта.
 * Берёт значения только из модели данных (локальный массив / будущий CMS).
 */
export function formatProductPrice(
  product: Pick<Product, 'priceMode' | 'priceFrom' | 'priceUnit'>,
): string {
  if (product.priceMode === 'from' && product.priceFrom != null && product.priceUnit) {
    return formatPrice(product.priceFrom, product.priceUnit);
  }
  return 'Цена по запросу';
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
