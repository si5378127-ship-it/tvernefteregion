const FORM_LABELS: Record<string, string> = {
  contact: 'Оставить сообщение',
  callback: 'Заказать звонок',
  calculate: 'Быстрый расчёт стоимости',
};

const FIELD_LABELS: Record<string, string> = {
  name: 'Имя',
  phone: 'Телефон',
  comment: 'Сообщение',
  product: 'Вид топлива',
  volume: 'Объём (литров)',
  locality: 'Населённый пункт',
  personalDataConsent: 'Согласие на обработку ПДн',
};

export function getFormLabel(formType: string): string {
  return FORM_LABELS[formType] || formType;
}

export function formatSubmissionText(
  formType: string,
  data: Record<string, unknown>,
): string {
  const lines = [
    `Новая заявка: ${getFormLabel(formType)}`,
    `Тип: ${formType}`,
    `Время: ${new Date().toISOString()}`,
    '',
  ];

  for (const [key, value] of Object.entries(data)) {
    if (key === 'honeypot') continue;
    const label = FIELD_LABELS[key] || key;
    lines.push(`${label}: ${formatValue(value)}`);
  }

  return lines.join('\n');
}

function formatValue(value: unknown): string {
  if (typeof value === 'boolean') return value ? 'да' : 'нет';
  if (value == null) return '';
  return String(value);
}
