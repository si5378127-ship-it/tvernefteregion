/**
 * Готовит утверждённый юридический текст к отображению.
 * Не меняет формулировки — только добавляет Markdown-разметку структуры
 * (заголовки, списки), если в файле её ещё нет.
 */
export function prepareLegalMarkdown(source: string): string {
  const normalized = source.replace(/\r\n/g, '\n').trim();
  if (!normalized) return '';

  // Уже размеченный Markdown (из CMS или отредактированный файл) — как есть
  if (/^#{1,6}\s/m.test(normalized)) {
    return normalized;
  }

  return plainLegalTextToMarkdown(normalized);
}

function plainLegalTextToMarkdown(source: string): string {
  const lines = source.split('\n');
  const out: string[] = [];
  let i = 0;
  let seenContent = false;

  while (i < lines.length) {
    const trimmed = lines[i].trim();

    if (!trimmed) {
      out.push('');
      i += 1;
      continue;
    }

    if (/^\d+\.\s+\S/.test(trimmed)) {
      out.push('');
      out.push(`## ${trimmed}`);
      out.push('');
      seenContent = true;
      i += 1;
      continue;
    }

    if (!seenContent) {
      out.push(`# ${trimmed}`);
      out.push('');
      seenContent = true;
      i += 1;
      continue;
    }

    seenContent = true;

    // Абзац-вступление, после которого идёт маркированный перечень
    if (trimmed.endsWith(':')) {
      i += 1;
      while (i < lines.length && !lines[i].trim()) i += 1;

      const { items, nextIndex } = consumeListItems(lines, i);
      // Список только если есть пункты с «;» — иначе это обычные абзацы (например email)
      const looksLikeList = items.some((item) => item.endsWith(';'));

      out.push(trimmed);
      out.push('');

      if (items.length > 0 && looksLikeList) {
        for (const item of items) {
          out.push(`- ${item}`);
        }
        out.push('');
        i = nextIndex;
        continue;
      }

      if (items.length > 0) {
        for (const item of items) {
          out.push(item);
          out.push('');
        }
        i = nextIndex;
        continue;
      }

      continue;
    }

    const para: string[] = [trimmed];
    i += 1;
    while (i < lines.length) {
      const next = lines[i].trim();
      if (!next) break;
      if (/^\d+\.\s+\S/.test(next)) break;
      if (next.endsWith(':')) break;
      para.push(next);
      i += 1;
    }
    out.push(para.join(' '));
    out.push('');
  }

  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function consumeListItems(
  lines: string[],
  start: number,
): { items: string[]; nextIndex: number } {
  const items: string[] = [];
  let i = start;

  while (i < lines.length) {
    const trimmed = lines[i].trim();
    if (!trimmed) break;
    if (/^\d+\.\s+\S/.test(trimmed)) break;

    items.push(trimmed);
    i += 1;

    // Последний пункт списка обычно заканчивается точкой, не «;»
    if (!trimmed.endsWith(';')) break;
  }

  return { items, nextIndex: i };
}
