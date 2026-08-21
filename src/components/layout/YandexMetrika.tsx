'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { yandexMetrikaId } from '@/config/site';
import {
  COOKIE_CONSENT_EVENT,
  hasCookieConsent,
} from '@/lib/cookie-consent';

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

  if (!yandexMetrikaId || !allowed) return null;

  const id = yandexMetrikaId;
  const ymIdLiteral = /^\d+$/.test(id) ? id : JSON.stringify(id);

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
          ym(${ymIdLiteral}, "init", {
            ssr:true,
            webvisor:true,
            clickmap:true,
            ecommerce:"dataLayer",
            trackLinks:true,
            accurateTrackBounce:true
          });
        `}
      </Script>
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${id}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
