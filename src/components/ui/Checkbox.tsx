import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="flex items-start gap-3 cursor-pointer group">
          <div className="relative flex-shrink-0 mt-0.5">
            <input
              ref={ref}
              type="checkbox"
              id={inputId}
              className="peer sr-only"
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={error ? `${inputId}-error` : undefined}
              {...props}
            />
            <div
              className={cn(
                'h-5 w-5 rounded border border-border-strong bg-white',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-brand-blue peer-focus-visible:ring-offset-2',
                'peer-checked:bg-brand-blue peer-checked:border-brand-blue',
                'peer-disabled:opacity-50',
                'transition-colors',
                className,
              )}
            />
            <Check
              className="absolute inset-0 m-auto h-3 w-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
              aria-hidden="true"
            />
          </div>
          <span className="text-sm text-warm-gray-700 leading-snug group-hover:text-graphite transition-colors">
            {label}
          </span>
        </label>
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-600 ml-8" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Checkbox.displayName = 'Checkbox';
