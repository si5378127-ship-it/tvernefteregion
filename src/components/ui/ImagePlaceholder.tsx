import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';

type ImageCategory =
  | 'transport'
  | 'delivery'
  | 'documents'
  | 'products'
  | 'team'
  | 'cases'
  | 'hero';

interface ImagePlaceholderProps {
  category: ImageCategory;
  label?: string;
  className?: string;
  aspectRatio?: string;
}

const categoryLabels: Record<ImageCategory, string> = {
  transport: 'Транспорт',
  delivery: 'Процесс поставки',
  documents: 'Документы',
  products: 'Продукция',
  team: 'Команда',
  cases: 'Кейсы',
  hero: 'Главное изображение',
};

/**
 * Нейтральный placeholder для изображений.
 * Реальные фото размещать в public/images/{category}/
 * @see CONTENT_GUIDE.md
 */
export function ImagePlaceholder({
  category,
  label,
  className,
  aspectRatio,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center bg-brand-blue-light/60 border border-border rounded-xl',
        'text-secondary-text',
        aspectRatio || 'aspect-[16/10] w-full h-full',
        className,
      )}
      role="img"
      aria-label={label || categoryLabels[category]}
    >
      <ImageIcon className="h-8 w-8 mb-2 opacity-50" aria-hidden="true" />
      <span className="text-xs font-medium opacity-60 px-4 text-center">
        {label || categoryLabels[category]}
      </span>
    </div>
  );
}
