'use client';

import { useState, useEffect, useRef } from 'react';
import { fetchReleaseNoteContent } from '@/utilities/data-fetching';
import { ReleaseNotesHeader } from './ReleaseNotesHeader';
import { ReleaseNotesContent } from './ReleaseNotesContent';
import { GitHubRelease } from '@/app/page';
import {
  processMarkdown,
  extractTitles,
  extractDates,
  extractContent
} from './handleReleaseNotes';

interface ProcessedGitHubReleaseNotes {
  titles: {
    id: string;
    text: string;
  }[];
  dates: {
    id: string;
    text: string;
  }[];
  content: string;
  name: string;
  path: string;
  type: string;
  sha?: string;
}

export default function ReleaseNotes({ releases, isDev, handleTabClick }: {
  releases: GitHubRelease[],
  isDev: boolean,
  handleTabClick: (tabId: string) => void
}) {
  const flattenedReleasesWithReleaseNotes = releases.map(release => release.releaseNotes).flat();
  const [releaseNotes, setReleaseNotes] = useState<(ProcessedGitHubReleaseNotes | null)[]>([]);
  const [loading, setLoading] = useState(true);

  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const formattedReleaseNotes = await Promise.all(
          flattenedReleasesWithReleaseNotes.map(async releaseNote => {
            const year = releaseNote?.path.split('/')[1];
            const slug = releaseNote?.name.replace('.md', '');
            if (!year || !slug) {
              return null;
            }
            const fetchedContent = await fetchReleaseNoteContent(year, slug, isDev);
            const fetchedProcessedContent = await processMarkdown(fetchedContent);
            const titles = extractTitles(fetchedProcessedContent);
            const dates = extractDates(fetchedProcessedContent);
            const content = extractContent(fetchedProcessedContent);
            return {
              ...releaseNote,
              titles,
              dates,
              content
            };
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
  }, []);

  useEffect(() => {
    if (!loading) {
      const observer = new ResizeObserver(() => {
        const wrapper = mainContentRef.current?.querySelector('#dataset-updates');
        wrapper?.addEventListener('click', () => {
          handleTabClick('dataset-updates');
        });
      });
      if (mainContentRef.current) {
        observer.observe(mainContentRef.current);
      }
      return () => {
        observer.disconnect();
      };
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-hidden">
      <div className="flex overflow-hidden gap-2.5 justify-center items-start w-full bg-white max-md:max-w-full">
        <div className="flex justify-center items-start pt-5 max-w-[1260px] min-w-60 w-[960px]">
          <div className="px-2.5 pt-1.5 pb-0 min-w-60 w-[960px] max-md:max-w-full">
            {releaseNotes.length > 0 && releaseNotes.map(releaseNote => (
              <article key={releaseNote?.sha} className="w-full mb-2.5">
                <div ref={mainContentRef} className="p-2 w-full bg-white rounded border border-solid border-neutral-300">
                  <ReleaseNotesHeader
                    version={releaseNote?.titles[0].text || ''}
                    date={releaseNote?.dates[0].text || ''}
                  />
                  <ReleaseNotesContent content={releaseNote?.content || ''} />
                </div>
              </article>
            ))}
            <footer className="flex gap-10 pt-3.5 pb-0 w-full border-slate-300 border-t-[3px] max-md:max-w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
