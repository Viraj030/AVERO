'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  className = '',
  duration = 1800
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Regex parses optional prefix (₹, etc.), numeric string with optional dots/commas, and optional suffix (%, x, L, etc.)
    const match = value.match(/^([^0-9\.]*)([\d,]+(?:\.\d+)?)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || '';
    const rawNumberStr = match[2].replace(/,/g, '');
    const suffix = match[3] || '';
    const targetNum = parseFloat(rawNumberStr);

    if (isNaN(targetNum)) {
      setDisplayValue(value);
      return;
    }

    const hasComma = match[2].includes(',');
    const decimalParts = rawNumberStr.split('.');
    const decimals = decimalParts.length > 1 ? decimalParts[1].length : 0;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic formula
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentNum = targetNum * easeProgress;

      let formattedNum = currentNum.toFixed(decimals);
      if (hasComma) {
        const parts = formattedNum.split('.');
        parts[0] = formatCommas(parts[0], match[2]);
        formattedNum = parts.join('.');
      }

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value); // Ensure exact final text alignment
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}

function formatCommas(numStr: string, originalSample: string): string {
  // Check if original used Indian numbering (e.g. 3,28,085 or 1,13,87,314)
  const isIndian = /,\d{2},/.test(originalSample) || /^\d{1,2},\d{2},/.test(originalSample);
  if (isIndian && numStr.length > 3) {
    const lastThree = numStr.substring(numStr.length - 3);
    const otherNumbers = numStr.substring(0, numStr.length - 3);
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
  }
  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
