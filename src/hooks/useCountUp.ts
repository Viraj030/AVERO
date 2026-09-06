import { useEffect, useRef, useState } from 'react';

interface Options {
  duration?: number;
  decimals?: number;
  start?: number;
  active?: boolean;
}

/**
 * Counts from `start` to `target` once `active` becomes true.
 * Respects prefers-reduced-motion by snapping to the target value.
 */
export function useCountUp(target: number, options: Options = {}): number {
  const { duration = 1100, decimals = 0, start = 0, active = true } = options;
  const [value, setValue] = useState(start);
  const frame = useRef<number>();

  useEffect(() => {
    if (!active) return;

    const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      setValue(target);
      return;
    }

    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = start + (target - start) * eased;
      const factor = Math.pow(10, decimals);
      setValue(Math.round(next * factor) / factor);
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [target, duration, decimals, start, active]);

  return value;
}