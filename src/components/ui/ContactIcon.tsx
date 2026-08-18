import Image from 'next/image';
import { cn } from '@/lib/utils';
import { assetPath } from '@/lib/asset-path';

export type ContactIconType = 'phone' | 'email' | 'telegram' | 'whatsapp' | 'max';

const ICON_SRC: Record<ContactIconType, string> = {
  phone: assetPath('/icons/phone.png'),
  email: assetPath('/icons/email.png'),
  telegram: assetPath('/icons/telegram.png'),
  whatsapp: assetPath('/icons/whatsapp.png'),
  max: assetPath('/icons/max.png'),
};

const ICON_ALT: Record<ContactIconType, string> = {
  phone: 'Позвонить',
  email: 'Email',
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
  max: 'MAX',
};

type ContactIconProps = {
  type: ContactIconType;
  /** Размер в px (по умолчанию 28) */
  size?: number;
  className?: string;
  alt?: string;
};

/** PNG-иконки контактов из public/icons (без lucide / SVG-компонентов). */
export function ContactIcon({ type, size = 28, className, alt }: ContactIconProps) {
  return (
    <Image
      src={ICON_SRC[type]}
      alt={alt ?? ICON_ALT[type]}
      width={size}
      height={size}
      className={cn('shrink-0 bg-transparent object-contain', className)}
      style={{ width: size, height: size, backgroundColor: 'transparent' }}
      unoptimized
      priority={false}
      aria-hidden={alt === '' ? true : undefined}
    />
  );
}

export function hasContactIcon(type: string): type is ContactIconType {
  return type in ICON_SRC;
}
