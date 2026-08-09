import type { ContactChannel, ContactChannelType } from '@/types';
import { contactDefaults, type ManagerContact } from '@/config/contact-defaults';

export const CONTACT_INQUIRY_MESSAGE = `Здравствуйте!

Прошу рассчитать стоимость поставки топлива.

Вид топлива:

Объем:

Населенный пункт доставки:`;

export const CONTACT_EMAIL_SUBJECT = 'Расчет стоимости поставки топлива';

const DIRECT_CHANNEL_TYPES: ContactChannelType[] = [
  'phone',
  'whatsapp',
  'telegram',
  'max',
  'email',
];

function readContact(envValue: string | undefined, fallback: string): string {
  const fromEnv = envValue?.trim();
  return fromEnv || fallback;
}

function isConfigured(value: string | undefined): boolean {
  return Boolean(value && value.trim().length > 0);
}

function isExplicitlyDisabled(flag: string | undefined): boolean {
  if (!flag) return false;
  const normalized = flag.trim().toLowerCase();
  return normalized === 'false' || normalized === '0' || normalized === 'off';
}

function isChannelActive(value: string | undefined, enabledFlag?: string): boolean {
  if (isExplicitlyDisabled(enabledFlag)) return false;
  return isConfigured(value);
}

function buildPhoneHref(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return `tel:+${digits.startsWith('7') ? digits : '7' + digits}`;
}

function buildTelegramHref(value: string): string {
  if (value.startsWith('http')) return value;
  const username = value.replace('@', '');
  return `https://t.me/${username}`;
}

function buildWhatsAppHref(value: string): string {
  const digits = value.replace(/\D/g, '');
  const normalized = digits.startsWith('7') ? digits : `7${digits}`;
  const text = encodeURIComponent(CONTACT_INQUIRY_MESSAGE);
  return `https://wa.me/${normalized}?text=${text}`;
}

function buildMaxHref(value: string): string {
  if (value.startsWith('http')) return value;
  return value;
}

function buildEmailHref(email: string): string {
  const subject = encodeURIComponent(CONTACT_EMAIL_SUBJECT);
  const body = encodeURIComponent(CONTACT_INQUIRY_MESSAGE);
  return `mailto:${email}?subject=${subject}&body=${body}`;
}

/**
 * Единый конфигурационный слой каналов связи.
 * Порядок: телефон → WhatsApp → Telegram → MAX → email
 */
export function getContactChannels(): ContactChannel[] {
  const phone = readContact(process.env.NEXT_PUBLIC_CONTACT_PHONE, contactDefaults.phone);
  const phoneDisplay = readContact(
    process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY,
    contactDefaults.phoneDisplay,
  );
  const email = readContact(process.env.NEXT_PUBLIC_CONTACT_EMAIL, contactDefaults.email);
  const telegram = readContact(
    process.env.NEXT_PUBLIC_CONTACT_TELEGRAM,
    contactDefaults.telegram,
  );
  const max = readContact(process.env.NEXT_PUBLIC_CONTACT_MAX, contactDefaults.max);
  const whatsapp = readContact(
    process.env.NEXT_PUBLIC_CONTACT_WHATSAPP,
    contactDefaults.whatsapp,
  );

  const channels: ContactChannel[] = [
    {
      id: 'phone',
      type: 'phone',
      title: 'Позвонить',
      label: phoneDisplay,
      value: phone,
      href: buildPhoneHref(phone),
      description: 'Самый быстрый способ связи.',
      enabled: isChannelActive(phone, process.env.NEXT_PUBLIC_CONTACT_PHONE_ENABLED),
      sortOrder: 1,
      showInHeader: true,
      showInContactPanel: true,
      showInMobileBar: true,
      showInFooter: true,
      showInForms: false,
    },
    {
      id: 'whatsapp',
      type: 'whatsapp',
      title: 'WhatsApp',
      label: 'WhatsApp',
      value: whatsapp,
      href: buildWhatsAppHref(whatsapp),
      description: 'Быстрый расчет стоимости.',
      enabled: isChannelActive(whatsapp, process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_ENABLED),
      sortOrder: 2,
      showInHeader: false,
      showInContactPanel: true,
      showInMobileBar: false,
      showInFooter: true,
      showInForms: true,
    },
    {
      id: 'telegram',
      type: 'telegram',
      title: 'Telegram',
      label: 'Telegram',
      value: telegram,
      href: buildTelegramHref(telegram),
      description: 'Написать в Telegram.',
      enabled: isChannelActive(telegram, process.env.NEXT_PUBLIC_CONTACT_TELEGRAM_ENABLED),
      sortOrder: 3,
      showInHeader: false,
      showInContactPanel: true,
      showInMobileBar: false,
      showInFooter: true,
      showInForms: true,
    },
    {
      id: 'max',
      type: 'max',
      title: 'MAX',
      label: 'MAX',
      value: max,
      href: buildMaxHref(max),
      description: 'Написать в MAX.',
      enabled: isChannelActive(max, process.env.NEXT_PUBLIC_CONTACT_MAX_ENABLED),
      sortOrder: 4,
      showInHeader: false,
      // MAX менеджера показывается в карточке менеджера; канал остаётся для FAB.
      showInContactPanel: false,
      showInMobileBar: false,
      showInFooter: false,
      showInForms: true,
    },
    {
      id: 'email',
      type: 'email',
      title: 'Электронная почта',
      label: email,
      value: email,
      href: buildEmailHref(email),
      description: email,
      enabled: isChannelActive(email, process.env.NEXT_PUBLIC_CONTACT_EMAIL_ENABLED),
      sortOrder: 5,
      showInHeader: false,
      showInContactPanel: true,
      showInMobileBar: false,
      showInFooter: true,
      showInForms: true,
    },
  ];

  return channels
    .filter((c) => c.enabled && isConfigured(c.value) && isConfigured(c.href))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getEnabledChannels(): ContactChannel[] {
  return getContactChannels();
}

export function getHeaderPhone(): ContactChannel | undefined {
  return getContactChannels().find((c) => c.type === 'phone' && c.showInHeader);
}

export function getContactPanelChannels(): ContactChannel[] {
  return getContactChannels().filter((c) => c.showInContactPanel);
}

export function getDirectContactPanelChannels(
  channels: ContactChannel[] = getContactChannels(),
): ContactChannel[] {
  return channels.filter(
    (c) => c.showInContactPanel && DIRECT_CHANNEL_TYPES.includes(c.type),
  );
}

export function getFormContactPanelChannels(): ContactChannel[] {
  return [];
}

export function getFooterChannels(
  channels: ContactChannel[] = getContactChannels(),
): ContactChannel[] {
  return channels.filter((c) => c.showInFooter);
}

export function getFormContactChannels(
  channels: ContactChannel[] = getContactChannels(),
): ContactChannel[] {
  return channels.filter((c) => c.showInForms);
}

export function getMobileBarPhone(
  channels: ContactChannel[] = getContactChannels(),
): ContactChannel | undefined {
  return channels.find((c) => c.type === 'phone' && c.showInMobileBar);
}

export function hasPhoneChannel(
  channels: ContactChannel[] = getContactChannels(),
): boolean {
  return channels.some((c) => c.type === 'phone');
}

export function isDirectContactChannel(type: ContactChannelType): boolean {
  return DIRECT_CHANNEL_TYPES.includes(type);
}

/** Контакт менеджера по поставкам — единый источник для UI. */
export function getManagerContact(): ManagerContact {
  return contactDefaults.manager;
}
