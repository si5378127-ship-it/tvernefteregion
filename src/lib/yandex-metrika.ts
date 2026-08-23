import { yandexMetrikaId } from '@/config/site';

declare global {
  interface Window {
    ym?: ((...args: unknown[]) => void) & { a?: IArguments[]; l?: number };
    dataLayer?: unknown[];
  }
}

/**
 * Идентификаторы JavaScript-целей — как в кабинете счётчика 111809246.
 * form_submit не отправляем: серверной формы нет.
 */
export const YM_GOALS = {
  phone: 'phone_click',
  telegram: 'telegram_click',
  whatsapp: 'whatsapp_click',
  max: 'max_click',
  priceRequest: 'price_request_click',
  loyaltyOffer: 'loyalty_offer_click',
} as const;

export type YmGoalId = (typeof YM_GOALS)[keyof typeof YM_GOALS];

export type LoyaltyOfferParam = 'referral' | 'payment_delay' | 'competitor_offer';

export const YM_GOAL_ATTR = 'data-ym-goal';
export const YM_OFFER_ATTR = 'data-ym-offer';
export const YM_PARAMS_ATTR = 'data-ym-params';

const PRICE_REQUEST_RE = /узнать стоимость|узнать цену|рассчитать стоимость/i;

function counterId(): string | number | undefined {
  if (!yandexMetrikaId) return undefined;
  return /^\d+$/.test(yandexMetrikaId) ? Number(yandexMetrikaId) : yandexMetrikaId;
}

/** ym(counter, 'reachGoal', id[, params]) — очередь stub срабатывает и до загрузки tag.js. */
export function reachGoal(goal: string, params?: Record<string, string>): void {
  if (typeof window === 'undefined') return;
  const id = counterId();
  if (!id || typeof window.ym !== 'function') return;
  try {
    if (params && Object.keys(params).length > 0) {
      window.ym(id, 'reachGoal', goal, params);
    } else {
      window.ym(id, 'reachGoal', goal);
    }
  } catch {
    // блокировщик / недоступный счётчик
  }
}

export function ymGoalAttrs(
  goal: YmGoalId,
  params?: Record<string, string>,
): Record<string, string> {
  const attrs: Record<string, string> = { [YM_GOAL_ATTR]: goal };
  if (params?.offer) attrs[YM_OFFER_ATTR] = params.offer;
  if (params && Object.keys(params).length > 0) {
    attrs[YM_PARAMS_ATTR] = JSON.stringify(params);
  }
  return attrs;
}

export function goalFromHref(href: string): YmGoalId | undefined {
  const value = href.trim();
  if (!value) return undefined;

  const lower = value.toLowerCase();
  if (lower.startsWith('tel:')) return YM_GOALS.phone;
  // email в Метрике нет — mailto не отправляем
  if (lower.startsWith('mailto:')) return undefined;

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

function paramsFromAnchor(anchor: Element): Record<string, string> | undefined {
  const raw = anchor.getAttribute(YM_PARAMS_ATTR);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        const entries = Object.entries(parsed as Record<string, unknown>).filter(
          (entry): entry is [string, string] => typeof entry[1] === 'string',
        );
        if (entries.length > 0) return Object.fromEntries(entries);
      }
    } catch {
      // ignore invalid JSON
    }
  }

  const offer = anchor.getAttribute(YM_OFFER_ATTR);
  if (offer) return { offer };
  return undefined;
}

function isPriceRequestCta(anchor: Element): boolean {
  const label = [anchor.getAttribute('aria-label'), anchor.textContent]
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
  return PRICE_REQUEST_RE.test(label);
}

export function resolveYmGoal(
  anchor: Element,
): { goal: YmGoalId; params?: Record<string, string> } | undefined {
  const explicit = anchor.getAttribute(YM_GOAL_ATTR);
  if (explicit) {
    return { goal: explicit as YmGoalId, params: paramsFromAnchor(anchor) };
  }

  if (isPriceRequestCta(anchor)) {
    return { goal: YM_GOALS.priceRequest };
  }

  const href = anchor.getAttribute('href');
  if (!href) return undefined;
  const goal = goalFromHref(href);
  if (!goal) return undefined;
  return { goal };
}

/** Клики по контактам / price CTA / офферам → reachGoal. Один клик — одна цель. */
export function bindYmGoalClicks(): () => void {
  const onClick = (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const anchor = target.closest('a');
    if (!anchor) return;
    const resolved = resolveYmGoal(anchor);
    if (resolved) reachGoal(resolved.goal, resolved.params);
  };

  document.addEventListener('click', onClick, true);
  return () => document.removeEventListener('click', onClick, true);
}
