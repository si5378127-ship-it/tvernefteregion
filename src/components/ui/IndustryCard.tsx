import {
  Truck,
  Trees,
  Wheat,
  HardHat,
  Mountain,
  Factory,
  Building2,
  Flame,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Industry } from '@/types';
import { Card } from './Card';

const iconMap: Record<string, LucideIcon> = {
  road: Truck,
  trees: Trees,
  wheat: Wheat,
  'hard-hat': HardHat,
  mountain: Mountain,
  factory: Factory,
  building: Building2,
  flame: Flame,
};

interface IndustryCardProps {
  industry: Industry;
  className?: string;
}

export function IndustryCard({ industry, className }: IndustryCardProps) {
  const Icon = iconMap[industry.icon] || Factory;

  return (
    <Card hover className={cn('flex flex-col gap-3', className)}>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-light">
        <Icon className="h-5 w-5 text-brand-green" aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold text-deep-navy">{industry.title}</h3>
      <p className="text-sm text-secondary-text leading-relaxed">{industry.description}</p>
    </Card>
  );
}
