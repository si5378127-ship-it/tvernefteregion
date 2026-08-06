export type LegalDocumentId = 'privacy-policy' | 'consent';

export type LegalDocumentStatus = 'ok' | 'empty' | 'unavailable';

export interface LegalDocumentMeta {
  id: LegalDocumentId;
  /** URL-путь без ведущего слэша */
  slug: string;
  title: string;
  description: string;
  /** Имя файла в content/legal/ (локальный провайдер) */
  filename: string;
}

export interface LegalDocument extends LegalDocumentMeta {
  /** Текст документа для отображения (без изменения формулировок) */
  markdown: string;
  isEmpty: boolean;
  /** ok | empty | unavailable (файл не найден / ошибка чтения) */
  status: LegalDocumentStatus;
}

/**
 * Абстракция источника юридических документов.
 * Local → файлы в content/legal/; позже — Payload CMS без смены UI.
 */
export interface LegalProvider {
  getDocument(id: LegalDocumentId): Promise<LegalDocument>;
  getAllDocuments(): Promise<LegalDocument[]>;
}
