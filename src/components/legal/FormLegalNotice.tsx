import { LegalDocLink } from './LegalDocLink';

interface FormLegalNoticeProps {
  /** Фактическое название кнопки отправки */
  submitLabel?: string;
}

/**
 * Юридический текст под кнопкой отправки формы (152-ФЗ).
 */
export function FormLegalNotice({ submitLabel = 'Отправить' }: FormLegalNoticeProps) {
  return (
    <p className="text-[13px] leading-relaxed text-[#6B7280] md:text-sm">
      Нажимая кнопку «{submitLabel}», Вы соглашаетесь с{' '}
      <LegalDocLink href="/privacy">Политикой обработки персональных данных</LegalDocLink> и даёте{' '}
      <LegalDocLink href="/consent">Согласие на обработку персональных данных</LegalDocLink>.
    </p>
  );
}
