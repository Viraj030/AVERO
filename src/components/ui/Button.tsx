import React from 'react';
import { classNames } from '../../utils/format';

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: 'md' | 'lg';
  children: React.ReactNode;
}

const base =
'avero-focus group inline-flex items-center justify-center gap-2 rounded-[12px] font-medium transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-premium active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
  'bg-gold text-navy-900 hover:-translate-y-0.5 hover:bg-gold-soft hover:shadow-[0_12px_28px_-14px_rgba(212,175,55,0.9)]',
  secondary:
  'border border-navy/25 bg-transparent text-navy hover:-translate-y-0.5 hover:border-navy/60 hover:bg-navy/[0.04]',
  onDark:
  'border border-white/25 bg-transparent text-white hover:-translate-y-0.5 hover:border-gold/70 hover:text-gold',
  ghost: 'text-navy hover:text-gold-deep'
};

const sizes = {
  md: 'h-11 px-5 text-[14px]',
  lg: 'h-[52px] px-7 text-[15px]'
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={classNames(base, variants[variant], sizes[size], className)}
      {...rest}>
      
      {children}
    </button>);

}