'use client';

import { FC, useState, useEffect, useRef } from 'react';
import { AboutContent } from '@/components/about/AboutContent';
import {
  processMarkdown,
  extractTitles,
  extractMainContent,
  extractContactContent,
} from '@/components/about/handleAbout';

export interface GitHubAbout {
  name: string;
  path: string;
  type: string;
}

async function fetchAbouts(isDev: boolean) {
  const response = await fetch(
    `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/about${isDev ? '?ref=dev' : ''}`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch about');
  }

  const data: GitHubAbout[] = await response.json();
  return data.filter(item => item.type === 'file' && item.name.endsWith('.md'));
}

async function fetchContent(isDev: boolean) {
  const response = await fetch(
    `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/about/about.md${isDev ? '?ref=dev' : ''}`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3.raw',
      },
      next: { revalidate: 3600 }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch about');
  }

  const content = await response.text();
  return content;
}

const About: FC = () => {
  const [processedAbouts, setProcessedAbouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      if (typeof window !== 'undefined') {
        const isDevEnv = (process.env.NODE_ENV === 'development') || !!window.location.search;

        try {
          const fetchedAbouts = await fetchAbouts(isDevEnv);
          const formattedAbouts = await Promise.all(
            fetchedAbouts.map(async fetchedAbout => {
              const fetchedContent = await fetchContent(isDevEnv);
              const fetchedProcessedContent = await processMarkdown(fetchedContent);
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
      <div className="relative h-64 bg-gradient-to-r from-blue-100 via-green-50 to-orange-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 via-green-200/30 to-orange-200/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-600">
            <div className="text-6xl opacity-20 mb-2">🧬</div>
            <p className="text-lg opacity-60">Advancing Childhood Cancer Research Through Data</p>
          </div>
        </div>
      </div>
      <div className="bg-teal-800 text-white py-3">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">CCDI cBioPortal</h1>
        </div>
      </div>
      <section id="about" className="pt-16 pb-1 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {processedAbouts.length > 0 && processedAbouts.map(processedAbout => (
              <div key={processedAbout.sha}>
                <AboutContent content={processedAbout.mainContent} />
                <h2 className="text-xl font-bold text-teal-800 mt-15 mb-2 flex items-center">
                  {processedAbout.titles[0].text}
                </h2>
                <AboutContent content={processedAbout.contactContent} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
