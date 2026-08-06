import { LocalLegalProvider } from './local-provider';
import type { LegalDocument, LegalDocumentId, LegalProvider } from './types';

/**
 * Заглушка под Payload CMS.
 * Пока делегирует в LocalLegalProvider; после подключения CMS
 * будет читать документы из коллекции без изменения страниц и компонентов.
 */
export class PayloadLegalProvider implements LegalProvider {
  private fallback = new LocalLegalProvider();

  async getDocument(id: LegalDocumentId): Promise<LegalDocument> {
    // TODO: читать из Payload collection `legal-documents` по id/slug
    return this.fallback.getDocument(id);
  }

  async getAllDocuments(): Promise<LegalDocument[]> {
    // TODO: list из Payload
    return this.fallback.getAllDocuments();
  }
}
