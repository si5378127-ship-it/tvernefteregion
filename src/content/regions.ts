import type { Region } from '@/types';

export const regions: Region[] = [
  {
    id: 'tver',
    name: 'Тверская область',
    slug: 'tverskaya-oblast',
    description: 'Поставки нефтепродуктов по всей территории Тверской области.',
  },
  {
    id: 'novgorod',
    name: 'Новгородская область',
    slug: 'novgorodskaya-oblast',
    description: 'Доставка на объекты Новгородской области.',
  },
  {
    id: 'yaroslavl',
    name: 'Ярославская область',
    slug: 'yaroslavskaya-oblast',
    description: 'Обеспечение предприятий Ярославской области.',
  },
  {
    id: 'smolensk',
    name: 'Смоленская область',
    slug: 'smolenskaya-oblast',
    description: 'Поставки нефтепродуктов по Смоленской области.',
  },
];

export const regionOptions = regions.map((r) => ({
  value: r.id,
  label: r.name,
}));
