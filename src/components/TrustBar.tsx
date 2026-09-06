import React from 'react';
import { motion } from 'framer-motion';

const items = [
  'Meta Ads',
  'Google Ads',
  'CRO',
  'Tracking',
  'Creative Strategy',
  'Performance Analytics',
];

export function TrustBar() {
  // Duplicate array to create a seamless infinite loop
  const tickerItems = [...items, ...items, ...items, ...items, ...items, ...items];

  return (
    <section
      aria-label="Capabilities Marquee"
      className="w-full overflow-hidden border-y border-navy/10 bg-white py-4">
      
      <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          className="flex whitespace-nowrap gap-8 items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25,
            ease: 'linear',
          }}>
          {tickerItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 shrink-0">
              <span className="font-mono text-xs uppercase tracking-widest text-navy/70 font-semibold">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-gold/60" aria-hidden="true" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}