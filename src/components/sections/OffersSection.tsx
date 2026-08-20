'use client';

import { ArrowRight } from 'lucide-react';
import { Container, Section, SectionHeading, Button, ButtonLink, Reveal } from '@/components/ui';
import { useContactSheet } from '@/components/layout/ContactSheetContext';
import { getCompanyMaxHref } from '@/config/cta';
import { offerItems, offersSectionCopy, type OfferBenefit } from '@/content/offers';
import { cn } from '@/lib/utils';

function OfferBenefitValue({ benefit }: { benefit: OfferBenefit }) {
  if (benefit.tone === 'label') {
    return (
      <span className="inline-flex w-fit items-center rounded-md border border-brand-green/25 bg-brand-green-light/60 px-2.5 py-1 text-xs font-medium tracking-wide text-deep-navy md:text-sm">
        {benefit.value}
      </span>
    );
  }

  return (
    <div className="min-w-0">
      <p className="text-[1.35rem] md:text-[1.5rem] font-semibold tracking-tight text-brand-green leading-none">
        {benefit.value}
      </p>
      {benefit.caption ? (
        <p className="mt-1.5 text-xs md:text-sm text-secondary-text leading-snug">{benefit.caption}</p>
      ) : null}
    </div>
  );
}

export function OffersSection() {
  const { openContactSheet } = useContactSheet();
  const maxHref = getCompanyMaxHref();
  const { title, subtitle, highlight } = offersSectionCopy;

  return (
    <Section id="offers" background="cool">
      <Container>
        <Reveal duration={0.55} offsetY={18}>
          <SectionHeading title={title} subtitle={subtitle} />
        </Reveal>

        <div className="border-t border-border">
          {offerItems.map((item, index) => (
            <Reveal key={item.number} delay={0.1 + index * 0.12} duration={0.65} offsetY={18}>
              <a
                href={maxHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'group grid gap-x-3 gap-y-2.5 border-b border-border py-7',
                  'grid-cols-1',
                  '[grid-template-areas:"num"_"title"_"benefit"_"desc"_"cta"]',
                  'md:grid-cols-[4.5rem_minmax(0,1.4fr)_minmax(9rem,0.7fr)_auto]',
                  'md:[grid-template-areas:"num_title_benefit_cta"_"num_desc_benefit_cta"]',
                  'md:gap-x-8 md:gap-y-2 md:py-9 md:items-start',
                  'rounded-sm px-3 -mx-3 sm:px-4 sm:-mx-4',
                  'transition-[background-color] duration-[320ms] ease-out',
                  'hover:bg-warm-light/80 focus-visible:bg-warm-light/80',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2',
                  'min-h-[44px]',
                )}
              >
                <span className="[grid-area:num] font-mono text-sm font-semibold tracking-wider text-brand-green md:pt-1">
                  {item.number}
                </span>

                <h3 className="[grid-area:title] text-lg md:text-xl font-semibold text-deep-navy tracking-tight leading-snug">
                  {item.title}
                </h3>

                <div className="[grid-area:benefit] md:pt-0.5 md:self-center md:row-span-2">
                  <OfferBenefitValue benefit={item.benefit} />
                </div>

                <p className="[grid-area:desc] max-w-xl text-sm md:text-base text-secondary-text leading-relaxed">
                  {item.description}
                </p>

                <span className="[grid-area:cta] inline-flex items-center gap-2 pt-0.5 text-sm font-medium text-brand-blue md:self-center md:justify-self-end md:min-h-[44px] md:row-span-2">
                  {item.ctaLabel}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-[320ms] ease-out group-hover:translate-x-[3px]"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.48} duration={0.7} offsetY={18}>
          <div className="mt-10 md:mt-12 rounded-[20px] border border-border bg-white px-5 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10">
            <div className="max-w-3xl">
              <h3 className="text-xl md:text-2xl font-semibold text-deep-navy tracking-tight leading-snug">
                {highlight.title}
              </h3>
              <p className="mt-3 text-sm md:text-base text-secondary-text leading-relaxed">
                {highlight.description}
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
              <ButtonLink
                href={maxHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="green"
                size="lg"
                className="w-full sm:w-auto sm:min-w-[220px]"
              >
                {highlight.primaryCta}
              </ButtonLink>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={openContactSheet}
                className="w-full sm:w-auto sm:min-w-[220px]"
              >
                {highlight.secondaryCta}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
