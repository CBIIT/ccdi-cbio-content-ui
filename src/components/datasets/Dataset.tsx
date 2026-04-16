'use client';

import { useState, useEffect } from 'react';
import { fetchContent } from '@/utilities/data-fetching';
import { useModules } from '@/components/modules/ModulesProvider';

import { processMarkdown } from './handleDatasets';

interface ProcessedDatasetsModule {
  fetchedProcessedContent: string,
  title: string;
  id: string;
  path: string;
}

export default function DataAccessCards() {
  const { datasets: datasetsModules } = useModules();
  const [processedDatasets, setProcessedDatasets] = useState<ProcessedDatasetsModule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const formattedDatasets = await Promise.all(
          datasetsModules.map(async module => {
            const fetchedContent = await fetchContent(module.path);
            const fetchedProcessedContent = await processMarkdown(fetchedContent);
            return { ...module, fetchedProcessedContent };
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
  }, [datasetsModules]);

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
                    key={processedDataset.id}
                    className="overflow-hidden mb-2.5 p-2 w-full bg-white rounded border border-solid border-neutral-300"
                  >
                    <section
                      className="w-full text-sm font-semibold leading-5 text-neutral-800 max-md:max-w-full"
                      dangerouslySetInnerHTML={{ __html: processedDataset.fetchedProcessedContent }}
                    >
                    </section>
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
