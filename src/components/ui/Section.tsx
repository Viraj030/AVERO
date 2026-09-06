import React from 'react';
import { classNames } from '../../utils/format';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  'aria-labelledby'?: string;
}

export function Section({
  id,
  children,
  className,
  innerClassName,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={classNames('w-full px-5 sm:px-8', className)}
      {...rest}>
      
      <div className={classNames('mx-auto w-full max-w-shell', innerClassName)}>
        {children}
      </div>
    </section>);

}