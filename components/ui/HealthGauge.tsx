'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HealthGaugeProps {
  /** 0–100 account health score. */
  score: number;
  active: boolean;
}

const RADIUS = 34;
const CIRC = 2 * Math.PI * RADIUS;

export function HealthGauge({ score, active }: HealthGaugeProps) {
  const band = score >= 70 ? 'Healthy' : score >= 45 ? 'At risk' : 'Leaking';

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-[86px] w-[86px] shrink-0">
        <svg viewBox="0 0 86 86" className="h-full w-full -rotate-90">
          <circle
            cx="43"
            cy="43"
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="5"
          />
          <motion.circle
            cx="43"
            cy="43"
            r={RADIUS}
            fill="none"
            stroke="#D4AF37"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            initial={{ strokeDashoffset: CIRC }}
            animate={{
              strokeDashoffset: active ? CIRC * (1 - score / 100) : CIRC
            }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-[22px] font-semibold leading-none tabular-nums text-white">
            {active ? score : '—'}
          </span>
          <span className="mt-0.5 font-mono text-[8.5px] uppercase tracking-eyebrow text-white/40">
            / 100
          </span>
        </div>
      </div>

      <div>
        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-white/45">
          Account health
        </p>
        <p className="mt-1 font-display text-[19px] font-semibold text-gold">
          {active ? band : 'Pending'}
        </p>
        <p className="mt-1 max-w-[24ch] text-[12px] leading-[1.55] text-white/50">
          Weighted across all eight systems, not the ad account alone.
        </p>
      </div>
    </div>
  );
}
