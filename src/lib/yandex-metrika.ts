import { yandexMetrikaId } from '@/config/site';

declare global {
  interface Window {
    ym?: ((...args: unknown[]) => void) & { a?: IArguments[]; l?: number };
    dataLayer?: unknown[];
  }
}

/**
 * Идентификаторы JavaScript-целей счётчика.
 * Должны совпадать с целями в кабинете Яндекс Метрики.
 */
export const YM_GOALS = {
  phone: 'click_phone',
  max: 'click_max',
  whatsapp: 'click_whatsapp',
  telegram: 'click_telegram',
  email: 'click_email',
} as const;

export type YmGoalId = (typeof YM_GOALS)[keyof typeof YM_GOALS];

function counterId(): string | number | undefined {
  if (!yandexMetrikaId) return undefined;
  return /^\d+$/.test(yandexMetrikaId) ? Number(yandexMetrikaId) : yandexMetrikaId;
}

/** ym(counter, 'reachGoal', id) — очередь stub срабатывает и до загрузки tag.js. */
export function reachGoal(goal: string): void {
  if (typeof window === 'undefined') return;
  const id = counterId();
  if (!id || typeof window.ym !== 'function') return;
  try {
    window.ym(id, 'reachGoal', goal);
  } catch {
    // блокировщик / недоступный счётчик
  }
}

export function goalFromHref(href: string): YmGoalId | undefined {
  const value = href.trim();
  if (!value) return undefined;

  const lower = value.toLowerCase();
  if (lower.startsWith('tel:')) return YM_GOALS.phone;
  if (lower.startsWith('mailto:')) return YM_GOALS.email;

  try {
    const url = new URL(value, 'https://tvernefteregion.ru');
    const host = url.hostname.replace(/^www\./, '').toLowerCase();

    if (host === 'max.ru' || host.endsWith('.max.ru')) return YM_GOALS.max;
    if (
      host === 'wa.me' ||
      host === 'whatsapp.com' ||
      host.endsWith('.whatsapp.com')
    ) {
      return YM_GOALS.whatsapp;
    }
    if (
      host === 't.me' ||
      host === 'telegram.me' ||
      host === 'telegram.org' ||
      host.endsWith('.telegram.org') ||
      host === 'telegram.dog'
    ) {
      return YM_GOALS.telegram;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

/** Клики по tel / mailto / MAX / WhatsApp / Telegram → reachGoal. */
export function bindYmGoalClicks(): () => void {
  const onClick = (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const anchor = target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href) return;
    const goal = goalFromHref(href);
    if (goal) reachGoal(goal);
  };

  document.addEventListener('click', onClick, true);
  return () => document.removeEventListener('click', onClick, true);
}
