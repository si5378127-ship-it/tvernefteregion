import { cn, formatProductPrice, formatDate } from '@/lib/utils';
import type { Product } from '@/types';
import { Card } from './Card';
import { Badge } from './Badge';
import { priceDisclaimer } from '@/config/site';

interface PriceCardProps {
  product: Product;
  className?: string;
  hover?: boolean;
}

const availabilityLabels: Record<string, { label: string; variant: 'green' | 'blue' | 'gray' }> = {
  in_stock: { label: 'В наличии', variant: 'green' },
  on_request: { label: 'По запросу', variant: 'blue' },
  limited: { label: 'Ограниченно', variant: 'gray' },
};

export function PriceCard({ product, className, hover = false }: PriceCardProps) {
  const availability = availabilityLabels[product.availability];

  return (
    <Card hover={hover} className={cn('flex flex-col', className)}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-semibold text-deep-navy">{product.title}</h3>
        <Badge variant={availability.variant}>{availability.label}</Badge>
      </div>
      <div className="mb-4">
        <p className="text-2xl font-semibold text-deep-navy">{formatProductPrice(product)}</p>
        {product.updatedAt ? (
          <p className="text-xs text-secondary-text mt-1">
            Обновлено: {formatDate(product.updatedAt)}
          </p>
        ) : null}
      </div>
      <p className="text-xs text-secondary-text leading-relaxed">{priceDisclaimer}</p>
    </Card>
  );
}
