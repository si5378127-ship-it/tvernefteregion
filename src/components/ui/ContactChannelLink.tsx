import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ContactChannel } from '@/types';
import { ContactIcon, hasContactIcon } from './ContactIcon';

interface ContactChannelLinkProps {
  channel: ContactChannel;
  variant?: 'default' | 'compact' | 'card';
  className?: string;
  onClick?: () => void;
}

function isHttpLink(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://');
}

export function ContactChannelLink({
  channel,
  variant = 'default',
  className,
  onClick,
}: ContactChannelLinkProps) {
  const isFormLike = channel.type === 'form' || channel.type === 'callback';
  const isPhoneCard = variant === 'card' && channel.type === 'phone';
  const isEmailCard = variant === 'card' && channel.type === 'email';
  const contactIconType = hasContactIcon(channel.type) ? channel.type : null;

  const content = (
    <>
      <div
        className={cn(
          'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl',
          variant === 'card' ? 'bg-brand-blue-light' : 'text-inherit',
        )}
      >
        {contactIconType ? (
          <ContactIcon
            type={contactIconType}
            size={contactIconType === 'phone' ? 30 : 28}
            alt={contactIconType === 'phone' ? 'Позвонить' : ''}
          />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        {isPhoneCard ? (
          <>
            <div className="text-base font-semibold text-graphite">{channel.title}</div>
            <div className="mt-0.5 text-lg font-semibold tracking-tight text-brand-blue">
              {channel.label}
            </div>
            <div className="mt-0.5 text-sm text-warm-gray-500">{channel.description}</div>
          </>
        ) : (
          <>
            <div
              className={cn(
                'font-semibold',
                variant === 'compact' ? 'font-medium text-inherit' : 'text-graphite',
              )}
            >
              {channel.title}
            </div>
            {isEmailCard && (
              <div className="mt-0.5 break-all text-sm font-medium text-brand-blue">
                {channel.label}
              </div>
            )}
            {variant !== 'compact' && channel.description && !isEmailCard && (
              <div className="mt-0.5 text-sm text-warm-gray-500">{channel.description}</div>
            )}
            {isEmailCard && (
              <div className="mt-0.5 text-sm text-warm-gray-500">Написать письмо</div>
            )}
            {channel.value && variant === 'default' && channel.type !== 'phone' && (
              <div className="mt-0.5 text-sm text-brand-blue">{channel.label}</div>
            )}
          </>
        )}
      </div>

      {variant === 'card' && (
        <ChevronRight
          className="h-5 w-5 flex-shrink-0 text-warm-gray-400"
          aria-hidden="true"
        />
      )}
    </>
  );

  const baseClasses = cn(
    'flex items-center gap-3 transition-colors min-h-[44px]',
    variant === 'card' &&
      'p-4 rounded-xl border border-border bg-white hover:border-brand-green hover:bg-brand-green-light/40 active:bg-brand-green-light/60',
    variant === 'default' && 'py-2 hover:text-brand-blue',
    variant === 'compact' && 'gap-2 text-sm',
    className,
  );

  if (isFormLike || channel.href.startsWith('#')) {
    return (
      <button type="button" onClick={onClick} className={cn(baseClasses, 'w-full text-left')}>
        {content}
      </button>
    );
  }

  return (
    <a
      href={channel.href}
      className={baseClasses}
      onClick={onClick}
      {...(isHttpLink(channel.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
    </a>
  );
}
