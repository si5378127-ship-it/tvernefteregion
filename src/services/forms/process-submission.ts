import type { FormSubmissionResult } from '@/types';
import { isResendConfigured, sendFormViaResend } from './send-resend';

interface ProcessFormOptions {
  formType: string;
  data: Record<string, unknown>;
}

const SUCCESS_MESSAGE = 'Заявка принята. Мы свяжемся с вами в ближайшее время.';
const UNAVAILABLE_MESSAGE =
  'Отправка заявок временно недоступна. Свяжитесь с нами по телефону или в мессенджере.';

export async function processFormSubmission({
  formType,
  data,
}: ProcessFormOptions): Promise<FormSubmissionResult> {
  // Honeypot: тихо отклоняем ботов без деталей.
  if (data.honeypot && String(data.honeypot).length > 0) {
    return { success: false, message: 'Ошибка отправки' };
  }

  const payload = sanitizeForLog(data);

  console.info('[forms] submission received', {
    formType,
    resendConfigured: isResendConfigured(),
  });

  if (!isResendConfigured()) {
    console.error('[forms] RESEND_API_KEY is not configured');
    return { success: false, message: UNAVAILABLE_MESSAGE };
  }

  try {
    await sendFormViaResend(formType, payload);
    return { success: true, message: SUCCESS_MESSAGE };
  } catch (error) {
    console.error('[forms] Resend send failed', error);
    return { success: false, message: UNAVAILABLE_MESSAGE };
  }
}

function sanitizeForLog(data: Record<string, unknown>): Record<string, unknown> {
  const rest = { ...data };
  delete rest.honeypot;
  return rest;
}
