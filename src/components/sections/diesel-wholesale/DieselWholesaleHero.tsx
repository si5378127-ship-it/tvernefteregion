'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { Container, ButtonLink } from '@/components/ui';
import { useHeaderPhone } from '@/components/layout/ContactChannelsContext';
import { brandConfig } from '@/config/brand';
import { getCompanyMaxHref } from '@/config/cta';
import { YM_GOALS, ymGoalAttrs } from '@/lib/yandex-metrika';

const defaultTitle = 'Дизельное топливо оптом с доставкой';
const defaultDescription =
  'Поставляем летнее, межсезонное и зимнее дизельное топливо предприятиям, организациям и владельцам спецтехники. Организуем доставку специализированным сертифицированным транспортом непосредственно на объект клиента.';

type DieselWholesaleHeroProps = {
  title?: ReactNode;
  description?: string;
};

export function DieselWholesaleHero({
  title = defaultTitle,
  description = defaultDescription,
}: DieselWholesaleHeroProps = {}) {
  const phone = useHeaderPhone();
  const maxHref = getCompanyMaxHref();

  return (
    <section className="relative overflow-hidden hero-gradient">
      <Container>
        <div className="grid items-center gap-8 py-10 md:py-14 lg:grid-cols-2 lg:gap-12 lg:py-16 xl:gap-14">
          <div className="flex flex-col gap-5 md:gap-6">
            <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-deep-navy sm:text-4xl lg:text-5xl xl:text-[3.25rem]">
              {title}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-secondary-text md:text-xl">
              {description}
            </p>

            <div className="flex flex-col items-start gap-3 pt-1">
              <div className="flex flex-wrap gap-3">
                <ButtonLink
                  href={maxHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="green"
                  size="lg"
                  className="rounded-[14px]"
                  {...ymGoalAttrs(YM_GOALS.priceRequest)}
                >
                  Узнать стоимость
                </ButtonLink>
                {phone && (
                  <a
                    href={phone.href}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-[14px] border border-petrol bg-white px-6 text-base font-medium text-petrol transition-colors duration-200 hover:bg-petrol hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                  >
                    Позвонить
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] shadow-lg ring-1 ring-deep-navy/10">
            <Image
              src={brandConfig.heroImage.src}
              alt={brandConfig.heroImage.alt}
              width={brandConfig.heroImage.width}
              height={brandConfig.heroImage.height}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
