'use client';

import { useState, useEffect } from 'react';
import { ReleaseNotesHeader } from './ReleaseNotesHeader';
import { ReleaseNotesContent } from './ReleaseNotesContent';
import { GitHubRelease } from '@/app/page';
import {
  processMarkdown,
  extractTitles,
  extractDates,
  extractContent
} from '@/app/release-notes/handleReleaseNotes';

async function fetchContent(year: string, slug: string) {
  const response = await fetch(
    `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/releases/${year}/${slug}.md`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3.raw',
      },
      next: { revalidate: 3600 }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch releases');
  }

  const content = await response.text();
  return content;
}

export default function ReleaseNotes({ releases }: { releases: GitHubRelease[] }) {
  const flattenedReleasesWithReleaseNotes = releases.map(release => release.releaseNotes).flat();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [releaseNotes, setReleaseNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
            const fetchedContent = await fetchContent(year, slug);
            const fetchedProcessedContent = await processMarkdown(fetchedContent);
            const titles = extractTitles(fetchedProcessedContent);
            const dates = extractDates(fetchedProcessedContent);
            const content = extractContent(fetchedProcessedContent)
            return {
              ...releaseNote,
              titles,
              dates,
              content
            }
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-hidden">
      <div className="flex overflow-hidden gap-2.5 justify-center items-start w-full bg-white max-md:max-w-full">
        <div className="flex justify-center items-start pt-5 max-w-[1260px] min-w-60 w-[960px]">
          <div className="px-2.5 pt-1.5 pb-16 min-w-60 w-[960px] max-md:max-w-full">
            {releaseNotes.length > 0 && releaseNotes.map(releaseNote => (
              <article key={releaseNote.sha} className="w-full mb-2.5">
                <div className="p-2 w-full bg-white rounded border border-solid border-neutral-300">
                  <ReleaseNotesHeader
                    version={releaseNote.titles[0].text}
                    date={releaseNote.dates[0].text}
                  />
                  <ReleaseNotesContent content={releaseNote.content} />
                </div>
              </article>
            ))}
            <footer className="flex gap-10 pt-3.5 pb-3 w-full border-slate-300 border-t-[3px] min-h-[63px] max-md:max-w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
