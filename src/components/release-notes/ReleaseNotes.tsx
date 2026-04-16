'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { fetchContent } from '@/utilities/data-fetching';
import { useModules } from '@/components/modules/ModulesProvider';
import { processMarkdown } from './handleReleaseNotes';

type ProcessedReleaseNotesModule = {
  fetchedProcessedContent: string;
  title: string;
  id: string;
  path: string;
};

export default function ReleaseNotes({ handleTabClick }: {
  handleTabClick: (tabId: string) => void
}) {
  const { releases } = useModules();
  const releaseNotesModules = useMemo(
    () => Object.values(releases).flat().reverse(),
    [releases]
  );

  const [releaseNotes, setReleaseNotes] = useState<ProcessedReleaseNotesModule[]>([]);
  const [loading, setLoading] = useState(true);

  // Dynamic refs: one per rendered release note container
  const mainContentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const formattedReleaseNotes = await Promise.all(
          releaseNotesModules.map(async module => {
            const fetchedContent = await fetchContent(module.path);
            const [headerContent, afterHeader] = fetchedContent.split('</div>');
            const isHtmlIncluded = !!afterHeader;
            const fetchedProcessedContent = await processMarkdown(fetchedContent);
            const combinedContent = isHtmlIncluded
              ? headerContent + '</div>' + fetchedProcessedContent
              : fetchedProcessedContent;

            return { ...module, fetchedProcessedContent: combinedContent };
          })
        );
        setReleaseNotes(formattedReleaseNotes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [releaseNotesModules]);

  useEffect(() => {
    if (loading) return;

    const boundElements = new WeakSet<Element>();
    const refs = mainContentRefs.current;

    // Use event delegation to avoid duplicate listeners
    const delegateClick = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const clickable = target.closest('.dataset-updates');
      if (clickable) {
        handleTabClick('dataset-updates');
      }
    };

    refs.forEach(mainContentRef => {
      if (!mainContentRef) return;
      
      // Add single delegated listener per container
      if (!boundElements.has(mainContentRef)) {
        mainContentRef.addEventListener('click', delegateClick);
        boundElements.add(mainContentRef);
      }
    });

    return () => {
      refs.forEach(mainContentRef => {
        if (mainContentRef && boundElements.has(mainContentRef)) {
          mainContentRef.removeEventListener('click', delegateClick);
        }
      });
    };
  }, [loading, handleTabClick]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-hidden">
      <div className="flex overflow-hidden gap-2.5 justify-center items-start w-full bg-white max-md:max-w-full">
        <div className="flex justify-center items-start pt-5 max-w-[1260px] min-w-60 w-[960px]">
          <div className="px-2.5 pt-1.5 pb-0 min-w-60 w-[960px] max-md:max-w-full">
            {releaseNotes.length > 0 && releaseNotes.map((releaseNote, index) => {
              if (!releaseNote) return null;
              return (
                <article key={releaseNote.id} className="w-full mb-2.5">
                  <div
                    ref={el => { mainContentRefs.current[index] = el; }}
                    className="p-2 w-full text-sm font-semibold text-neutral-800 bg-white rounded border border-solid border-neutral-300"
                    dangerouslySetInnerHTML={{ __html: releaseNote.fetchedProcessedContent }}
                  >
                  </div>
                </article>
              );
            })}
            <footer className="flex gap-10 pt-3.5 pb-0 w-full border-slate-300 border-t-[3px] max-md:max-w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
