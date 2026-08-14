import { formatSubmissionText } from './format-submission';

export function isTelegramConfigured(): boolean {
  return Boolean(
    process.env.TELEGRAM_BOT_TOKEN?.trim() && process.env.TELEGRAM_CHAT_ID?.trim(),
  );
}

export async function sendFormTelegram(
  formType: string,
  data: Record<string, unknown>,
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN!.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID!.trim();
  const text = formatSubmissionText(formType, data);

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`Telegram API ${response.status}: ${body.slice(0, 300)}`);
  }
}
