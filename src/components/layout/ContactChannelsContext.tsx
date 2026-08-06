'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { ContactChannel } from '@/types';
import {
  getDirectContactPanelChannels,
  getFormContactPanelChannels,
  getFooterChannels,
  getFormContactChannels,
  getMobileBarPhone,
} from '@/config/contacts';

const ContactChannelsContext = createContext<ContactChannel[]>([]);

/**
 * Каналы читаются на сервере из env и передаются в клиентские компоненты.
 * Так UI всегда использует актуальные значения из .env.local.
 */
export function ContactChannelsProvider({
  channels,
  children,
}: {
  channels: ContactChannel[];
  children: ReactNode;
}) {
  return (
    <ContactChannelsContext.Provider value={channels}>
      {children}
    </ContactChannelsContext.Provider>
  );
}

export function useContactChannels(): ContactChannel[] {
  return useContext(ContactChannelsContext);
}

export function useHeaderPhone(): ContactChannel | undefined {
  return useContactChannels().find((c) => c.type === 'phone' && c.showInHeader);
}

export function useHeaderEmail(): ContactChannel | undefined {
  return useContactChannels().find((c) => c.type === 'email');
}

export function useMessengerChannels(): ContactChannel[] {
  return useContactChannels().filter((c) =>
    ['telegram', 'whatsapp', 'max'].includes(c.type),
  );
}

export function useDirectContactPanelChannels(): ContactChannel[] {
  return getDirectContactPanelChannels(useContactChannels());
}

export function useFormContactPanelChannels(): ContactChannel[] {
  return getFormContactPanelChannels();
}

export function useFooterChannels(): ContactChannel[] {
  return getFooterChannels(useContactChannels());
}

export function useFormPreferredChannels(): ContactChannel[] {
  return getFormContactChannels(useContactChannels());
}

export function useMobileBarPhone(): ContactChannel | undefined {
  return getMobileBarPhone(useContactChannels());
}
