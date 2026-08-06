import { forwardRef } from 'react';
import { Checkbox } from '@/components/ui';
import { LegalDocLink } from './LegalDocLink';

interface FormLegalConsentProps {
  name?: string;
  error?: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

/**
 * Обязательный checkbox согласия на обработку ПДн.
 */
export const FormLegalConsent = forwardRef<HTMLInputElement, FormLegalConsentProps>(
  ({ error, ...props }, ref) => {
    return (
      <Checkbox
        ref={ref}
        error={error}
        label={
          <span className="text-[13px] leading-snug text-[#6B7280] md:text-sm">
            Я ознакомлен(а) с{' '}
            <LegalDocLink href="/privacy">Политикой обработки персональных данных</LegalDocLink> и
            даю <LegalDocLink href="/consent">Согласие на обработку персональных данных</LegalDocLink>
            .
          </span>
        }
        {...props}
      />
    );
  },
);
FormLegalConsent.displayName = 'FormLegalConsent';
