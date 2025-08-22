'use client';

import { FC, useState, useEffect, useRef } from 'react';
import { fetchAboutData } from '@/utilities/data-fetching';
import Image from 'next/image';
import { AboutContent } from '@/components/about/AboutContent';
import {
  processMarkdown,
  extractTitles,
  extractMainContent,
  extractContactContent,
} from '@/components/about/handleAbout';
import headerImg from '../../../assets/about/cBio_About_Header.svg';
import headerImgMobile from '../../../assets/about/cBio_About_Header_mobile.svg';
import headerImgTablet from '../../../assets/about/cBio_About_Header_tablet.svg';

interface GitHubAbout {
  name: string;
  path: string;
  type: string;
}

interface ProcessedGitHubAbout {
  titles: {
    id: string;
    text: string;
  }[];
  mainContent: string;
  contactContent: string;
  name: string;
  path: string;
  type: string;
  sha?: string;
}

const About: FC = () => {
  const [processedAbouts, setProcessedAbouts] = useState<ProcessedGitHubAbout[]>([]);
  const [loading, setLoading] = useState(true);

  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      if (typeof window !== 'undefined') {
        const isDevEnv = (process.env.NODE_ENV === 'development') || !!window.location.search;

        try {
          const { aboutFiles, content } = await fetchAboutData(isDevEnv);
          const formattedAbouts = await Promise.all(
            aboutFiles.map(async (fetchedAbout: GitHubAbout) => {
              const fetchedProcessedContent = await processMarkdown(content);
              const titles = extractTitles(fetchedProcessedContent);
              const mainContent = extractMainContent(fetchedProcessedContent);
              const contactContent = extractContactContent(fetchedProcessedContent);
              return { ...fetchedAbout, titles, mainContent, contactContent };
            })
          );
          setProcessedAbouts(formattedAbouts);
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
      window.parent.postMessage(['setHeight', height], '*');
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
    <main ref={mainContentRef}>
      <div className="about-header-image">
        {/* Mobile (<768px) */}
        <Image
          src={headerImgMobile}
          alt="About Page Mobile Header"
          priority
          className="block md:hidden w-full object-cover"
        />
        {/* Tablet (>=768px and <1024px) */}
        <Image
          src={headerImgTablet}
          alt="About Page Tablet Header"
          priority
          className="hidden md:block lg:hidden w-full object-cover"
        />
        {/* Desktop (>=1024px) */}
        <Image
          src={headerImg}
          alt="About Page Desktop Header"
          priority
          className="hidden lg:block w-full object-cover"
        />
      </div>
      <div className="bg-[#087D6F] text-white py-3">
        <div className="container lg:mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-[35px] font-[Poppins] font-semibold leading-[38px] tracking-[0.7px]"
          >
            CCDI cBioPortal
          </h1>
        </div>
      </div>
      <section id="about" className="pt-10 pb-1 bg-white">
        <div className="container lg:mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="prose prose-lg max-w-none">
            {processedAbouts.length > 0 && processedAbouts.map(processedAbout => (
              <div key={processedAbout.sha}>
                <AboutContent content={processedAbout.mainContent} />
                <h2
                  className="
                    text-[25px] lg:text-[22px]
                    font-[Poppins]
                    font-normal
                    leading-[26px]
                    tracking-[-0.05px] lg:tracking-[-0.044px]
                    text-[#05555C]
                    mt-15 mb-2 flex items-center uppercase
                  "
                >
                  {processedAbout.titles[0].text}
                </h2>
                <div className="contact-section">
                  <AboutContent content={processedAbout.contactContent} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
