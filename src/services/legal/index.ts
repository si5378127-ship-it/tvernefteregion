import type { LegalProvider } from './types';
import { LocalLegalProvider } from './local-provider';
import { PayloadLegalProvider } from './payload-provider';

/**
 * Фабрика провайдера юридических документов.
 * CONTENT_SOURCE=payload → PayloadLegalProvider; иначе — файлы content/legal/.
 */
export function createLegalProvider(): LegalProvider {
  if (process.env.CONTENT_SOURCE === 'payload') {
    return new PayloadLegalProvider();
  }
  return new LocalLegalProvider();
}

export const legalProvider = createLegalProvider();

export { LocalLegalProvider } from './local-provider';
export { PayloadLegalProvider } from './payload-provider';
export { legalDocuments, getLegalDocumentMeta } from './documents';
export { prepareLegalMarkdown } from './format';
export type {
  LegalDocument,
  LegalDocumentId,
  LegalDocumentMeta,
  LegalDocumentStatus,
  LegalProvider,
} from './types';
