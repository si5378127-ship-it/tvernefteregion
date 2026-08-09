import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ManagerContact } from '@/config/contact-defaults';
import { ContactIcon } from './ContactIcon';

interface ManagerContactCardProps {
  manager: ManagerContact;
  /** panel — блок контактов; sheet — модалка; footer — компактный футер */
  variant?: 'panel' | 'sheet' | 'footer';
  className?: string;
  onNavigate?: () => void;
}

export function ManagerContactCard({
  manager,
  variant = 'panel',
  className,
  onNavigate,
}: ManagerContactCardProps) {
  if (variant === 'footer') {
    return (
      <div className={cn('pt-3 mt-1 border-t border-white/10 space-y-1.5', className)}>
        <p className="text-xs font-medium text-white/80">{manager.title}</p>
        <a
          href={manager.phoneHref}
          className="block text-sm text-[#B9C5CF] hover:text-brand-green transition-colors duration-200"
        >
          {manager.phoneDisplay}
        </a>
        <a
          href={manager.maxUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-[#B9C5CF] hover:text-brand-green transition-colors duration-200"
        >
          <ContactIcon type="max" size={16} alt="" />
          MAX
        </a>
      </div>
    );
  }

  if (variant === 'sheet') {
    return (
      <div
        className={cn(
          'rounded-xl border border-border bg-white p-4',
          className,
        )}
      >
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-blue-light">
            <ContactIcon type="phone" size={30} alt="" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-base font-semibold text-graphite">{manager.title}</div>
            <a
              href={manager.phoneHref}
              onClick={onNavigate}
              className="mt-0.5 block text-lg font-semibold tracking-tight text-brand-blue hover:underline"
            >
              {manager.phoneDisplay}
            </a>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a
                href={manager.phoneHref}
                onClick={onNavigate}
                className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg border border-border bg-warm-gray-50 px-3 text-sm font-medium text-graphite transition-colors hover:border-brand-green hover:bg-brand-green-light/40"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Позвонить
              </a>
              <a
                href={manager.maxUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onNavigate}
                className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg border border-border bg-warm-gray-50 px-3 text-sm font-medium text-graphite transition-colors hover:border-brand-green hover:bg-brand-green-light/40"
              >
                <ContactIcon type="max" size={18} alt="" />
                Написать в MAX
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // panel — визуально в ряду с ContactChannelLink card
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-xl border border-border bg-white p-4',
        className,
      )}
    >
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-blue-light">
        <ContactIcon type="phone" size={30} alt="Позвонить менеджеру" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-base font-semibold text-graphite">{manager.title}</div>
        <a
          href={manager.phoneHref}
          className="mt-0.5 block text-lg font-semibold tracking-tight text-brand-blue hover:underline"
        >
          {manager.phoneDisplay}
        </a>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          <a
            href={manager.phoneHref}
            className="font-medium text-warm-gray-600 underline-offset-2 hover:text-brand-blue hover:underline"
          >
            Позвонить
          </a>
          <span className="text-warm-gray-300" aria-hidden="true">
            ·
          </span>
          <a
            href={manager.maxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-warm-gray-600 underline-offset-2 hover:text-brand-blue hover:underline"
          >
            <ContactIcon type="max" size={16} alt="" />
            MAX
          </a>
        </div>
      </div>
    </div>
  );
}
