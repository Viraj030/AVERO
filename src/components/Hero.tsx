import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, StarIcon } from 'lucide-react';
import { Button } from './ui/Button';
import { Eyebrow } from './ui/Eyebrow';
import { HeroAuditForm } from './HeroAuditForm';

interface HeroProps {
  onOpenAudit: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 }
};

export function Hero({ onOpenAudit }: HeroProps) {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden bg-offwhite px-5 pb-20 pt-[104px] sm:px-8 lg:pb-28 lg:pt-[132px]">
      
      <div
        className="avero-grid-lines-light pointer-events-none absolute inset-0 [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]"
        aria-hidden="true" />
      

      <div className="relative mx-auto grid w-full max-w-shell items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.07, delayChildren: 0.05 }}>
          
          <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }} className="mb-4 inline-flex items-center gap-3 rounded-full border border-gold/40 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-navy shadow-sm">
            <div className="flex text-amber-500 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 fill-amber-400 text-amber-500" />
              ))}
            </div>
            <span className="font-semibold text-navy">
              Rated 4.9/5 by 60+ Meta &amp; Google advertisers
            </span>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}>
            <Eyebrow>Performance Marketing · Meta &amp; Google</Eyebrow>
          </motion.div>

          <motion.h1
            id="hero-heading"
            variants={fadeUp}
            transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            className="mt-6 max-w-[15ch] font-display text-[40px] font-semibold leading-[1.02] tracking-[-0.03em] text-navy sm:text-[56px] lg:text-[68px]">
            
            Your ads are spending money.{' '}
            <span className="text-gold-deep">Are they making you money?</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            className="mt-7 max-w-[52ch] text-[17px] leading-[1.65] text-charcoal/75 sm:text-[18px]">
            
            Give me 15 minutes. I&rsquo;ll show you where your ads are losing
            money — and what I&rsquo;d fix first.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            
            <Button size="lg" onClick={onOpenAudit} aria-haspopup="dialog">
              Get My 15-Minute Ad Audit
              <ArrowRightIcon
                className="h-4 w-4 transition-transform duration-200 ease-premium group-hover:translate-x-1"
                aria-hidden="true" />
              
            </Button>
            <a
              href="#leak"
              className="avero-focus inline-flex h-[52px] items-center justify-center rounded-[12px] border border-navy/25 px-7 text-[15px] font-medium text-navy transition-[transform,border-color,background-color] duration-200 ease-premium hover:-translate-y-0.5 hover:border-navy/60 hover:bg-navy/[0.04]">
              
              See How We Find The Leak
            </a>
          </motion.div>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            className="mt-8 font-mono text-[11px] font-medium uppercase tracking-eyebrow text-navy/75">
            
            Meta Ads · Google Ads · CRO · Tracking
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}>
          
          <HeroAuditForm id="free-audit-form" />
        </motion.div>
      </div>
    </section>);

}