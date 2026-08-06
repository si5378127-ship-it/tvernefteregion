import type { NavItem } from '@/types';

export const mainNavigation: NavItem[] = [
  { id: 'products', label: 'Нефтепродукты', href: '/#products' },
  { id: 'delivery', label: 'Доставка', href: '/#delivery' },
  { id: 'industries', label: 'Для предприятий', href: '/#industries' },
  { id: 'geography', label: 'География', href: '/#geography' },
  { id: 'prices', label: 'Цены', href: '/#prices' },
  { id: 'documents', label: 'Документы', href: '/#documents' },
  { id: 'about', label: 'О компании', href: '/#about' },
];

export const footerNavigation = {
  sections: [
    {
      title: 'Разделы',
      items: mainNavigation.slice(0, 4),
    },
    {
      title: 'Информация',
      items: mainNavigation.slice(4),
    },
  ],
  legal: [
    {
      id: 'privacy',
      label: 'Политика обработки персональных данных',
      href: '/privacy',
    },
    {
      id: 'consent',
      label: 'Согласие на обработку персональных данных',
      href: '/consent',
    },
  ],
};
