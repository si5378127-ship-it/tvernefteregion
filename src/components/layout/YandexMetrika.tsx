'use client';

import { useEffect, useState } from 'react';
import { yandexMetrikaId } from '@/config/site';
import {
  COOKIE_CONSENT_EVENT,
  hasCookieConsent,
} from '@/lib/cookie-consent';

const YM_SCRIPT_SRC = 'https://mc.yandex.ru/metrika/tag.js';
const YM_INIT_ATTR = 'data-ym-init';

declare global {
  interface Window {
    ym?: ((...args: unknown[]) => void) & { a?: IArguments[]; l?: number };
    dataLayer?: unknown[];
  }
}

/**
 * Надёжная загрузка Метрики после согласия.
 * next/script + inline children часто не исполняется при отложенном mount
 * (consent gate) в App Router / static export — поэтому инжектим tag.js сами.
 */
function initYandexMetrika(counterId: string): void {
  if (typeof window === 'undefined') return;
  if (document.documentElement.getAttribute(YM_INIT_ATTR) === counterId) return;

  window.dataLayer = window.dataLayer || [];

  (function (m: Window, e: Document, t: string, r: string, i: 'ym') {
    const target = m as Window & Record<'ym', Window['ym']>;
    target[i] =
      target[i] ||
      function (this: unknown) {
        // eslint-disable-next-line prefer-rest-params
        (target[i]!.a = target[i]!.a || []).push(arguments);
      };
    target[i]!.l = Date.now();
    for (let j = 0; j < e.scripts.length; j += 1) {
      if (e.scripts[j]?.src === r) return;
    }
    const k = e.createElement(t) as HTMLScriptElement;
    const a = e.getElementsByTagName(t)[0];
    k.async = true;
    k.src = r;
    a?.parentNode?.insertBefore(k, a);
  })(window, document, 'script', YM_SCRIPT_SRC, 'ym');

  const id = /^\d+$/.test(counterId) ? Number(counterId) : counterId;
  window.ym?.(id, 'init', {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: 'dataLayer',
    trackLinks: true,
    accurateTrackBounce: true,
  });

  document.documentElement.setAttribute(YM_INIT_ATTR, counterId);
}

/**
 * Яндекс.Метрика загружается только после согласия на cookie (tnr-cookie-consent).
 */
export function YandexMetrika() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (hasCookieConsent()) {
      setAllowed(true);
    }

    const onConsent = () => setAllowed(true);
    window.addEventListener(COOKIE_CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsent);
  }, []);

  useEffect(() => {
    if (!allowed || !yandexMetrikaId) return;
    initYandexMetrika(yandexMetrikaId);
  }, [allowed]);

  if (!yandexMetrikaId || !allowed) return null;

  return (
    <noscript>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://mc.yandex.ru/watch/${yandexMetrikaId}`}
          style={{ position: 'absolute', left: '-9999px' }}
          alt=""
        />
      </div>
    </noscript>
  );
}
