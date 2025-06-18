'use client';
import * as React from 'react';

interface DatasetHeaderProps {
  title: string;
  date: string;
  subtitle: string;
}

export const DatasetHeader: React.FC<DatasetHeaderProps> = ({
  title,
  date,
  subtitle,
}) => {
  return (
    <header className="pb-1.5 w-full border-b border-black max-md:max-w-full">
      <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
        <h2 className="gap-1.5 self-stretch my-auto text-base font-bold leading-none text-sky-800 min-w-60 w-[641px] max-md:max-w-full">
          {title}
        </h2>
        <time className="self-stretch my-auto text-sm leading-none text-sky-800">
          {date}
        </time>
      </div>
      <h3 className="text-base font-medium leading-none text-sky-800">
        {subtitle}
      </h3>
    </header>
  );
};
