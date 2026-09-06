'use client';

import React from 'react';
import { CheckIcon } from 'lucide-react';

interface OptionGroupProps {
  name: string;
  legend: string;
  options: string[];
  multiple?: boolean;
  columns?: 1 | 2;
  value?: string;
  values?: string[];
  onChange?: (value: string) => void;
  onToggle?: (value: string) => void;
}

export function OptionGroup({
  name,
  legend,
  options,
  multiple = false,
  columns = 1,
  value,
  values = [],
  onChange,
  onToggle
}: OptionGroupProps) {
  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      <div
        className={`grid gap-2.5 ${columns === 2 ? 'sm:grid-cols-2' : 'grid-cols-1'}`}
      >
        {options.map((option) => {
          const selected = multiple
            ? values.includes(option)
            : value === option;
          return (
            <label
              key={option}
              className={`group relative flex cursor-pointer items-center gap-3 rounded-[12px] border px-4 py-3.5 transition-[border-color,background-color] duration-200 ease-premium ${
                selected
                  ? 'border-gold bg-gold/[0.08]'
                  : 'border-navy/15 hover:border-navy/35'
              }`}
            >
              <input
                type={multiple ? 'checkbox' : 'radio'}
                name={name}
                value={option}
                checked={selected}
                onChange={() =>
                  multiple ? onToggle?.(option) : onChange?.(option)
                }
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-[3px] rounded-[15px] opacity-0 ring-2 ring-gold peer-focus-visible:opacity-100"
              />
              <span
                aria-hidden="true"
                className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center border transition-colors duration-200 ease-premium ${
                  multiple ? 'rounded-[5px]' : 'rounded-full'
                } ${
                  selected
                    ? 'border-gold bg-gold text-navy-900'
                    : 'border-navy/25 text-transparent'
                }`}
              >
                <CheckIcon className="h-3 w-3" />
              </span>
              <span className="text-[15px] font-medium text-navy">{option}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
