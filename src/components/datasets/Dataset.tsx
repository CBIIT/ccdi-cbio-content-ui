'use client';

import { useState, useEffect } from 'react';
import { fetchDatasetContent } from '@/utilities/data-fetching';
import { DatasetHeader } from './DatasetHeader';
import { DatasetContent } from './DatasetContent';
import { UpdatedDatasetBody } from './UpdatedDatasetBody';
import { GitHubDataset } from '@/app/page';
import {
  processMarkdown,
  extractTitles,
  extractSubtitles,
  extractDates,
  extractContent
} from './handleDatasets';

import {
  processMarkdown as updatedProcessMarkdown,
  extractTitles as updatedExtractTitles,
  extractH2Content as updatedExtractH2Content,
  extractSubtitles as updatedExtractSubtitles,
  extractH3Contents as updatedExtractH3Contents,
  extractDataCategories as updatedExtractDataCategories,
  extractH5Contents as updatedExtractH5Contents
} from './handleUpdatedDatasets';

interface ProcessedGitHubDataset {
  titles?: {
    id: string;
    text: string;
  }[];
  subtitles?: {
    id: string;
    text: string;
  }[];
  dates?: {
    id: string;
    text: string;
  }[];
  dataCategories?: {
    id: string;
    text: string;
  }[];
  content?: string;
  h2Content?: string;
  h3Contents?: string[];
  h5Contents?: string[];
  name: string;
  path: string;
  type: string;
  sha?: string;
}

export default function DataAccessCards({ datasets, tier }: { datasets: GitHubDataset[], tier: string }) {
  const [processedDatasets, setProcessedDatasets] = useState<(ProcessedGitHubDataset | null)[]>([]);
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
            if (slug === 'dataset_1') {
              const fetchedContent = await fetchDatasetContent(slug, tier);
              const fetchedProcessedContent = await updatedProcessMarkdown(fetchedContent);
              const titles = updatedExtractTitles(fetchedProcessedContent);
              const h2Content = updatedExtractH2Content(fetchedProcessedContent);
              const subtitles = updatedExtractSubtitles(fetchedProcessedContent);
              const h3Contents = updatedExtractH3Contents(fetchedProcessedContent);
              const dataCategories = updatedExtractDataCategories(fetchedProcessedContent);
              const h5Contents = updatedExtractH5Contents(fetchedProcessedContent);
              return {
                ...dataset,
                titles,
                subtitles,
                dataCategories,
                h2Content,
                h3Contents,
                h5Contents
              };
            } else {
              const fetchedContent = await fetchDatasetContent(slug, tier);
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
            }
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
              {processedDatasets.length > 0 && processedDatasets.map(processedDataset => {
                if (!processedDataset) return null;
                return (
                  <article
                    key={processedDataset.sha}
                    className="overflow-hidden mb-2.5 p-2 w-full bg-white rounded border border-solid border-neutral-300"
                  >
                    {processedDataset.name === 'dataset_1.md' ? (
                      <UpdatedDatasetBody
                        title={processedDataset.titles?.[0].text || ''}
                        subtitles={processedDataset.subtitles || []}
                        dataCategories={processedDataset.dataCategories || []}
                        h2Content={processedDataset.h2Content || ''}
                        h3Contents={processedDataset.h3Contents || []}
                        h5Contents={processedDataset.h5Contents || []}
                      />
                    ) : (
                      <>
                        <DatasetHeader
                          title={processedDataset.titles?.[0]?.text || ''}
                          date={processedDataset.dates?.[0]?.text || ''}
                          subtitle={processedDataset.subtitles?.[0]?.text || ''}
                        />
                        <DatasetContent content={processedDataset.content || ''} />
                      </>
                    )}
                  </article>
                );
              })}
            </div>
            <footer className="flex gap-10 pt-3.5 pb-0 w-full border-slate-300 border-t-[3px] max-md:max-w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
