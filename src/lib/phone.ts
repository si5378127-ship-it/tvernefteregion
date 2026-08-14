/** Удаляет пробелы, скобки, дефисы, точки и прочие символы форматирования. */
export function stripPhoneFormatting(value: string): string {
  return value.replace(/[\s()\-./]/g, '');
}

/**
 * Российский мобильный номер:
 * после очистки форматирования остаются только цифры (допускается ведущий +),
 * ровно 11 цифр, начинается с 7 или 8.
 */
export function isValidRussianMobile(value: string): boolean {
  const cleaned = stripPhoneFormatting(value.trim());
  const digits = cleaned.startsWith('+') ? cleaned.slice(1) : cleaned;
  if (!/^\d+$/.test(digits)) return false;
  return digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'));
}

/**
 * Нормализация к E.164 для РФ: +7XXXXXXXXXX.
 * 8XXXXXXXXXX → +7XXXXXXXXXX, 7XXXXXXXXXX → +7XXXXXXXXXX.
 */
export function normalizeRussianPhone(value: string): string {
  const cleaned = stripPhoneFormatting(value.trim());
  const digits = cleaned.startsWith('+') ? cleaned.slice(1) : cleaned;
  if (digits.length === 11 && digits.startsWith('8')) {
    return `+7${digits.slice(1)}`;
  }
  if (digits.length === 11 && digits.startsWith('7')) {
    return `+${digits}`;
  }
  return value.trim();
}
