'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, XIcon, ZoomInIcon } from 'lucide-react';
import { businessOrder, businessPanels } from '@/data/businessTypes';
import type { BusinessType } from '@/types/avero';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';
import { useAuditModal } from '@/components/audit/AuditModalContext';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

interface BusinessTypeSwitcherProps {
  onOpenAudit?: () => void;
}

export function BusinessTypeSwitcher({ onOpenAudit }: BusinessTypeSwitcherProps) {
  const modal = useAuditModal();
  const handleOpenAudit = () => {
    if (onOpenAudit) {
      onOpenAudit();
    } else if (modal.openAuditWithObjective) {
      modal.openAuditWithObjective(businessPanels[active].label);
    } else {
      modal.openAudit();
    }
  };

  const [active, setActive] = useState<BusinessType>('ecommerce');
  const [zoomImage, setZoomImage] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomImage(null);
    };
    if (zoomImage) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [zoomImage]);

  const panel = businessPanels[active];
  const dashboardSrc =
    active === 'ecommerce'
      ? '/images/supplemart.jpg'
      : '/images/suerly-placed-dashboard.jpg';
  const dashboardTitle =
    active === 'ecommerce'
      ? 'Authentic Supplements Store Ads Manager Performance'
      : 'Career Coaching Platform Ads Manager Performance';

  return (
    <Section
      aria-labelledby="business-heading"
      className="bg-white pt-8 pb-16 lg:py-22"
    >
      <div className="flex flex-col gap-8 border-b border-navy/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Eyebrow>Who we work with</Eyebrow>
          <h2
            id="business-heading"
            className="mt-6 font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] text-navy sm:text-[42px]"
          >
            Different businesses. Same objective.
          </h2>
          <p className="mt-4 text-[17px] text-charcoal/70">
            Turn ad spend into profitable growth.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Business type"
          className="inline-flex mx-auto lg:mx-0 shrink-0 rounded-[12px] border border-navy/15 p-1"
        >
          {businessOrder.map((id) => {
            const isActive = id === active;
            return (
              <button
                key={id}
                role="tab"
                id={`tab-${id}`}
                aria-selected={isActive}
                aria-controls={`panel-${id}`}
                onClick={() => setActive(id)}
                className={`avero-focus relative rounded-[9px] px-3 sm:px-5 py-2 sm:py-2.5 text-[13px] sm:text-[14px] font-medium transition-colors duration-200 ease-premium ${isActive ? 'text-white' : 'text-charcoal/65 hover:text-navy'
                  }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="business-pill"
                    className="absolute inset-0 rounded-[9px] bg-navy"
                    transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                  />
                )}
                <span className="relative">{businessPanels[id].label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          id={`panel-${active}`}
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          className="grid gap-12 pt-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:items-center"
        >
          <div>
            <h3 className="max-w-[20ch] font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-navy sm:text-[30px]">
              {panel.headline}
            </h3>
            <p className="mt-5 max-w-[44ch] text-[15.5px] leading-[1.7] text-charcoal/70">
              {panel.copy}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {panel.focus.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-navy/12 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-eyebrow text-navy/60"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <Button variant="secondary" size="lg" onClick={handleOpenAudit}>
                {panel.cta}
                <ArrowRightIcon
                  className="h-4 w-4 transition-transform duration-200 ease-premium group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[18px] border border-navy/15 bg-[#F7F5EF] p-3.5 sm:p-4 lg:p-4.5 flex flex-col justify-between shadow-sm">
            {/* Top Header */}
            <div className="flex items-center justify-between gap-3 mb-3 sm:mb-3.5">
              <p className="font-display text-[14px] sm:text-[15.5px] font-bold text-navy leading-snug">
                {active === 'ecommerce'
                  ? 'Authentic Supplements Store'
                  : 'Career Coaching & Analytics'}
              </p>
              <div className="text-right shrink-0">
                <span className="inline-block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-navy/70 bg-navy/5 px-2.5 py-1 rounded-md border border-navy/10">
                  {active === 'ecommerce'
                    ? 'E-COMMERCE'
                    : 'LEAD GENERATION'}
                </span>
              </div>
            </div>

            {/* Dashboard Screenshot (Click to zoom) */}
            <div
              onClick={() =>
                setZoomImage({ src: dashboardSrc, title: dashboardTitle })
              }
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-navy/12 bg-white shadow-sm mb-3.5 sm:mb-4"
            >
              <Image
                src={dashboardSrc}
                alt={dashboardTitle}
                width={1200}
                height={675}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                priority
              />
              <div className="absolute inset-0 bg-navy/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/90 px-3.5 py-1.5 text-[12px] font-medium text-white shadow-lg backdrop-blur-xs">
                  <ZoomInIcon className="h-3.5 w-3.5 text-amber-400" /> Click to enlarge dashboard
                </span>
              </div>
            </div>

            {/* 4 Metrics Row */}
            <dl className="grid grid-cols-2 gap-y-4 gap-x-3 sm:grid-cols-4 sm:gap-x-0 sm:divide-x sm:divide-navy/15 pt-0.5">
              {panel.metrics.map((metric, idx) => (
                <div
                  key={metric.label}
                  className={`flex flex-col justify-between ${idx === 0 ? 'sm:pr-3' : idx === 3 ? 'sm:pl-3.5' : 'sm:px-3.5'
                    }`}
                >
                  <div>
                    <dt className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-navy/75 leading-tight min-h-[24px] flex items-end">
                      {metric.label}
                    </dt>
                    <dd className="mt-1 font-display text-[22px] sm:text-[24px] lg:text-[27px] font-bold tracking-tight text-navy tabular-nums">
                      <AnimatedCounter value={metric.value} />
                    </dd>
                  </div>
                  <p className="mt-0.5 text-[11px] sm:text-[11.5px] text-charcoal/70">
                    {metric.caption}
                  </p>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Lightbox Image Modal with Mobile Swipe/Scroll Support */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/92 backdrop-blur-md p-2 sm:p-6 lg:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full bg-navy-900 rounded-2xl border border-gold/30 overflow-hidden shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[88vh]"
            >
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5 border-b border-white/10 bg-navy-950/80 shrink-0">
                <span className="font-mono text-[12px] sm:text-[13px] font-semibold text-gold uppercase tracking-wider truncate pr-2">
                  {zoomImage.title}
                </span>
                <button
                  onClick={() => setZoomImage(null)}
                  className="avero-focus rounded-full p-1.5 text-white/70 hover:text-gold hover:bg-white/10 transition-colors shrink-0"
                  aria-label="Close modal"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="p-1 sm:p-4 overflow-x-auto overflow-y-auto max-h-[76vh] sm:max-h-[80vh] flex items-center justify-start sm:justify-center bg-navy-950/60">
                <div className="min-w-[650px] sm:min-w-0 w-full shrink-0 flex items-center justify-center">
                  <Image
                    src={zoomImage.src}
                    alt={zoomImage.title}
                    width={1600}
                    height={900}
                    className="w-full h-auto object-contain rounded-lg shadow-lg border border-white/10"
                    priority
                  />
                </div>
              </div>

              <div className="sm:hidden px-3 py-2 bg-navy-950/95 border-t border-white/10 text-center font-mono text-[10.5px] text-white/70">
                👉 Swipe left/right to view full dashboard metrics
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
