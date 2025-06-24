'use client';

import { useEffect, useState } from 'react';
import { DatasetAndReleaseNotes } from '@/components/DatasetAndReleaseNotes';

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

async function fetchReleases(isDev: boolean) {
  const response = await fetch(
    `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/releases${isDev ? '?ref=dev' : ''}`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch releases');
  }

  const data: GitHubRelease[] = await response.json();
  return data.filter(item => item.type === 'dir');
}

async function fetchReleaseNotes(year: string, isDev: boolean) {
  const response = await fetch(
    `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/releases/${year}${isDev ? '?ref=dev' : ''}`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch release notes for Year ${year}`);
  }

  const data: GitHubReleaseNote[] = await response.json();
  return data.filter(item => item.type === 'file' && item.name.endsWith('.md'));
}

async function fetchDatasets(isDev: boolean) {
  const response = await fetch(
    `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/datasets${isDev ? '?ref=dev' : ''}`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch datasets');
  }

  const data: GitHubDataset[] = await response.json();
  return data.filter(item => item.type === 'file' && item.name.endsWith('.md'));
}

export default function Home() {
  const [releases, setReleases] = useState<GitHubRelease[]>([]);
  const [datasets, setDatasets] = useState<GitHubDataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      console.log(window)
      if (typeof window !== 'undefined') {
        const tierName = window.location.hostname.split('.')[0].split('-')[1];
        const isDevEnv = (process.env.NODE_ENV === 'development') || (tierName === 'dev') || (tierName === 'qa');
        console.log(tierName, isDevEnv)
        setIsDev(isDevEnv);

        try {
          const fetchedReleases = (await fetchReleases(isDevEnv)).reverse();
          const releasesWithReleaseNotes = await Promise.all(
            fetchedReleases.map(async (release) => ({
              ...release,
              releaseNotes: (await fetchReleaseNotes(release.name, isDevEnv)).reverse(),
            }))
          );
          const fetchedDatasets = await fetchDatasets(isDevEnv);
          setReleases(releasesWithReleaseNotes);
          setDatasets(fetchedDatasets);
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
    <main id="main-content">
      <DatasetAndReleaseNotes releases={releases} datasets={datasets} isDev={isDev} />
    </main>
  );
}
