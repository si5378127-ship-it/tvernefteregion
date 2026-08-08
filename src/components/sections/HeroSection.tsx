'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FileText, Truck, MapPin, Receipt } from 'lucide-react';
import { Container, Button } from '@/components/ui';
import { useContactSheet } from '@/components/layout/ContactSheetContext';
import { useHeaderPhone } from '@/components/layout/ContactChannelsContext';
import { brandConfig } from '@/config/brand';
import { fadeInUp, staggerContainer, usePrefersReducedMotion } from '@/lib/motion';

const benefits = [
  { icon: Receipt, text: 'Работа с НДС' },
  { icon: FileText, text: 'Документы на продукцию' },
  { icon: Truck, text: 'Доставка специализированным сертифицированным транспортом' },
  { icon: MapPin, text: 'Поставка непосредственно на объект' },
];

export function HeroSection() {
  const { openContactSheet, scrollToSection } = useContactSheet();
  const phone = useHeaderPhone();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative hero-gradient overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-14 items-center py-10 md:py-14 lg:py-16">
          <motion.div
            variants={staggerContainer}
            initial={reducedMotion ? false : 'hidden'}
            animate="visible"
            className="flex flex-col gap-5 md:gap-6"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold text-deep-navy leading-[1.15] tracking-tight"
            >
              Доставка нефтепродуктов для предприятий
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-secondary-text leading-relaxed max-w-xl"
            >
              Организуем поставки дизельного топлива по Тверской, Новгородской, Ярославской и
              Смоленской областям.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-base text-secondary-text/90 italic">
              Когда техника и оборудование должны работать, поставка топлива не может подвести.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col items-start gap-3 pt-1">
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="green"
                  size="lg"
                  className="rounded-[14px]"
                  onClick={() => scrollToSection('calculate')}
                >
                  Рассчитать стоимость
                </Button>
                {phone && (
                  <a
                    href={phone.href}
                    className="inline-flex items-center justify-center h-12 px-6 text-base rounded-[14px] font-medium border border-petrol bg-white text-petrol hover:bg-petrol hover:text-white transition-colors duration-200 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                  >
                    Позвонить
                  </a>
                )}
              </div>
              <button
                type="button"
                onClick={openContactSheet}
                className="text-sm text-petrol underline underline-offset-4 decoration-petrol/30 hover:decoration-petrol transition-colors duration-200"
              >
                Выбрать другой способ связи
              </button>
            </motion.div>

            <motion.ul
              variants={fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3"
            >
              {benefits.map((b) => (
                <li key={b.text} className="flex items-start gap-2.5 text-sm text-primary-text">
                  <b.icon
                    className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  {b.text}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative rounded-[28px] overflow-hidden shadow-lg ring-1 ring-deep-navy/10"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={brandConfig.heroImage.src}
                alt={brandConfig.heroImage.alt}
                width={brandConfig.heroImage.width}
                height={brandConfig.heroImage.height}
                className="object-cover w-full h-full"
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-deep-navy/20 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
