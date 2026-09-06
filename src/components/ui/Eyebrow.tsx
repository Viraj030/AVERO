import React from 'react';
import { classNames } from '../../utils/format';

interface EyebrowProps {
  children: React.ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
}

export function Eyebrow({ children, tone = 'light', className }: EyebrowProps) {
  return (
    <p
      className={classNames(
        'flex items-center gap-3 font-mono text-[11px] uppercase tracking-eyebrow',
        tone === 'light' ? 'text-navy/55' : 'text-white/50',
        className
      )}>
      
      <span
        aria-hidden="true"
        className="inline-block h-[6px] w-[6px] rotate-45 bg-gold" />
      
      {children}
    </p>);

}