import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  formats,
  hooks,
  matrix,
  verdictLabels,
  type MatrixCell } from
'../data/creativeMatrix';
import { Eyebrow } from './ui/Eyebrow';
import { Section } from './ui/Section';

const verdictStyle: Record<MatrixCell['verdict'], string> = {
  scale: 'bg-gold/85 text-navy-900 border-gold',
  iterate: 'bg-navy/[0.07] text-navy border-navy/15',
  retire: 'bg-white text-navy/45 border-navy/10',
  untested:
  'bg-white text-navy/25 border-dashed border-navy/15'
};

export function CreativeMatrix() {
  const [selected, setSelected] = useState<{r: number;c: number;}>({
    r: 0,
    c: 1
  });
  const cell = matrix[selected.r][selected.c];

  return (
    <Section
      aria-labelledby="matrix-heading"
      className="bg-white py-20 lg:py-28">
      
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Eyebrow>Creative testing matrix</Eyebrow>
          <h2
            id="matrix-heading"
            className="mt-6 max-w-[22ch] font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] text-navy sm:text-[42px]">
            
            Most accounts aren&rsquo;t out of budget. They&rsquo;re out of{' '}
            <span className="text-gold-deep">angles.</span>
          </h2>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {(
          Object.keys(verdictLabels) as MatrixCell['verdict'][]).
          map((verdict) =>
          <li
            key={verdict}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-eyebrow text-navy/50">
            
              <span
              className={`inline-block h-2.5 w-2.5 rounded-[3px] border ${verdictStyle[verdict]}`}
              aria-hidden="true" />
            
              {verdictLabels[verdict]}
            </li>
          )}
        </ul>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-14">
        <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[560px] border-separate border-spacing-1">
            <caption className="sr-only">
              Creative performance by hook and format. Select a cell to read the
              finding.
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-[132px]" />
                {formats.map((format) =>
                <th
                  key={format}
                  scope="col"
                  className="pb-2 text-left font-mono text-[10px] font-medium uppercase tracking-eyebrow text-navy/45">
                  
                    {format}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, r) =>
              <tr key={hooks[r]}>
                  <th
                  scope="row"
                  className="pr-4 text-left align-middle text-[13px] font-medium text-navy">
                  
                    {hooks[r]}
                  </th>
                  {row.map((item, c) => {
                  const isSelected = selected.r === r && selected.c === c;
                  return (
                    <td key={`${r}-${c}`} className="p-0">
                        <button
                        type="button"
                        onClick={() => setSelected({ r, c })}
                        aria-pressed={isSelected}
                        aria-label={`${hooks[r]} on ${formats[c]}: ${verdictLabels[item.verdict]}`}
                        className={`avero-focus relative flex h-[74px] w-full flex-col justify-between rounded-[10px] border p-2.5 text-left transition-[transform,box-shadow] duration-200 ease-premium hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-16px_rgba(18,59,109,0.6)] ${
                        verdictStyle[item.verdict]} ${
                        isSelected ? 'ring-2 ring-navy ring-offset-2' : ''}`}>
                        
                          <span className="font-mono text-[9.5px] uppercase tracking-eyebrow opacity-70">
                            {verdictLabels[item.verdict]}
                          </span>
                          <span className="font-mono text-[12px] tabular-nums">
                            {item.spendShare > 0 ?
                          `${item.spendShare}% spend` :
                          '—'}
                          </span>
                        </button>
                      </td>);

                })}
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <motion.aside
          key={`${selected.r}-${selected.c}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
          className="self-start rounded-card border border-navy/12 bg-offwhite p-6"
          aria-live="polite">
          
          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-navy/45">
            {hooks[selected.r]} × {formats[selected.c]}
          </p>
          <p className="mt-3 font-display text-[22px] font-semibold tracking-[-0.02em] text-navy">
            {verdictLabels[cell.verdict]}
          </p>
          <p className="mt-3 text-[14.5px] leading-[1.7] text-charcoal/75">
            {cell.note}
          </p>

          <dl className="mt-6 grid grid-cols-3 gap-px border-t border-navy/10 bg-navy/10 pt-px">
            <Cellstat label="CTR" value={cell.ctr ? `${cell.ctr}%` : '—'} />
            <Cellstat label="CVR" value={cell.cvr ? `${cell.cvr}%` : '—'} />
            <Cellstat
              label="Spend"
              value={cell.spendShare ? `${cell.spendShare}%` : '0%'} />
            
          </dl>

          <p className="mt-6 font-mono text-[10px] uppercase leading-[1.7] tracking-eyebrow text-navy/35">
            Placeholder test data · replace with account results
          </p>
        </motion.aside>
      </div>
    </Section>);

}

function Cellstat({ label, value }: {label: string;value: string;}) {
  return (
    <div className="bg-offwhite px-1 pt-4">
      <dt className="font-mono text-[9.5px] uppercase tracking-eyebrow text-navy/45">
        {label}
      </dt>
      <dd className="mt-1 font-display text-[19px] font-semibold tabular-nums text-navy">
        {value}
      </dd>
    </div>);

}