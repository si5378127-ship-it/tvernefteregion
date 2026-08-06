import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-graphite">
          {label}
          {props.required && <span className="text-brand-blue ml-0.5">*</span>}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'min-h-[120px] w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-graphite',
            'placeholder:text-warm-gray-400 resize-y',
            'transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue',
            error ? 'border-red-500' : 'border-border-strong',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className,
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';
