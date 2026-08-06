import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-graphite">
          {label}
          {props.required && <span className="text-brand-blue ml-0.5">*</span>}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            className={cn(
              'h-11 w-full appearance-none rounded-lg border bg-white px-3.5 pr-10 text-sm text-graphite',
              'transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue',
              error ? 'border-red-500' : 'border-border-strong',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className,
            )}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-gray-500"
            aria-hidden="true"
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Select.displayName = 'Select';
