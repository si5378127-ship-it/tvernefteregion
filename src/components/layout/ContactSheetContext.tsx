'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface ContactSheetContextValue {
  isOpen: boolean;
  openContactSheet: () => void;
  closeContactSheet: () => void;
  scrollToSection: (id: string) => void;
}

const ContactSheetContext = createContext<ContactSheetContextValue | null>(null);

export function ContactSheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openContactSheet = useCallback(() => setIsOpen(true), []);
  const closeContactSheet = useCallback(() => setIsOpen(false), []);

  const scrollToSection = useCallback((id: string) => {
    setIsOpen(false);
    const targetId = id.replace('#', '');
    const scroll = () => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', `/#${targetId}`);
      } else {
        window.location.href = `/#${targetId}`;
      }
    };
    setTimeout(scroll, 50);
  }, []);

  return (
    <ContactSheetContext.Provider
      value={{ isOpen, openContactSheet, closeContactSheet, scrollToSection }}
    >
      {children}
    </ContactSheetContext.Provider>
  );
}

export function useContactSheet() {
  const ctx = useContext(ContactSheetContext);
  if (!ctx) throw new Error('useContactSheet must be used within ContactSheetProvider');
  return ctx;
}
