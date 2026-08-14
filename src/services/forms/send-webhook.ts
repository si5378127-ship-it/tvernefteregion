export function isWebhookConfigured(): boolean {
  return Boolean(process.env.FORM_WEBHOOK_URL?.trim());
}

export async function sendFormWebhook(
  formType: string,
  data: Record<string, unknown>,
): Promise<void> {
  const url = process.env.FORM_WEBHOOK_URL!.trim();

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      formType,
      submittedAt: new Date().toISOString(),
      data,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`Webhook ${response.status}: ${body.slice(0, 300)}`);
  }
}
