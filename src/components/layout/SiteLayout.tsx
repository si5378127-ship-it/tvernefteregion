import { getContactChannels } from '@/config/contacts';
import { ContactChannelsProvider } from './ContactChannelsContext';
import { ContactSheetProvider } from './ContactSheetContext';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileBar } from './MobileBar';
import { ContactSheet } from './ContactSheet';
import { FloatingContacts } from './FloatingContacts';

export function SiteLayout({
  children,
  hideFooterCtaBand = false,
}: {
  children: React.ReactNode;
  /** Скрыть промо-CTA Footer только на отдельных посадочных */
  hideFooterCtaBand?: boolean;
}) {
  // Читаем каналы на сервере из env — клиент получает готовый список
  const channels = getContactChannels();

  return (
    <ContactChannelsProvider channels={channels}>
      <ContactSheetProvider>
        <Header />
        <main className="mobile-bar-offset">{children}</main>
        <Footer hideCtaBand={hideFooterCtaBand} />
        <MobileBar />
        <FloatingContacts />
        <ContactSheet />
      </ContactSheetProvider>
    </ContactChannelsProvider>
  );
}
