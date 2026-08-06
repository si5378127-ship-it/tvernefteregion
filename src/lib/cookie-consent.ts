/** Ключ localStorage для согласия на cookie / аналитику */
export const COOKIE_CONSENT_KEY = 'tnr-cookie-consent';

export const COOKIE_CONSENT_VALUE = 'accepted';

/** Событие после принятия cookie — для отложенной загрузки аналитики */
export const COOKIE_CONSENT_EVENT = 'tnr-cookie-consent-accepted';

/** Баннер cookie открыт/закрыт — для сдвига FloatingContacts */
export const COOKIE_BANNER_VISIBILITY_EVENT = 'tnr-cookie-banner-visibility';

export function hasCookieConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY) === COOKIE_CONSENT_VALUE;
  } catch {
    return false;
  }
}

export function acceptCookieConsent(): void {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, COOKIE_CONSENT_VALUE);
  } catch {
    // private mode / quota
  }
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
  window.dispatchEvent(
    new CustomEvent(COOKIE_BANNER_VISIBILITY_EVENT, { detail: { visible: false } }),
  );
}

export function notifyCookieBannerVisibility(visible: boolean): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(COOKIE_BANNER_VISIBILITY_EVENT, { detail: { visible } }),
  );
}
