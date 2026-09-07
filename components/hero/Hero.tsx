import React from 'react';
import { StarIcon } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
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
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-gold/40 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-navy shadow-sm">
            <div className="flex text-amber-500 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 fill-amber-400 text-amber-500" />
              ))}
            </div>
            <span className="font-semibold text-navy">
              Rated 4.9/5 by 60+ Meta &amp; Google advertisers
            </span>
          </div>

          <div>
            <Eyebrow>Performance Marketing · Meta &amp; Google</Eyebrow>
          </div>

          <h1
            id="hero-heading"
            className="mt-6 max-w-[15ch] font-display text-[40px] font-semibold leading-[1.02] tracking-[-0.03em] text-navy sm:text-[56px] lg:text-[68px]"
          >
            Your ads are spending money.{' '}
            <span className="text-gold-deep">Are they making you money?</span>
          </h1>

          <p className="mt-7 max-w-[52ch] text-[17px] leading-[1.65] text-charcoal/75 sm:text-[18px]">
            Give us 15 minutes. We'll identify where your paid traffic is leaking money — from the ad to the checkout.
          </p>

          <HeroCtaButtons onOpenAudit={onOpenAudit} />

          {/* <p className="mt-8 font-mono text-[11px] font-medium uppercase tracking-eyebrow text-navy/75">
            Meta Ads · Google Ads · CRO · Tracking
          </p> */}
        </div>

        <div>
          <HeroAuditForm id="audit-form" />
        </div>
      </div>
    </section>
  );
}
