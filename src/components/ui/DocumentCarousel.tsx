'use client';

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/lib/motion';
import type { QualityDocument } from '@/content/documents';

const SWIPE_THRESHOLD = 56;
const ANIM_MS = 0.42;

type DocumentCarouselProps = {
  documents: QualityDocument[];
  className?: string;
};

export function DocumentCarousel({ documents, className }: DocumentCarouselProps) {
  const reducedMotion = usePrefersReducedMotion();
  const labelId = useId();
  const liveId = useId();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const openTriggerRef = useRef<HTMLButtonElement | null>(null);
  const lightboxRef = useRef<HTMLDivElement | null>(null);

  const total = documents.length;
  const current = documents[index] ?? documents[0];

  const goTo = useCallback(
    (next: number, dir?: number) => {
      if (total === 0) return;
      const normalized = ((next % total) + total) % total;
      const inferred =
        dir ??
        (normalized === index
          ? 0
          : normalized > index || (index === total - 1 && normalized === 0)
            ? 1
            : -1);
      setDirection(inferred);
      setIndex(normalized);
    },
    [index, total],
  );

  const goPrev = useCallback(() => goTo(index - 1, -1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1, 1), [goTo, index]);

  const openLightbox = useCallback(() => {
    openTriggerRef.current = document.activeElement as HTMLButtonElement | null;
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    requestAnimationFrame(() => {
      openTriggerRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;

    const root = lightboxRef.current;
    const getFocusables = () =>
      root
        ? Array.from(
            root.querySelectorAll<HTMLElement>(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];

    getFocusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
        return;
      }
      if (e.key !== 'Tab') return;

      const list = getFocusables();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxOpen, closeLightbox, goPrev, goNext]);

  const onCarouselKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    }
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x <= -SWIPE_THRESHOLD || info.velocity.x <= -400) {
      goNext();
    } else if (info.offset.x >= SWIPE_THRESHOLD || info.velocity.x >= 400) {
      goPrev();
    }
  };

  const variants = {
    enter: (dir: number) =>
      reducedMotion
        ? { opacity: 0, x: 0 }
        : { opacity: 0, x: dir >= 0 ? 28 : -28 },
    center: { opacity: 1, x: 0 },
    exit: (dir: number) =>
      reducedMotion
        ? { opacity: 0, x: 0 }
        : { opacity: 0, x: dir >= 0 ? -28 : 28 },
  };

  if (!current) return null;

  const counter = `${index + 1} / ${total}`;

  return (
    <>
      <div
        className={cn(
          'overflow-hidden rounded-[26px] border border-[#D8DEE3] bg-white',
          'shadow-[0_10px_28px_-12px_rgb(11_42_74_/_0.18)]',
          className,
        )}
        role="region"
        aria-roledescription="карусель"
        aria-labelledby={labelId}
        tabIndex={0}
        onKeyDown={onCarouselKeyDown}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#D8DEE3] px-5 py-4 md:px-6">
          <div className="min-w-0">
            <p id={labelId} className="text-sm font-semibold text-deep-navy md:text-base">
              {current.title}
            </p>
          </div>
          <p
            className="shrink-0 rounded-full bg-[#F5F6F2] px-3 py-1 text-sm font-medium text-deep-navy tabular-nums"
            aria-hidden="true"
          >
            {counter}
          </p>
        </div>

        <p id={liveId} className="sr-only" aria-live="polite">
          Документ {index + 1} из {total}: {current.title}, {current.product}
        </p>

        <div className="relative bg-[#F5F6F2] px-5 py-5 md:px-7 md:py-6">
          <div className="relative mx-auto flex h-[min(58vh,420px)] w-full items-center justify-center md:h-[560px] lg:h-[600px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: reducedMotion ? 0.15 : ANIM_MS,
                  ease: 'easeOut',
                }}
                drag={reducedMotion ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.14}
                onDragEnd={onDragEnd}
                className="absolute inset-0 flex touch-pan-y items-center justify-center"
              >
                <button
                  type="button"
                  onClick={openLightbox}
                  className={cn(
                    'group relative h-full w-full overflow-hidden rounded-2xl',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2',
                  )}
                  aria-label={`Увеличить: ${current.title}, ${current.product}`}
                >
                  <Image
                    src={current.image}
                    alt={current.alt}
                    fill
                    className="object-contain p-1 md:p-2"
                    sizes="(max-width: 1024px) 100vw, 56vw"
                    priority={index === 0}
                  />
                  <span
                    className={cn(
                      'pointer-events-none absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center',
                      'rounded-full border border-[#D8DEE3] bg-white/95 text-deep-navy shadow-sm',
                      'opacity-90 transition group-hover:opacity-100 md:opacity-80',
                    )}
                    aria-hidden="true"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </span>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-[1] flex -translate-y-1/2 justify-between px-2 md:px-3">
            <CarouselArrow label="Предыдущий документ" onClick={goPrev} side="left" />
            <CarouselArrow label="Следующий документ" onClick={goNext} side="right" />
          </div>
        </div>

        <div className="space-y-4 px-5 py-4 md:px-6 md:py-5">
          <div>
            <p className="text-sm font-medium text-deep-navy">Обезличенный образец документа</p>
            <p className="mt-1 text-sm leading-relaxed text-secondary-text">
              Актуальный паспорт качества предоставляется на конкретную партию топлива.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Документы">
            {documents.map((doc, i) => {
              const active = i === index;
              return (
                <button
                  key={doc.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Показать документ ${i + 1}`}
                  onClick={() => goTo(i, i > index ? 1 : -1)}
                  className={cn(
                    'h-2.5 rounded-full transition-all duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2',
                    active ? 'w-6 bg-[#79A91F]' : 'w-2.5 bg-[#D8DEE3] hover:bg-[#c5ccd3]',
                  )}
                />
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <div
            className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] md:p-6"
            role="presentation"
          >
            <motion.button
              type="button"
              aria-label="Закрыть просмотр"
              className="absolute inset-0 bg-deep-navy/70"
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.25 }}
              onClick={closeLightbox}
            />

            <motion.div
              ref={lightboxRef}
              role="dialog"
              aria-modal="true"
              aria-label={`${current.title}: ${current.product}`}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: reducedMotion ? 0 : 0.28, ease: 'easeOut' }}
              className={cn(
                'relative z-10 flex max-h-[min(92vh,920px)] w-full max-w-5xl flex-col',
                'overflow-hidden rounded-[24px] border border-[#D8DEE3] bg-white shadow-xl',
              )}
            >
              <div className="flex items-center justify-between gap-3 border-b border-[#D8DEE3] px-4 py-3 md:px-5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-deep-navy md:text-base">
                    {current.title}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#F5F6F2] px-3 py-1 text-sm font-medium tabular-nums text-deep-navy">
                    {counter}
                  </span>
                  <button
                    type="button"
                    onClick={closeLightbox}
                    aria-label="Закрыть"
                    className={cn(
                      'inline-flex h-11 w-11 items-center justify-center rounded-full',
                      'border border-[#D8DEE3] bg-white text-deep-navy',
                      'transition hover:border-brand-green hover:text-brand-green',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green',
                    )}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="relative flex-1 bg-[#F5F6F2]">
                <div className="relative mx-auto h-[min(70vh,720px)] w-full">
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                      key={`lb-${current.id}`}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: reducedMotion ? 0.15 : ANIM_MS,
                        ease: 'easeOut',
                      }}
                      drag={reducedMotion ? false : 'x'}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.12}
                      onDragEnd={onDragEnd}
                      className="absolute inset-0 touch-pan-y p-4 md:p-6"
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={current.image}
                          alt={current.alt}
                          fill
                          className="object-contain"
                          sizes="100vw"
                          priority
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="pointer-events-none absolute inset-x-0 top-1/2 z-[1] flex -translate-y-1/2 justify-between px-2 md:px-4">
                  <CarouselArrow label="Предыдущий документ" onClick={goPrev} side="left" />
                  <CarouselArrow label="Следующий документ" onClick={goNext} side="right" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function CarouselArrow({
  label,
  onClick,
  side,
}: {
  label: string;
  onClick: () => void;
  side: 'left' | 'right';
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full md:h-12 md:w-12',
        'border border-[#D8DEE3] bg-white text-deep-navy',
        'shadow-[0_6px_16px_-6px_rgb(11_42_74_/_0.28)]',
        'transition duration-200 ease-out',
        'hover:scale-105 hover:border-brand-green hover:text-brand-green',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2',
        side === 'left' ? 'ml-0' : 'mr-0',
      )}
    >
      {side === 'left' ? (
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      ) : (
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
