import Image from 'next/image';
import { cn, formatProductPrice } from '@/lib/utils';
import type { Product } from '@/types';
import { Card } from './Card';
import { Badge } from './Badge';
import { ImagePlaceholder } from './ImagePlaceholder';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const availabilityLabels: Record<string, { label: string; variant: 'green' | 'blue' | 'gray' }> = {
  in_stock: { label: 'В наличии', variant: 'green' },
  on_request: { label: 'По запросу', variant: 'blue' },
  limited: { label: 'Ограниченно', variant: 'gray' },
};

export function ProductCard({ product, className }: ProductCardProps) {
  const availability = availabilityLabels[product.availability];

  return (
    <Card hover className={cn('group flex flex-col h-full overflow-hidden', className)}>
      <div className="relative -mx-6 -mt-6 mb-4 h-[248px] w-[calc(100%+3rem)] overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center transition-transform duration-[350ms] ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <ImagePlaceholder category="products" label={product.title} className="h-full rounded-none" />
        )}
      </div>
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-lg font-semibold text-deep-navy">{product.title}</h3>
        <Badge variant={availability.variant}>{availability.label}</Badge>
      </div>
      <p className="text-sm text-secondary-text leading-relaxed mb-4 flex-1">
        {product.shortDescription}
      </p>
      <div className="mt-auto pt-3 border-t border-border">
        <p className="text-lg font-semibold text-deep-navy">{formatProductPrice(product)}</p>
      </div>
    </Card>
  );
}
