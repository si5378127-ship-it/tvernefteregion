'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mainNavigation } from '@/config/navigation';
import { companyAddress } from '@/config/site';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { ButtonLink, IconButton, Container, ContactIcon } from '@/components/ui';
import { useContactSheet } from './ContactSheetContext';
import { useHeaderPhone, useHeaderEmail } from './ContactChannelsContext';
import { getCompanyMaxHref } from '@/config/cta';
import { YM_GOALS, ymGoalAttrs } from '@/lib/yandex-metrika';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const { openContactSheet } = useContactSheet();
  const phone = useHeaderPhone();
  const email = useHeaderEmail();
  const maxHref = getCompanyMaxHref();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash.replace('#', ''));
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[var(--z-header)]">
        {/* Верхняя служебная панель — на mobile всегда видна */}
        <div
          className={cn(
            'bg-[#0B2A4A] text-white overflow-hidden transition-[max-height,opacity] duration-300 ease-out',
            scrolled
              ? 'md:max-h-0 md:opacity-0 max-h-[68px] opacity-100'
              : 'max-h-[68px] md:max-h-[80px] lg:max-h-[88px] opacity-100',
          )}
        >
          <Container>
            <div
              className={cn(
                'flex items-center justify-between gap-3 md:gap-4',
                'h-[64px] md:h-[76px] lg:h-[88px] py-3 md:py-3.5 lg:py-4',
              )}
            >
              {/* Desktop: крупный бренд-блок */}
              <BrandLogo
                variant="full"
                onDark
                className="hidden lg:inline-flex min-w-0"
              />
              {/* Tablet: чуть компактнее, но заметный знак */}
              <BrandLogo
                variant="compact"
                onDark
                className="hidden md:inline-flex lg:hidden [&_.brandMark]:!w-[70px] [&_.brandMark]:!h-[70px] [&_span:last-child]:!text-[18px]"
              />
              {/* Mobile: логотип + название */}
              <BrandLogo
                variant="compact"
                onDark
                className="md:hidden min-w-0 [&_.brandMark]:!w-[46px] [&_.brandMark]:!h-[46px] max-[379px]:[&_span:last-child]:hidden"
              />

              <div className="hidden md:flex items-center gap-6 xl:gap-8 flex-shrink-0">
                {phone && (
                  <a
                    href={phone.href}
                    title="Позвонить менеджеру"
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/80 hover:text-white transition-colors duration-200"
                  >
                    <ContactIcon type="phone" size={20} alt="Позвонить" />
                    <span className="hidden lg:inline">{phone.label}</span>
                    <span className="lg:hidden">Телефон</span>
                  </a>
                )}

                {email && (
                  <a
                    href={email.href}
                    className="hidden xl:inline-flex items-center gap-1.5 text-[13px] text-white/75 hover:text-white transition-colors duration-200"
                  >
                    <ContactIcon type="email" alt="" />
                    <span>{email.label}</span>
                  </a>
                )}

                {companyAddress && (
                  <span className="hidden xl:inline-flex items-center gap-1.5 text-[13px] text-white/65">
                    <MapPin className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
                    {companyAddress}
                  </span>
                )}

                <button
                  type="button"
                  onClick={openContactSheet}
                  className="inline-flex items-center justify-center h-8 px-3.5 rounded-lg text-[12px] font-medium bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white/50 transition-colors duration-200"
                >
                  Контакты
                </button>
              </div>

              <div className="flex md:hidden items-center gap-0.5 flex-shrink-0">
                {phone && (
                  <a
                    href={phone.href}
                    aria-label={`Позвонить: ${phone.label}`}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-brand-green hover:bg-white/10 transition-colors"
                  >
                    <ContactIcon type="phone" size={20} alt="Позвонить" />
                  </a>
                )}
                <IconButton
                  label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="text-white hover:bg-white/10"
                >
                  {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </IconButton>
              </div>
            </div>
          </Container>
        </div>

        {/* Основная навигация — на desktop всегда; логотип появляется при scroll */}
        <div
          className={cn(
            'hidden md:block border-b transition-colors duration-300',
            scrolled
              ? 'bg-white/95 backdrop-blur-md border-border shadow-sm'
              : 'bg-white border-border/80',
          )}
        >
          <Container>
            <div className="flex h-16 lg:h-[68px] items-center gap-4 xl:gap-8">
              {/* Слот под компактный логотип: ширина резервируется, без скачка layout */}
              <div
                className={cn(
                  'flex-shrink-0 overflow-hidden transition-[max-width,opacity,margin] duration-300 ease-out',
                  scrolled
                    ? 'max-w-[260px] opacity-100 mr-2'
                    : 'max-w-0 opacity-0 mr-0 pointer-events-none',
                )}
                aria-hidden={!scrolled}
              >
                <BrandLogo
                  variant="compact"
                  className="[&_.brandMark]:!w-[40px] [&_.brandMark]:!h-[40px]"
                />
              </div>

              <nav
                className="hidden xl:flex items-center gap-7 xl:gap-8 flex-1 min-w-0"
                aria-label="Основная навигация"
              >
                {mainNavigation.map((item) => {
                  const hash = item.href.includes('#') ? item.href.split('#')[1] : '';
                  const isActive = hash !== '' && activeHash === hash;
                  const linkClass = cn(
                    'text-[14px] font-medium whitespace-nowrap transition-colors duration-200',
                    isActive
                      ? 'text-brand-green'
                      : 'text-primary-text hover:text-petrol',
                  );

                  if (item.children?.length) {
                    return (
                      <div key={item.id} className="relative group">
                        <Link
                          href={item.href}
                          onClick={() => hash && setActiveHash(hash)}
                          className={linkClass}
                          aria-haspopup="true"
                        >
                          {item.label}
                        </Link>
                        <div
                          className={cn(
                            'invisible absolute left-0 top-full z-50 min-w-[14rem] pt-2 opacity-0',
                            'transition-[opacity,visibility] duration-150',
                            'group-hover:visible group-hover:opacity-100',
                            'group-focus-within:visible group-focus-within:opacity-100',
                          )}
                        >
                          <ul className="rounded-xl border border-border bg-white py-1.5 shadow-md">
                            {item.children.map((child) => (
                              <li key={child.id}>
                                <Link
                                  href={child.href}
                                  className="block px-3.5 py-2.5 text-[13px] font-medium text-primary-text transition-colors duration-200 hover:bg-warm-gray-50 hover:text-petrol"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => hash && setActiveHash(hash)}
                      className={linkClass}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex xl:hidden items-center gap-2 flex-1 min-w-0">
                <nav
                  className="hidden lg:flex items-center gap-5 flex-1 min-w-0 overflow-hidden"
                  aria-label="Компактная навигация"
                >
                  {mainNavigation.slice(0, 5).map((item) => {
                    const hash = item.href.includes('#') ? item.href.split('#')[1] : '';
                    const isActive = hash !== '' && activeHash === hash;
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => hash && setActiveHash(hash)}
                        className={cn(
                          'text-[13px] font-medium whitespace-nowrap transition-colors duration-200',
                          isActive
                            ? 'text-brand-green'
                            : 'text-primary-text hover:text-petrol',
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
                <IconButton
                  label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="xl:hidden"
                >
                  {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </IconButton>
              </div>

              <ButtonLink
                href={maxHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="green"
                className="rounded-[14px] h-11 min-h-11 px-5 text-[14px] font-semibold flex-shrink-0 ml-auto"
                {...ymGoalAttrs(YM_GOALS.priceRequest)}
              >
                Узнать стоимость
              </ButtonLink>
            </div>
          </Container>
        </div>
      </header>

      <div
        aria-hidden="true"
        className={cn(
          'transition-[height] duration-300 ease-out',
          'h-[64px]',
          scrolled
            ? 'md:h-16 lg:h-[68px]'
            : 'md:h-[140px] lg:h-[156px]',
        )}
      />

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
