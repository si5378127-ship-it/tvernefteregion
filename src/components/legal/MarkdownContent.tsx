import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface MarkdownContentProps {
  markdown: string;
  className?: string;
  /** Сообщение, если markdown пустой */
  emptyMessage?: string;
}

/**
 * Универсальный рендерер Markdown для юридических документов.
 * Без raw HTML, без изображений, без rehypeRaw.
 */
export function MarkdownContent({
  markdown,
  className,
  emptyMessage = 'Документ будет опубликован после утверждения.',
}: MarkdownContentProps) {
  const content = markdown.trim();

  if (!content) {
    return (
      <p className={cn('text-base leading-relaxed text-warm-gray-600', className)}>
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className={cn('legal-content markdown-content', className)}>
      <ReactMarkdown
        skipHtml
        urlTransform={(url) => {
          // Блокируем data:/javascript: и относительные пути к изображениям
          if (!url || /^(data:|javascript:|blob:)/i.test(url)) return '';
          if (/\.(png|jpe?g|gif|webp|svg|avif)(\?.*)?$/i.test(url)) return '';
          return url;
        }}
        components={{
          h1: ({ children }) => (
            <h1 className="mb-5 text-[30px] font-semibold leading-tight tracking-tight text-deep-navy md:mb-6 md:text-[42px]">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-3 mt-8 text-[22px] font-semibold leading-snug tracking-tight text-deep-navy md:text-[28px]">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-2 mt-6 text-[20px] font-semibold text-deep-navy md:text-[22px]">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mb-2 mt-5 text-base font-semibold text-deep-navy md:text-lg">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-4 text-base leading-[1.7] text-warm-gray-700">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 list-disc space-y-2 pl-6 text-base leading-[1.7] text-warm-gray-700">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="markdown-ol mb-4 space-y-2 text-base leading-[1.7] text-warm-gray-700">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="markdown-li">{children}</li>,
          a: ({ href, children }) => {
            if (!href) {
              return <span className="text-brand-blue">{children}</span>;
            }
            return (
              <a
                href={href}
                className="text-brand-blue underline-offset-2 transition-colors hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          },
          img: () => null,
          strong: ({ children }) => (
            <strong className="font-semibold text-graphite">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          hr: () => <hr className="my-8 border-border" />,
          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-4 border-brand-blue/30 pl-4 text-warm-gray-600">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
