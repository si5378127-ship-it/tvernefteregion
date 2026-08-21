'use client';

import { useEffect, useState } from 'react';
import { yandexMetrikaId } from '@/config/site';
import {
  COOKIE_CONSENT_EVENT,
  hasCookieConsent,
} from '@/lib/cookie-consent';

const YM_INIT_ATTR = 'data-ym-init';

declare global {
  interface Window {
    ym?: ((...args: unknown[]) => void) & { a?: IArguments[]; l?: number };
    dataLayer?: unknown[];
  }
}

/**
 * Официальный bootstrap Метрики.
 * При ssr:true скрипт должен быть tag.js?id=<counter> — иначе библиотека
 * грузится, но экземпляр счётчика/hit часто не создаётся.
 * @see https://yandex.ru/support/metrica/ru/code/install-several-counters.html
 */
function initYandexMetrika(counterId: string): void {
  if (typeof window === 'undefined') return;
  if (document.documentElement.getAttribute(YM_INIT_ATTR) === counterId) return;

  window.dataLayer = window.dataLayer || [];

  const scriptSrc = `https://mc.yandex.ru/metrika/tag.js?id=${counterId}`;

  // Точный порядок официального сниппета: stub → l → inject tag.js → ym(id,"init",…)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (function (m: any, e: Document, t: string, r: string, i: string) {
    m[i] =
      m[i] ||
      function () {
        // eslint-disable-next-line prefer-rest-params
        (m[i].a = m[i].a || []).push(arguments);
      };
    m[i].l = 1 * new Date().getTime();
    for (let j = 0; j < e.scripts.length; j += 1) {
      if (e.scripts[j]?.src === r) return;
    }
    const k = e.createElement(t) as HTMLScriptElement;
    const a = e.getElementsByTagName(t)[0];
    k.async = true;
    k.src = r;
    a?.parentNode?.insertBefore(k, a);
  })(window, document, 'script', scriptSrc, 'ym');

  const id = /^\d+$/.test(counterId) ? Number(counterId) : counterId;
  window.ym!(id, 'init', {
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
