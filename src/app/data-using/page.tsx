'use client';

import { FC, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { fetchDataUsingData } from '@/utilities/data-fetching';
import { getTierName } from '@/utilities/environment';
import { DataUsingContent } from '@/components/data-using/DataUsingContent';
import {
  processMarkdown,
  extractTitles,
  extractSection1Content,
  extractSection2Content,
  extractSection3Content,
} from '@/components/data-using/handleDataUsing';
import cBioStudyClinicalData from '../../../assets/data-using/cBioStudyClinicalData.png';
import ccdiExploreDashboard from '../../../assets/data-using/ccdiExploreDashboard.png';
import annotationArrow from '../../../assets/data-using/annotationArrow.svg';

interface ProcessedGitHubDataUsing {
  titles: {
    id: string;
    text: string;
  }[];
  contents: string[];
  name: string;
  path: string;
  type: string;
  sha?: string;
}

const HOW_TO = 1;
const CITING = 2;

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
            const titles = extractTitles(fetchedProcessedContent);
            const section1Content = extractSection1Content(fetchedProcessedContent);
            const section2Content = extractSection2Content(fetchedProcessedContent);
            const section3Content = extractSection3Content(fetchedProcessedContent);
            const formattedDataUsing = {
              ...dataUsingFile,
              titles,
              contents: [section1Content, section2Content, section3Content],
            };
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
      {/* Title Container */}
      <div
        className="
          bg-[#087d6f] w-full flex items-center justify-center
          px-4 sm:px-6 md:px-[5px] lg:px-[88px]
          py-[15px] md:py-[13px] lg:py-[13px]
          min-h-[142px]
        "
      >
        <h1 className="font-[Poppins] font-semibold text-[35px] leading-[38px] tracking-[0.7px] text-white text-center">
          Using CCDI cBioPortal Data
        </h1>
      </div>

      {/* Content Container */}
      <section
        id="data-using"
        className="
          flex flex-col gap-[40px] lg:gap-[60px]
          items-center justify-center
          pt-9 sm:pt-10 lg:pt-10
          px-5 sm:px-[25px] lg:px-8
          w-full max-w-[1420px]
        "
      >
        {processedDataUsing && processedDataUsing.titles.map((title, index) => (
          <div key={title.id} className="flex flex-col gap-5 lg:gap-6 items-start max-w-full lg:max-w-[984px] w-full">
            <h2 className="font-[Poppins] font-normal text-[25px] lg:text-[22px] leading-[26px] tracking-[-0.05px] lg:tracking-[-0.044px] text-[#05555c] w-full">
              {title.text}
            </h2>
            {processedDataUsing.contents[index].split('\n').filter(content => content.trim() !== '').map((content, i) => (
              <div
                key={`${title.id}-${i}`}
                className={`flex flex-col gap-5 lg:gap-6 items-start max-w-full lg:max-w-[984px] w-full ${index === HOW_TO && i === 0 ? 'mb-[15px]' : ''}`}
              >
                <DataUsingContent content={content} isCitationBox={index === CITING && i === 1} />
                {index === HOW_TO && (
                  <div className="flex flex-col gap-5 lg:gap-[20px] items-center w-full">
                    <div className="relative w-full max-w-[335px] sm:max-w-[504px] lg:max-w-[656px] xl:max-w-[656px] 2xl:max-w-[656px] h-auto">
                      <div
                        className="relative border border-[#4a8497] border-solid w-full sm:min-w-[504px] sm:min-h-[227px] sm:mx-auto aspect-[647.5/292] overflow-hidden lg:shadow-[2px_6px_15px_0_rgba(0,0,0,0.25)]"
                      >
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <Image
                            src={i === 0 ? cBioStudyClinicalData : ccdiExploreDashboard}
                            alt={i === 0 ? 'cBioPortal Clinical Data tab screenshot' : 'CCDI Hub Explore dashboard screenshot'}
                            priority
                            className={
                              i === 0
                                ? 'absolute h-[130.9%] left-[-3%] max-w-none top-[-1.45%] w-[102.91%] object-contain'
                                : 'absolute h-[171.99%] left-0 max-w-none top-[0.61%] w-[135.22%] object-contain'
                            }
                          />
                        </div>
                      </div>

                      {/* Arrow annotation - responsive positioning that scales proportionally with container */}
                      <div
                        className={
                          i === 0
                            // First arrow: Desktop position left=444.5px (67.8% of 656px), top=82px (28.1% of 292px)
                            // Arrow width=89.5px (13.6% of 656px container)
                            // Use percentage-based positioning that scales with container
                            ? 'absolute right-[18.6%] top-[28.1%] lg:left-[67.8%] lg:top-[28.1%] lg:right-auto w-[13.6%] h-auto aspect-[89.5/92.426]'
                            // Second arrow: Desktop position left=167px (25.5% of 656px), top=97.5px (33.4% of 292px)
                            // Arrow width=89.5px (13.6% of 656px container)
                            : 'absolute left-[25.5%] top-[33.4%] w-[13.6%] h-auto aspect-[89.5/92.426]'
                        }
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={annotationArrow}
                            alt={i === 0 ? 'Annotation arrow pointing to Clinical Data tab' : 'Annotation arrow pointing to Upload Participants Set'}
                            className="block max-w-none w-full h-full object-contain"
                            width={90}
                            height={93}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </section>
    </main>
  );
};

export default DataUsing;
