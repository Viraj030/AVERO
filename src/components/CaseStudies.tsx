import React from 'react';
import { motion } from 'framer-motion';
import { caseStudies } from '../data/caseStudies';
import type { CaseStudy } from '../types/avero';
import { Eyebrow } from './ui/Eyebrow';
import { Section } from './ui/Section';

export function CaseStudies() {
  return (
    <Section
      id="results"
      aria-labelledby="results-heading"
      className="bg-white py-20 lg:py-28">
      
      <div className="flex flex-col gap-6 border-b border-navy/12 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Eyebrow>Proof</Eyebrow>
          <h2
            id="results-heading"
            className="mt-6 font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] text-navy sm:text-[42px]">
            
            Don&rsquo;t take our word for it.
          </h2>
        </div>
        <p className="max-w-[38ch] font-mono text-[10.5px] uppercase leading-[1.7] tracking-eyebrow text-navy/40">
          Placeholder data — replace with verified client results before
          publishing.
        </p>
      </div>

      <div className="divide-y divide-navy/12">
        {caseStudies.map((study, i) =>
        <CaseStudyBlock key={study.id} study={study} index={i} />
        )}
      </div>
    </Section>);

}

function CaseStudyBlock({ study, index }: {study: CaseStudy;index: number;}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
      
      <div className="flex flex-col">
        <p className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-eyebrow text-navy/40">
          <span className="text-gold-deep">
            {String(index + 1).padStart(2, '0')}
          </span>
          {study.sector}
        </p>
        <h3 className="mt-4 font-display text-[26px] font-semibold tracking-[-0.02em] text-navy sm:text-[30px]">
          {study.client}
        </h3>

        <dl className="mt-8 space-y-6">
          <Detail term="Challenge" copy={study.challenge} />
          <Detail term="What we changed" copy={study.changed} />
          <Detail term="Result" copy={study.result} />
        </dl>
      </div>

      <div className="overflow-hidden rounded-card border border-navy/12 bg-offwhite">
        <div className="grid grid-cols-2 gap-px bg-navy/10">
          <MetricGroup title="Before" metrics={study.before} />
          <MetricGroup title="After" metrics={study.after} accent />
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 border-y border-navy/10 px-5 py-4">
          {study.change.map((c) =>
          <span
            key={c}
            className="font-mono text-[12px] uppercase tracking-eyebrow text-gold-deep">
            
              {c}
            </span>
          )}
        </div>

        <div className="px-5 py-6">
          <p className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-eyebrow text-navy/45">
            <span>Performance index, 14 weeks</span>
            <span className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span
                  className="inline-block h-[2px] w-3 bg-navy/30"
                  aria-hidden="true" />
                
                Before
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="inline-block h-[2px] w-3 bg-gold"
                  aria-hidden="true" />
                
                After
              </span>
            </span>
          </p>
          <BeforeAfterGraph series={study.series} label={study.client} />
        </div>
      </div>
    </motion.article>);

}

function Detail({ term, copy }: {term: string;copy: string;}) {
  return (
    <div className="grid gap-1.5 sm:grid-cols-[130px_minmax(0,1fr)] sm:gap-6">
      <dt className="font-mono text-[10px] uppercase tracking-eyebrow text-navy/45">
        {term}
      </dt>
      <dd className="max-w-[48ch] text-[14.5px] leading-[1.7] text-charcoal/75">
        {copy}
      </dd>
    </div>);

}

function MetricGroup({
  title,
  metrics,
  accent




}: {title: string;metrics: {label: string;value: string;}[];accent?: boolean;}) {
  return (
    <div className="bg-offwhite px-5 py-5">
      <p className="font-mono text-[10px] uppercase tracking-eyebrow text-navy/45">
        {title}
      </p>
      <dl className="mt-4 space-y-3">
        {metrics.map((m) =>
        <div key={m.label} className="flex items-baseline justify-between gap-3">
            <dt className="text-[13px] text-charcoal/60">{m.label}</dt>
            <dd
            className={`font-display text-[22px] font-semibold tabular-nums ${
            accent ? 'text-gold-deep' : 'text-navy/55'}`
            }>
            
              {m.value}
            </dd>
          </div>
        )}
      </dl>
    </div>);

}

function BeforeAfterGraph({
  series,
  label



}: {series: {before: number[];after: number[];};label: string;}) {
  const all = [...series.before, ...series.after];
  const max = Math.max(...all);
  const min = Math.min(...all);
  const W = 320;
  const H = 96;

  const toPath = (points: number[], offset: number) => {
    const total = series.before.length + series.after.length - 1;
    const step = W / total;
    return points.
    map((p, i) => {
      const x = (i + offset) * step;
      const y = H - (p - min) / (max - min || 1) * (H - 10) - 5;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    }).
    join(' ');
  };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-24 w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label={`${label}: performance flat before engagement, rising steadily after`}>
      
      <line
        x1={W / 2}
        y1="0"
        x2={W / 2}
        y2={H}
        stroke="rgba(18,59,109,0.14)"
        strokeWidth="1"
        strokeDasharray="3 4" />
      
      <motion.path
        d={toPath(series.before, 0)}
        fill="none"
        stroke="rgba(18,59,109,0.32)"
        strokeWidth="1.75"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }} />
      
      <motion.path
        d={toPath(series.after, series.before.length - 1)}
        fill="none"
        stroke="#D4AF37"
        strokeWidth="2.25"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.25, ease: [0.23, 1, 0.32, 1] }} />
      
    </svg>);

}