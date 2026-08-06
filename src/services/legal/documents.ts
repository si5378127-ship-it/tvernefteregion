import type { LegalDocumentId, LegalDocumentMeta } from './types';

export const legalDocuments: Record<LegalDocumentId, LegalDocumentMeta> = {
  'privacy-policy': {
    id: 'privacy-policy',
    slug: 'privacy',
    title: 'Политика обработки персональных данных',
    description:
      'Политика обработки персональных данных ООО «ТверьНефтеРегион»: цели, правовые основания, сроки хранения и права субъектов персональных данных.',
    filename: 'privacy-policy.md',
  },
  consent: {
    id: 'consent',
    slug: 'consent',
    title: 'Согласие на обработку персональных данных',
    description:
      'Согласие на обработку персональных данных при использовании сайта и форм обратной связи ТверьНефтеРегион.',
    filename: 'consent.md',
  },
};

export function getLegalDocumentMeta(id: LegalDocumentId): LegalDocumentMeta {
  return legalDocuments[id];
}
