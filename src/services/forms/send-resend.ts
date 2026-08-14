import { Resend } from 'resend';
import { formatSubmissionText, getFormLabel } from './format-submission';

/** Получатель заявок с сайта. */
const DEFAULT_TO = 'tver-neft-region@bk.ru';

/** Отправитель с подтверждённого домена в Resend. */
const DEFAULT_FROM = 'forms@tvernefteregion.ru';

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export async function sendFormViaResend(
  formType: string,
  data: Record<string, unknown>,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const to = process.env.RESEND_TO?.trim() || DEFAULT_TO;
  const fromAddress = process.env.RESEND_FROM?.trim() || DEFAULT_FROM;
  const from = `ТверьНефтеРегион <${fromAddress}>`;

  const resend = new Resend(apiKey);
  const subject = `[Сайт] ${getFormLabel(formType)} — ${String(data.name || '')}`.trim();
  const text = formatSubmissionText(formType, data);

  const { data: result, error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    text,
  });

  if (error) {
    throw new Error(error.message || JSON.stringify(error));
  }

  if (!result?.id) {
    throw new Error('Resend returned empty result');
  }

  console.info('[forms] Resend email sent', { formType, id: result.id, to });
}
