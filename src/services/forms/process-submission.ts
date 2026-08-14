import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import type { FormSubmissionResult } from '@/types';
import { isSmtpConfigured, sendFormEmail } from './send-email';
import { isTelegramConfigured, sendFormTelegram } from './send-telegram';
import { isWebhookConfigured, sendFormWebhook } from './send-webhook';

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
  const isDev = process.env.NODE_ENV === 'development';
  const smtpReady = isSmtpConfigured();
  const telegramReady = isTelegramConfigured();
  const webhookReady = isWebhookConfigured();

  console.info('[forms] submission received', {
    formType,
    channels: {
      smtp: smtpReady,
      telegram: telegramReady,
      webhook: webhookReady,
      devLog: isDev,
    },
  });

  // Production / staging: реальная доставка через настроенные каналы.
  if (smtpReady || telegramReady || webhookReady) {
    const errors: string[] = [];

    if (smtpReady) {
      try {
        await sendFormEmail(formType, payload);
      } catch (error) {
        console.error('[forms] SMTP send failed', error);
        errors.push('smtp');
      }
    }

    if (telegramReady) {
      try {
        await sendFormTelegram(formType, payload);
      } catch (error) {
        console.error('[forms] Telegram send failed', error);
        errors.push('telegram');
      }
    }

    if (webhookReady) {
      try {
        await sendFormWebhook(formType, payload);
      } catch (error) {
        console.error('[forms] webhook send failed', error);
        errors.push('webhook');
      }
    }

    const delivered =
      (smtpReady && !errors.includes('smtp')) ||
      (telegramReady && !errors.includes('telegram')) ||
      (webhookReady && !errors.includes('webhook'));

    if (delivered) {
      return { success: true, message: SUCCESS_MESSAGE };
    }

    return { success: false, message: UNAVAILABLE_MESSAGE };
  }

  // Локальная разработка без каналов доставки — пишем в файл.
  if (isDev) {
    try {
      const logsDir = join(process.cwd(), 'logs');
      await mkdir(logsDir, { recursive: true });
      const logEntry = {
        timestamp: new Date().toISOString(),
        formType,
        data: payload,
      };
      await writeFile(
        join(logsDir, 'form-submissions.log'),
        JSON.stringify(logEntry) + '\n',
        { flag: 'a' },
      );
      return { success: true, message: SUCCESS_MESSAGE };
    } catch (error) {
      console.error('[forms] dev log write failed', error);
      return { success: false, message: UNAVAILABLE_MESSAGE };
    }
  }

  console.error(
    '[forms] no delivery channel configured. Set SMTP_* and/or TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID and/or FORM_WEBHOOK_URL',
  );
  return { success: false, message: UNAVAILABLE_MESSAGE };
}

function sanitizeForLog(data: Record<string, unknown>): Record<string, unknown> {
  const rest = { ...data };
  delete rest.honeypot;
  return rest;
}
