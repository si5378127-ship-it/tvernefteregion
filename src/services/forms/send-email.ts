import nodemailer from 'nodemailer';
import { formatSubmissionText, getFormLabel } from './format-submission';

export function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS?.trim() &&
      process.env.SMTP_TO?.trim(),
  );
}

export async function sendFormEmail(
  formType: string,
  data: Record<string, unknown>,
): Promise<void> {
  const host = process.env.SMTP_HOST!.trim();
  const user = process.env.SMTP_USER!.trim();
  const pass = process.env.SMTP_PASS!.trim();
  const to = process.env.SMTP_TO!.trim();
  const from = process.env.SMTP_FROM?.trim() || user;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure =
    process.env.SMTP_SECURE === 'true' ||
    process.env.SMTP_SECURE === '1' ||
    port === 465;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const subject = `[Сайт] ${getFormLabel(formType)} — ${String(data.name || '')}`.trim();
  const text = formatSubmissionText(formType, data);

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
  });
}
