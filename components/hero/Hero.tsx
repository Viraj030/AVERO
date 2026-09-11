import React from 'react';
import { StarIcon } from 'lucide-react';
import { HeroAuditForm } from './HeroAuditForm';
import { HeroCtaButtons } from './HeroCtaButtons';

interface HeroProps {
  onOpenAudit?: () => void;
}

export function Hero({ onOpenAudit }: HeroProps) {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden bg-offwhite px-5 pb-20 pt-[104px] sm:px-8 lg:pb-28 lg:pt-[132px]"
    >
      <div className="relative mx-auto grid w-full max-w-shell items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <h1
            id="hero-heading"
            className="max-w-[15ch] font-display text-[40px] font-semibold leading-[1.02] tracking-[-0.03em] text-navy sm:text-[56px] lg:text-[68px]"
          >
            Your ads are spending money.{' '}
            <span className="text-gold-deep">Are they making you money?</span>
          </h1>

          <p className="mt-7 max-w-[52ch] text-[17px] leading-[1.65] text-charcoal/75 sm:text-[18px]">
            Give us 15 minutes. We'll identify where your paid traffic is leaking money — from the ad to the checkout.
          </p>

          <HeroCtaButtons onOpenAudit={onOpenAudit} />

          {/* Rating Badge from Image 1 */}
          <div className="mt-8 inline-flex items-center gap-3.5 rounded-[12px] border border-navy/12 bg-[#FAF7EE] px-4 py-2.5 shadow-sm">
            <div className="flex items-center gap-0.5 text-gold">
              <StarIcon className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
              <StarIcon className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
              <StarIcon className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
              <StarIcon className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
              <StarIcon className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
            </div>
            <div className="text-[13px] leading-[1.35] text-navy/90">
              <span>Rated 4.9/5 by 60+ Meta &amp; Google</span>
              <span className="block font-semibold text-navy">advertisers</span>
            </div>
          </div>
        </div>

        <div>
          <HeroAuditForm id="audit-form" />
        </div>
      </div>
    </section>
  );
}


