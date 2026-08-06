'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { cn } from '@/lib/utils';
import { contactDefaults } from '@/config/contact-defaults';
import { usePrefersReducedMotion } from '@/lib/motion';
import {
  COOKIE_BANNER_VISIBILITY_EVENT,
  hasCookieConsent,
} from '@/lib/cookie-consent';
import { ContactIcon } from '@/components/ui/ContactIcon';
import { useHeaderPhone, useMessengerChannels } from './ContactChannelsContext';

const MAX_HREF =
  contactDefaults.max ||
  'https://max.ru/u/f9LHodD0cOKPu6N9XPC_2UvTZcWh9rf_tIHEVtG0cHwgZqJCJ7dXjWO9wp8';

const PHONE_HREF = `tel:${contactDefaults.phone}`;

type FloatingButtonProps = {
  href: string;
  tooltip: string;
  ariaLabel: string;
  external?: boolean;
  bgClass: string;
  icon: ReactNode;
  animateSignal: number;
  reducedMotion: boolean;
};

function FloatingButton({
  href,
  tooltip,
  ariaLabel,
  external,
  bgClass,
  icon,
  animateSignal,
  reducedMotion,
}: FloatingButtonProps) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (reducedMotion || animateSignal === 0) return;

    const run = async () => {
      const angle = animateSignal % 2 === 0 ? 10 : -10;
      await controls.start({
        rotate: angle,
        transition: { duration: 0.4, ease: 'easeOut' },
      });
      await controls.start({
        rotate: 0,
        transition: { duration: 0.4, ease: 'easeOut' },
      });
      if (animateSignal % 4 === 0) {
        await controls.start({
          scale: 1.04,
          transition: { duration: 0.35, ease: 'easeOut' },
        });
        await controls.start({
          scale: 1,
          transition: { duration: 0.35, ease: 'easeOut' },
        });
      }
    };

    void run();
  }, [animateSignal, controls, reducedMotion]);

  return (
    <div className="group/fab relative flex items-center justify-end">
      <span
        className={cn(
          'pointer-events-none absolute right-[calc(100%+10px)] top-1/2 z-0 hidden -translate-y-1/2 md:block',
          'whitespace-nowrap rounded-2xl bg-white px-4 py-2.5',
          'text-sm font-medium text-[#17375E]',
          'shadow-[0_8px_24px_-4px_rgb(15_40_70_/_0.22)]',
          'opacity-0 translate-x-2 transition-all duration-200 ease-out',
          'group-hover/fab:opacity-100 group-hover/fab:translate-x-0',
          'group-focus-within/fab:opacity-100 group-focus-within/fab:translate-x-0',
        )}
      >
        {tooltip}
      </span>

      <motion.a
        href={href}
        aria-label={ariaLabel}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        animate={controls}
        whileHover={
          reducedMotion
            ? undefined
            : { scale: 1.08, y: -2, transition: { duration: 0.25, ease: 'easeOut' } }
        }
        whileTap={{ scale: 0.98 }}
        className={cn(
          'relative z-[1] inline-flex items-center justify-center overflow-hidden rounded-full',
          'h-14 w-14 md:h-16 md:w-16',
          'shadow-[0_6px_18px_-4px_rgb(11_42_74_/_0.28)]',
          'transition-shadow duration-[240ms] ease-out',
          'hover:shadow-[0_10px_26px_-4px_rgb(11_42_74_/_0.38)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-[3px]',
          bgClass,
        )}
      >
        {icon}
      </motion.a>
    </div>
  );
}

/**
 * Плавающие кнопки быстрых контактов: MAX + Позвонить.
 * Фиксированы в правом нижнем углу на всех страницах.
 */
export function FloatingContacts() {
  const reducedMotion = usePrefersReducedMotion();
  const phone = useHeaderPhone();
  const messengers = useMessengerChannels();
  const maxChannel = messengers.find((c) => c.type === 'max');

  const maxHref = maxChannel?.href || MAX_HREF;
  const phoneHref = phone?.href || PHONE_HREF;

  const [footerLift, setFooterLift] = useState(false);
  const [cookieBannerOpen, setCookieBannerOpen] = useState(false);
  const [pulseMax, setPulseMax] = useState(0);
  const [pulsePhone, setPulsePhone] = useState(0);

  useEffect(() => {
    setCookieBannerOpen(!hasCookieConsent());

    const onVisibility = (event: Event) => {
      const detail = (event as CustomEvent<{ visible?: boolean }>).detail;
      setCookieBannerOpen(Boolean(detail?.visible));
    };

    window.addEventListener(COOKIE_BANNER_VISIBILITY_EVENT, onVisibility);
    return () => window.removeEventListener(COOKIE_BANNER_VISIBILITY_EVENT, onVisibility);
  }, []);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterLift(entry.isIntersecting && entry.intersectionRatio > 0.08);
      },
      { threshold: [0, 0.08, 0.2], rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;
    let nextIsMax = true;

    const schedule = () => {
      const delay = 9000 + Math.random() * 3000;
      timeoutId = setTimeout(() => {
        if (cancelled) return;
        if (nextIsMax) {
          setPulseMax((n) => n + 1);
        } else {
          setPulsePhone((n) => n + 1);
        }
        nextIsMax = !nextIsMax;
        schedule();
      }, delay);
    };

    schedule();
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [reducedMotion]);

  return (
    <div
      className={cn(
        'fixed z-[var(--z-floating)] flex flex-col items-end gap-3 md:gap-3.5',
        'right-4 md:right-6',
        'transition-[bottom] duration-300 ease-out',
        cookieBannerOpen
          ? 'bottom-[calc(15.5rem+env(safe-area-inset-bottom,0px))] md:bottom-[13.5rem]'
          : footerLift
            ? 'bottom-[calc(7.5rem+env(safe-area-inset-bottom,0px))] md:bottom-14'
            : 'bottom-[calc(5.75rem+env(safe-area-inset-bottom,0px))] md:bottom-6',
      )}
      role="complementary"
      aria-label="Быстрая связь"
    >
      <FloatingButton
        href={maxHref}
        tooltip="Написать в MAX"
        ariaLabel="Написать в MAX"
        external
        bgClass="bg-white hover:bg-white"
        icon={<ContactIcon type="max" alt="" />}
        animateSignal={pulseMax}
        reducedMotion={reducedMotion}
      />
      <FloatingButton
        href={phoneHref}
        tooltip="Позвонить"
        ariaLabel="Позвонить по телефону +7 904 008-50-12"
        bgClass="bg-[#17375E] hover:bg-[#12304f]"
        icon={<ContactIcon type="phone" size={38} alt="Позвонить" />}
        animateSignal={pulsePhone}
        reducedMotion={reducedMotion}
      />
    </div>
  );
}
