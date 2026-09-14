'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon, ZoomInIcon } from 'lucide-react';
import { caseStudies } from '@/data/caseStudies';
import type { CaseStudy } from '@/types/avero';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

export function CaseStudies() {
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

  return (
    <Section
      id="results"
      aria-labelledby="results-heading"
      className="bg-white pt-8 pb-16 lg:py-22"
    >
      <div className="flex flex-col gap-6 border-b border-navy/12 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Eyebrow>Proof</Eyebrow>
          <h2
            id="results-heading"
            className="mt-6 font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] text-navy sm:text-[42px]"
          >
            Don&rsquo;t take our word for it.
          </h2>
        </div>
      </div>

      <div className="divide-y divide-navy/12">
        {caseStudies.map((study, i) => (
          <CaseStudyBlock
            key={study.id}
            study={study}
            index={i}
            onZoomImage={setZoomImage}
          />
        ))}
      </div>

      {/* Lightbox Image Modal (Brand Navy & Gold Styling) */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/90 backdrop-blur-md p-4 sm:p-6 lg:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full bg-navy-900 rounded-2xl border border-gold/30 overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-navy-950/80">
                <span className="font-mono text-[12px] sm:text-[13px] font-semibold text-gold uppercase tracking-wider">
                  {zoomImage.title}
                </span>
                <button
                  onClick={() => setZoomImage(null)}
                  className="avero-focus rounded-full p-1.5 text-white/70 hover:text-gold hover:bg-white/10 transition-colors"
                  aria-label="Close modal"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="p-2 sm:p-4 overflow-auto max-h-[82vh] flex items-center justify-center bg-navy-950/50">
                <Image
                  src={zoomImage.src}
                  alt={zoomImage.title}
                  width={1600}
                  height={900}
                  className="w-full h-auto object-contain rounded-lg shadow-lg border border-white/10"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

function CaseStudyBlock({
  study,
  index,
  onZoomImage
}: {
  study: CaseStudy;
  index: number;
  onZoomImage: (img: { src: string; title: string }) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16 lg:items-center"
    >
      <div className="flex flex-col">
        <p className="flex items-center gap-3 font-mono text-[12px] font-bold uppercase tracking-eyebrow text-navy/80">
          <span className="text-gold-deep font-extrabold text-[13px]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="rounded-full bg-navy/10 px-3 py-1 text-navy font-bold">
            {study.sector}
          </span>
        </p>

        <h3 className="mt-4 font-display text-[26px] sm:text-[30px] font-semibold tracking-[-0.02em] text-navy">
          {study.client}
        </h3>

        <p className="mt-3 font-display text-[20px] sm:text-[22px] font-semibold leading-[1.25] text-navy/90">
          {study.headline}
        </p>

        <dl className="mt-8 space-y-6">
          <Detail term="Challenge" copy={study.challenge} />
          <Detail term="What we changed" copy={study.changed} />
          <Detail term="Result" copy={study.result} />
        </dl>
      </div>

      <div className="overflow-hidden rounded-card border border-navy/12 bg-offwhite h-fit shadow-xs">
        <div className="flex items-center justify-between border-b border-navy/10 px-4 py-3 bg-offwhite">
          <div className="relative h-10 sm:h-12 w-44 sm:w-56 lg:w-60">
            <Image
              src={study.logoSrc}
              alt={study.client}
              fill
              className="object-contain object-left"
              priority={index === 0}
            />
          </div>
        </div>

        <div
          onClick={() =>
            onZoomImage({
              src: study.dashboardImage,
              title: `${study.client} Dashboard Performance`
            })
          }
          className="group relative cursor-pointer p-2.5 sm:p-3 bg-white border-b border-navy/10 overflow-hidden"
        >
          <Image
            src={study.dashboardImage}
            alt={`${study.client} Dashboard`}
            width={1200}
            height={675}
            className="w-full h-auto object-cover rounded-lg border border-navy/10 transition-transform duration-300 group-hover:scale-[1.01]"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-navy/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/90 px-3.5 py-1.5 text-[12px] font-medium text-white shadow-lg backdrop-blur-xs">
              <ZoomInIcon className="h-3.5 w-3.5 text-amber-400" /> Click to enlarge dashboard
            </span>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-px bg-navy/10 sm:grid-cols-4">
          {study.metrics.map((metric) => (
            <div key={metric.label} className="bg-offwhite px-3.5 sm:px-4 py-3.5 sm:py-4">
              <dt className="font-mono text-[10.5px] font-semibold uppercase tracking-eyebrow text-navy/75">
                {metric.label}
              </dt>
              <dd className="mt-1.5 font-display text-[19px] sm:text-[21px] font-semibold tabular-nums text-navy">
                <AnimatedCounter value={metric.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </motion.article>
  );
}

function Detail({ term, copy }: { term: string; copy: string }) {
  return (
    <div className="grid gap-1.5 sm:grid-cols-[130px_minmax(0,1fr)] sm:gap-6">
      <dt className="font-mono text-[11px] font-bold uppercase tracking-eyebrow text-navy/80">
        {term}
      </dt>
      <dd className="max-w-[48ch] text-[14.5px] leading-[1.7] text-charcoal/85 font-medium">
        {copy}
      </dd>
    </div>
  );
}
