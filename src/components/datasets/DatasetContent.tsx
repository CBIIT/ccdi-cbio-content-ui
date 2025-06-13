'use client';
import * as React from 'react';

interface DatasetContentProps {
  children: React.ReactNode;
}

export const DatasetContent: React.FC<DatasetContentProps> = ({
  children,
}) => {
  return (
    <section className="pt-0.5 mt-1 w-full text-sm font-semibold leading-5 text-neutral-800 max-md:max-w-full">
      {children}
    </section>
  );
};
