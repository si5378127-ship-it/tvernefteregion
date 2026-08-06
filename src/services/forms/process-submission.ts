import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import type { FormSubmissionResult } from '@/types';

interface ProcessFormOptions {
  formType: string;
  data: Record<string, unknown>;
}

export async function processFormSubmission({
  formType,
  data,
}: ProcessFormOptions): Promise<FormSubmissionResult> {
  // Honeypot check
  if (data.honeypot && String(data.honeypot).length > 0) {
    return { success: false, message: 'Ошибка отправки' };
  }

  const isDev = process.env.NODE_ENV === 'development';
  const hasSmtp = Boolean(process.env.SMTP_HOST && process.env.SMTP_TO);

  if (hasSmtp) {
    // TODO: подключить отправку email через SMTP (nodemailer или аналог)
    // await sendEmail({ formType, data });
    return {
      success: true,
      message: 'Заявка отправлена. Мы свяжемся с вами в ближайшее время.',
    };
  }

  if (isDev) {
    try {
      const logsDir = join(process.cwd(), 'logs');
      await mkdir(logsDir, { recursive: true });
      const logEntry = {
        timestamp: new Date().toISOString(),
        formType,
        data: sanitizeForLog(data),
      };
      await writeFile(
        join(logsDir, 'form-submissions.log'),
        JSON.stringify(logEntry) + '\n',
        { flag: 'a' },
      );
    } catch {
      // Silent fail in dev logging
    }
  }

  // TODO: сохранять заявки в Payload CMS после подключения

  return {
    success: true,
    message: 'Заявка принята. Мы свяжемся с вами в ближайшее время.',
  };
}

function sanitizeForLog(data: Record<string, unknown>): Record<string, unknown> {
  const rest = { ...data };
  delete rest.honeypot;
  return rest;
}
