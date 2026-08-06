import type { ContentProvider } from '@/types';
import { LocalContentProvider } from './local-provider';
import { PayloadContentProvider } from './payload-provider';

/**
 * Фабрика провайдера контента.
 * Сейчас всегда LocalContentProvider.
 * Позже: CONTENT_SOURCE=payload → PayloadContentProvider без изменения UI.
 */
export function createContentProvider(): ContentProvider {
  const source = process.env.CONTENT_SOURCE;

  if (source === 'payload') {
    return new PayloadContentProvider();
  }

  return new LocalContentProvider();
}

export const contentProvider = createContentProvider();

export { LocalContentProvider } from './local-provider';
export { PayloadContentProvider } from './payload-provider';
