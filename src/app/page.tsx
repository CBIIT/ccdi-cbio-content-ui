'use client';

import { useEffect, useState } from 'react';
import { fetchGitHubData } from '@/utilities/data-fetching';
import { isDevEnv as checkIsDevEnv } from '@/utilities/environment';
import DatasetAndReleaseNotes from '@/components/DatasetAndReleaseNotes';

export interface GitHubRelease {
  name: string;
  path: string;
  type: string;
  releaseNotes?: GitHubReleaseNote[];
}

interface GitHubReleaseNote {
  name: string;
  path: string;
  type: string;
}

export interface GitHubDataset {
  name: string;
  path: string;
  type: string;
}

export default function Home() {
  const [releases, setReleases] = useState<GitHubRelease[]>([]);
  const [datasets, setDatasets] = useState<GitHubDataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (typeof window !== 'undefined') {
        const isDevEnv = checkIsDevEnv(window.location.hostname);
        setIsDev(isDevEnv);

        try {
          const { releases, datasets } = await fetchGitHubData(isDevEnv);
          setReleases(releases);
          setDatasets(datasets);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <DatasetAndReleaseNotes releases={releases} datasets={datasets} isDev={isDev} />
    </main>
  );
}
