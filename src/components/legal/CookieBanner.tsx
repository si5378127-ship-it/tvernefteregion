'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import {
  COOKIE_CONSENT_KEY,
  COOKIE_CONSENT_VALUE,
  acceptCookieConsent,
  notifyCookieBannerVisibility,
} from '@/lib/cookie-consent';

/**
 * Баннер cookie для новых посетителей.
 * После принятия сохраняет флаг в localStorage и больше не показывается.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let show = true;
    try {
      show = localStorage.getItem(COOKIE_CONSENT_KEY) !== COOKIE_CONSENT_VALUE;
    } catch {
      show = true;
    }
    setVisible(show);
    notifyCookieBannerVisibility(show);
  }, []);

  const accept = () => {
    acceptCookieConsent();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      data-testid="cookie-banner"
      className="fixed inset-x-0 bottom-0 z-[var(--z-cookie-banner)] px-4 pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))] pt-3 md:inset-x-auto md:bottom-6 md:right-6 md:max-w-md md:px-0 md:pb-0 md:pt-0"
      role="dialog"
      aria-label="Уведомление об использовании cookie"
      aria-live="polite"
    >
      <div className="rounded-2xl border border-border bg-white p-5 shadow-lg md:p-5">
        <p className="text-sm leading-relaxed text-warm-gray-700">
          Мы используем файлы cookie для обеспечения работы сайта и анализа посещаемости. Продолжая
          пользоваться сайтом, Вы соглашаетесь с использованием файлов cookie.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/privacy"
            className="break-words text-sm text-brand-blue underline-offset-2 transition-colors hover:underline"
          >
            Политика обработки персональных данных
          </Link>
          <Button type="button" variant="green" size="sm" onClick={accept} className="w-full sm:w-auto sm:shrink-0">
            Принять
          </Button>
        </div>
      </div>
    </div>
  );
}
