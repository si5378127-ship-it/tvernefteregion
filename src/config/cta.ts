import { contactDefaults } from '@/config/contact-defaults';
import { getCompanyMaxChannel, getHeaderPhone } from '@/config/contacts';

/** Основной MAX компании — главный коммерческий CTA. */
export function getCompanyMaxHref(): string {
  return getCompanyMaxChannel()?.href || contactDefaults.max;
}

/** Основной телефон компании (`tel:`). */
export function getCompanyPhoneHref(): string | undefined {
  return getHeaderPhone()?.href;
}

export function getCompanyPhoneLabel(): string | undefined {
  return getHeaderPhone()?.label;
}
