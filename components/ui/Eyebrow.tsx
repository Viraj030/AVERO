import React from 'react';
import { classNames } from '@/lib/format';

interface EyebrowProps {
  children: React.ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
}

export function Eyebrow({ children, tone = 'light', className }: EyebrowProps) {
  return (
    <p
      className={classNames(
        'flex items-center gap-3 font-mono text-[0.85rem] lg:text-[15px] font-bold uppercase tracking-eyebrow',
        tone === 'light' ? 'text-navy/75' : 'text-white/80',
        className
      )}
    >
      <span
        aria-hidden="true"
        className="inline-block h-[6px] w-[6px] rotate-45 bg-gold"
      />
      {children}
    </p>
  );
}
