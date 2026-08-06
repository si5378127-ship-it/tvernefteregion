'use client';

import { useEffect, useState } from 'react';

const CONSENT_MESSAGE =
  'Необходимо подтвердить согласие на обработку персональных данных.';

/**
 * Показывает сообщение о согласии, если пользователь нажал отправку
 * при выключенном checkbox (в т.ч. когда кнопка disabled).
 */
export function useConsentGate(consentGiven: boolean, fieldError?: string) {
  const [hint, setHint] = useState(false);

  useEffect(() => {
    if (consentGiven) setHint(false);
  }, [consentGiven]);

  return {
    consentError: fieldError || (hint && !consentGiven ? CONSENT_MESSAGE : undefined),
    onDisabledSubmitClick: () => {
      if (!consentGiven) setHint(true);
    },
  };
}
