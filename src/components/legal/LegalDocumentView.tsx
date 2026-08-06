import { MarkdownContent } from './MarkdownContent';
import type { LegalDocument } from '@/services/legal';

interface LegalDocumentViewProps {
  document: LegalDocument;
}

/**
 * Общая оболочка страницы юридического документа.
 * Контент приходит из LegalProvider (файлы content/legal/ или будущий CMS).
 * Не связан с каруселью паспортов качества.
 */
export function LegalDocumentView({ document }: LegalDocumentViewProps) {
  const emptyMessage =
    document.status === 'unavailable'
      ? 'Документ временно недоступен.'
      : 'Документ будет опубликован после утверждения.';

  return (
    <section className="bg-warm-light">
      <div className="mx-auto w-full max-w-[900px] px-5 py-10 md:px-6 md:py-16 md:pb-24">
        <article className="legal-content">
          <MarkdownContent markdown={document.markdown} emptyMessage={emptyMessage} />
        </article>
      </div>
    </section>
  );
}
