'use client';

import { useEffect, useState } from 'react';
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

async function fetchData(isDev: boolean) {
  const response = await fetch(`/api/data?dev=${isDev}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  return data;
}

export default function Home() {
  const [releases, setReleases] = useState<GitHubRelease[]>([]);
  const [datasets, setDatasets] = useState<GitHubDataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (typeof window !== 'undefined') {
        const isDevEnv = (process.env.NODE_ENV === 'development') || !!window.location.search;
        setIsDev(isDevEnv);

        try {
          const { releases, datasets } = await fetchData(isDevEnv);
          setReleases(releases.reverse());
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
