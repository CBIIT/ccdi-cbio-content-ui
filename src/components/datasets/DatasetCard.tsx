'use client';
import * as React from 'react';
import { DatasetHeader } from './DatasetHeader';
import { DatasetContent } from './DatasetContent';

interface DatasetCardProps {
  title: string;
  date: string;
  subtitle: string;
  children: React.ReactNode;
}

export const DatasetCard: React.FC<DatasetCardProps> = ({
  title,
  date,
  subtitle,
  children,
}) => {
  return (
    <article className="overflow-hidden p-2 w-full bg-white rounded border border-solid border-neutral-300">
      <DatasetHeader title={title} date={date} subtitle={subtitle} />
      <DatasetContent>{children}</DatasetContent>
    </article>
  );
};
