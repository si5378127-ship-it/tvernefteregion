import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LegalDocLinkProps {
  href: '/privacy' | '/consent';
  children: React.ReactNode;
  className?: string;
}

/** Ссылка на юридический документ в новой вкладке */
export function LegalDocLink({ href, children, className }: LegalDocLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'text-brand-blue underline-offset-2 transition-colors hover:underline',
        className,
      )}
      onClick={(event) => event.stopPropagation()}
    >
      {children}
    </Link>
  );
}
