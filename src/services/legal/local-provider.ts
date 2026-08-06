import { readFile } from 'fs/promises';
import path from 'path';
import { legalDocuments } from './documents';
import { prepareLegalMarkdown } from './format';
import type { LegalDocument, LegalDocumentId, LegalProvider } from './types';

const LEGAL_DIR = path.join(process.cwd(), 'content', 'legal');

/**
 * Читает утверждённые юридические тексты из content/legal/*.md.
 * UI не содержит текст документов — только отображает результат провайдера.
 */
export class LocalLegalProvider implements LegalProvider {
  async getDocument(id: LegalDocumentId): Promise<LegalDocument> {
    const meta = legalDocuments[id];
    const filePath = path.join(LEGAL_DIR, meta.filename);

    try {
      const raw = await readFile(filePath, 'utf-8');
      const trimmed = raw.trim();

      if (!trimmed) {
        return {
          ...meta,
          markdown: '',
          isEmpty: true,
          status: 'empty',
        };
      }

      return {
        ...meta,
        markdown: prepareLegalMarkdown(trimmed),
        isEmpty: false,
        status: 'ok',
      };
    } catch {
      // Ошибка чтения не должна ломать сайт — страница покажет аккуратное сообщение
      return {
        ...meta,
        markdown: '',
        isEmpty: true,
        status: 'unavailable',
      };
    }
  }

  async getAllDocuments(): Promise<LegalDocument[]> {
    return Promise.all(
      (Object.keys(legalDocuments) as LegalDocumentId[]).map((id) => this.getDocument(id)),
    );
  }
}
