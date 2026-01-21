'use client';

import { FC, useState, useEffect, useRef } from 'react';
import { fetchDataUsingData } from '@/utilities/data-fetching';
import { getTierName } from '@/utilities/environment';
import { processMarkdown } from '@/components/data-using/handleDataUsing';

interface ProcessedGitHubDataUsing {
  fetchedProcessedContent: string;
  name: string;
  path: string;
  type: string;
  sha?: string;
}

const DataUsing: FC = () => {
  const [processedDataUsing, setProcessedDataUsing] = useState<ProcessedGitHubDataUsing | null>(null);
  const [loading, setLoading] = useState(true);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      if (typeof window !== 'undefined') {
        try {
          const { dataUsingFile, content } = await fetchDataUsingData(getTierName(window.location.hostname));
          if (dataUsingFile) {
            const fetchedProcessedContent = await processMarkdown(content);
            const formattedDataUsing = { ...dataUsingFile, fetchedProcessedContent };
            setProcessedDataUsing(formattedDataUsing);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const height = mainContentRef.current?.scrollHeight;
      if (height && typeof window !== 'undefined') {
        window.parent.postMessage(['setHeight', height], '*');
      }
    });
    if (mainContentRef.current) {
      observer.observe(mainContentRef.current);
    }
    return () => {
      observer.disconnect();
    };
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main ref={mainContentRef} className="flex flex-col items-center w-full bg-white">
      <div
        className="
          bg-[#087d6f] w-full flex items-center justify-center
          px-4 sm:px-6 md:px-[5px] lg:px-[88px]
          py-[15px] md:py-[13px] lg:py-[13px]
          min-h-[142px]
        "
      >
        <h1
          className="
            font-[Poppins] font-semibold
            text-[35px] leading-[38px] tracking-[0.7px]
            text-white text-center
          "
        >
          Using CCDI cBioPortal Data
        </h1>
      </div>

      {processedDataUsing && (
        <div
          className="
            flex flex-col justify-center items-center
            font-[Inter] font-medium
            text-[18px] lg:text-[16px] text-black
            leading-[24px] lg:leading-[22px]
            w-full max-w-full max-w-[1420px]
            px-5 sm:px-[25px] lg:px-8 pt-4 lg:pt-1
          "
          dangerouslySetInnerHTML={{ __html: processedDataUsing.fetchedProcessedContent }}
        ></div>
      )}
    </main>
  );
};

export default DataUsing;
