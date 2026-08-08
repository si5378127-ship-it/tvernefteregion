import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = useId();
    // Уникальный id обязателен: на странице несколько форм с одним name.
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-0.5 h-5 w-5 flex-shrink-0">
            <input
              ref={ref}
              type="checkbox"
              id={inputId}
              className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={error ? `${inputId}-error` : undefined}
              {...props}
            />
            <div
              className={cn(
                'pointer-events-none h-5 w-5 rounded border border-border-strong bg-white',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-brand-blue peer-focus-visible:ring-offset-2',
                'peer-checked:border-brand-blue peer-checked:bg-brand-blue',
                'peer-disabled:opacity-50',
                'transition-colors',
                className,
              )}
              aria-hidden="true"
            />
            <Check
              className="pointer-events-none absolute inset-0 m-auto h-3 w-3 text-white opacity-0 peer-checked:opacity-100"
              aria-hidden="true"
            />
          </div>
          <span className="text-sm leading-snug text-warm-gray-700 transition-colors group-hover:text-graphite">
            {label}
          </span>
        </label>
        {error && (
          <p id={`${inputId}-error`} className="ml-8 text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Checkbox.displayName = 'Checkbox';