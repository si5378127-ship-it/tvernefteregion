'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { mainNavigation } from '@/config/navigation';
import { ButtonLink, ContactChannelLink, ContactIcon } from '@/components/ui';
import { YM_GOALS, ymGoalAttrs } from '@/lib/yandex-metrika';
import {
  useHeaderPhone,
  useHeaderEmail,
  useMessengerChannels,
} from './ContactChannelsContext';
import { getCompanyMaxHref } from '@/config/cta';
import { usePrefersReducedMotion } from '@/lib/motion';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const phone = useHeaderPhone();
  const email = useHeaderEmail();
  const messengers = useMessengerChannels();
  const reducedMotion = usePrefersReducedMotion();
  const maxHref = getCompanyMaxHref();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: reducedMotion ? 0 : 0.25 }}
          className="fixed inset-0 z-[var(--z-overlay)] bg-white xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Мобильное меню"
        >
          <div className="flex flex-col h-full pt-16 pb-8 px-5 overflow-y-auto">
            <nav className="flex flex-col gap-1" aria-label="Мобильная навигация">
              {mainNavigation.map((item) => (
                <div key={item.id} className="flex flex-col">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="py-3 px-3 text-base font-medium text-graphite hover:text-brand-green hover:bg-brand-green-light rounded-xl transition-colors duration-200 min-h-[44px] flex items-center"
                  >
                    {item.label}
                  </Link>
                  {item.children?.map((child) => (
                    <Link
                      key={child.id}
                      href={child.href}
                      onClick={onClose}
                      className="py-2.5 pl-6 pr-3 text-sm font-medium text-secondary-text hover:text-brand-green hover:bg-brand-green-light rounded-xl transition-colors duration-200 min-h-[44px] flex items-center"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-border space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-warm-gray-500 px-1">
                Связь
              </p>

              {phone && (
                <a
                  href={phone.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-graphite hover:bg-warm-gray-50 min-h-[44px]"
                >
                  <ContactIcon type="phone" size={20} alt="Позвонить" />
                  {phone.label}
                </a>
              )}

              {email && (
                <a
                  href={email.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-graphite hover:bg-warm-gray-50 min-h-[44px]"
                >
                  <ContactIcon type="email" alt="" />
                  {email.label}
                </a>
              )}

              {messengers.map((channel) => (
                <ContactChannelLink
                  key={channel.id}
                  channel={channel}
                  variant="compact"
                  className="px-3 py-2.5 rounded-xl hover:bg-warm-gray-50 text-graphite"
                  onClick={onClose}
                />
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-border">
              <ButtonLink
                href={maxHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="green"
                fullWidth
                className="rounded-[13px]"
                onClick={onClose}
                {...ymGoalAttrs(YM_GOALS.priceRequest)}
              >
                Узнать стоимость
              </ButtonLink>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
