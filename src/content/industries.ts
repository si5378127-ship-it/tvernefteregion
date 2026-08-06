import type { Industry } from '@/types';

export const industries: Industry[] = [
  {
    id: 'road',
    title: 'Дорожные организации и ДРСУ',
    description: 'Поставки для содержания дорог, асфальтирования и дорожной техники.',
    icon: 'road',
  },
  {
    id: 'forestry',
    title: 'Лесозаготовительные предприятия',
    description: 'Топливо для лесозаготовительной и лесоперерабатывающей техники.',
    icon: 'trees',
  },
  {
    id: 'agriculture',
    title: 'Сельское хозяйство',
    description: 'Обеспечение топливом сельскохозяйственной техники в сезон работ.',
    icon: 'wheat',
  },
  {
    id: 'construction',
    title: 'Строительство',
    description: 'Поставки для строительной и спецтехники на объектах.',
    icon: 'hard-hat',
  },
  {
    id: 'quarry',
    title: 'Карьеры',
    description: 'Топливо для карьерной и горнодобывающей техники.',
    icon: 'mountain',
  },
  {
    id: 'manufacturing',
    title: 'Производство',
    description: 'Обеспечение производственных предприятий и генераторов.',
    icon: 'factory',
  },
  {
    id: 'utilities',
    title: 'Коммунальные организации',
    description: 'Поставки для коммунальной и дорожно-эксплуатационной техники.',
    icon: 'building',
  },
  {
    id: 'boiler',
    title: 'Котельные',
    description: 'Печное топливо для котельных и отопительных объектов.',
    icon: 'flame',
  },
];
