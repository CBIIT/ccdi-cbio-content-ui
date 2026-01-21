'use client';

import { FC, useState, useEffect, useRef } from 'react';
import { fetchContent } from '@/utilities/data-fetching';
import Image from 'next/image';
import { processMarkdown } from '@/components/about/handleAbout';
import headerImg from '../../../assets/about/cBio_About_Header.svg';
import headerImgMobile from '../../../assets/about/cBio_About_Header_mobile.svg';
import headerImgTablet from '../../../assets/about/cBio_About_Header_tablet.svg';

type ProcessedGitHubAbout = string;

const About: FC = () => {
  const [processedAbout, setProcessedAbout] = useState<ProcessedGitHubAbout>('');
  const [loading, setLoading] = useState(true);

  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const aboutContent = await fetchContent('about/about.md');
        const formattedAbout = await processMarkdown(aboutContent);
        setProcessedAbout(formattedAbout);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
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
            {processedAbout && (
              <section
                className="pt-0.5 mt-1 w-full text-sm font-semibold leading-5 text-neutral-800 max-md:max-w-full"
                dangerouslySetInnerHTML={{ __html: processedAbout }}
              >
              </section>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
