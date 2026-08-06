import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { mainNavigation, footerNavigation } from '@/config/navigation';
import { getHeaderPhone, getFooterChannels } from '@/config/contacts';
import { contentProvider } from '@/services';
import { BrandLogo, Container, ContactIcon, hasContactIcon } from '@/components/ui';
import { FooterActions } from './FooterActions';

function productFooterLabel(id: string, title: string): string {
  if (id === 'heating-oil') return 'Печное топливо';
  return title;
}

export async function Footer() {
  const products = await contentProvider.getProducts();
  const phone = getHeaderPhone();
  const channels = getFooterChannels();
  const email = channels.find((c) => c.type === 'email');
  const messengers = channels.filter((c) =>
    ['telegram', 'whatsapp', 'max'].includes(c.type),
  );

  const navItems = mainNavigation.filter((item) =>
    ['delivery', 'industries', 'geography', 'documents', 'about'].includes(item.id),
  );

  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep-navy text-white">
      <div className="bg-petrol relative">
        <div
          className="absolute inset-x-0 top-0 h-[3px] bg-brand-green"
          aria-hidden="true"
        />
        <Container>
          <div className="py-12 md:py-16 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-3 leading-[1.2]">
              Нужна поставка топлива?
            </h2>
            <p className="text-[#B9C5CF] mb-8 leading-relaxed">
              Свяжитесь с нами любым удобным способом или оставьте заявку.
            </p>
            <FooterActions />
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-12 md:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <BrandLogo size="md" onDark className="mb-4" />
            <p className="mt-1 text-sm text-[#B9C5CF] leading-relaxed">
              Надежная поставка нефтепродуктов для предприятий.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Продукция</h3>
            <ul className="space-y-2.5">
              {products.map((p) => (
                <li key={p.id}>
                  <Link
                    href="/#products"
                    className="text-sm text-[#B9C5CF] hover:text-brand-green transition-colors duration-200"
                  >
                    {productFooterLabel(p.id, p.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Навигация</h3>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#B9C5CF] hover:text-brand-green transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Контакты</h3>
            <ul className="space-y-3">
              {phone && (
                <li>
                  <a
                    href={phone.href}
                    className="inline-flex items-center gap-2 text-sm text-[#B9C5CF] hover:text-brand-green transition-colors duration-200"
                  >
                    <ContactIcon type="phone" size={20} alt="Позвонить" />
                    {phone.label}
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a
                    href={email.href}
                    className="inline-flex items-center gap-2 text-sm text-[#B9C5CF] hover:text-brand-green transition-colors duration-200 break-all"
                  >
                    <ContactIcon type="email" alt="" className="flex-shrink-0" />
                    {email.label}
                  </a>
                </li>
              )}
              {messengers.map((channel) => (
                <li key={channel.id}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[#B9C5CF] hover:text-brand-green transition-colors duration-200"
                  >
                    {hasContactIcon(channel.type) ? (
                      <ContactIcon type={channel.type} alt="" />
                    ) : null}
                    {channel.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-[#B9C5CF]">
            {'\u00A9'} {year} {siteConfig.legalName}
          </p>
          <div className="flex flex-wrap gap-4">
            {footerNavigation.legal.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-xs text-[#B9C5CF] hover:text-brand-green transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
