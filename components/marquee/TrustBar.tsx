import React from 'react';

const items = [
  'Meta Ads',
  'Google Ads',
  'CRO',
  'Tracking',
  'Creative Strategy',
  'Performance Analytics',
];

export function TrustBar() {
  const tickerItems = [...items, ...items, ...items, ...items, ...items, ...items];

  return (
    <section
      aria-label="Capabilities Marquee"
      className="w-full overflow-hidden border-y border-navy/10 bg-white py-4"
    >
      <style>{`
        @keyframes avero-marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .avero-marquee-track {
          animation: avero-marquee 25s linear infinite;
        }
      `}</style>

      <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="avero-marquee-track flex whitespace-nowrap gap-8 items-center shrink-0">
          {tickerItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 shrink-0">
              <span className="font-mono text-xs uppercase tracking-widest text-navy/70 font-semibold">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-gold/60" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
