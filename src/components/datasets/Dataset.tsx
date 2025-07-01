'use client';

import { useState, useEffect } from 'react';
import { DatasetHeader } from './DatasetHeader';
import { DatasetContent } from './DatasetContent';
import { GitHubDataset } from '@/app/page';
import {
  processMarkdown,
  extractTitles,
  extractSubtitles,
  extractDates,
  extractContent
} from './handleDatasets';

async function fetchContent(slug: string, isDev: boolean) {
  const response = await fetch(
    `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/datasets/${slug}.md${isDev ? '?ref=dev' : ''}`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3.raw',
      },
      next: { revalidate: 3600 }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch datasets');
  }

  const content = await response.text();
  return content;
}

export default function DataAccessCards({ datasets, isDev }: { datasets: GitHubDataset[], isDev: boolean }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [processedDatasets, setProcessedDatasets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const formattedDatasets = await Promise.all(
          datasets.map(async dataset => {
            const slug = dataset?.name.replace('.md', '');
            if (!slug) {
              return null;
            }
            const fetchedContent = await fetchContent(slug, isDev);
            const fetchedProcessedContent = await processMarkdown(fetchedContent);
            const titles = extractTitles(fetchedProcessedContent);
            const subtitles = extractSubtitles(fetchedProcessedContent);
            const dates = extractDates(fetchedProcessedContent);
            const content = extractContent(fetchedProcessedContent);
            return {
              ...dataset,
              titles,
              subtitles,
              dates,
              content
            };
          })
        );
        setProcessedDatasets(formattedDatasets);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-hidden">
      <div className="flex overflow-hidden gap-2.5 justify-center items-start w-full bg-white max-md:max-w-full">
        <div className="flex justify-center items-start pt-5 max-w-[1260px] min-w-60 w-[960px]">
          <div className="px-2.5 pt-1.5 pb-0 min-w-60 w-[960px] max-md:max-w-full">
            <div className="w-full">
              {processedDatasets.length > 0 && processedDatasets.map(processedDataset => (
                <article
                  key={processedDataset.sha}
                  className="overflow-hidden mb-2.5 p-2 w-full bg-white rounded border border-solid border-neutral-300"
                >
                  <DatasetHeader
                    title={processedDataset.titles[0].text}
                    date={processedDataset.dates[0].text}
                    subtitle={processedDataset.subtitles[0].text}
                  />
                  <DatasetContent content={processedDataset.content} />
                </article>
              ))}
            </div>
            <footer className="flex gap-10 pt-3.5 pb-0 w-full border-slate-300 border-t-[3px] max-md:max-w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
