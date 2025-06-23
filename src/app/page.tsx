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

export const isDev = (process.env.NODE_ENV === 'development')
  || (window?.location.hostname.split('.')[0].split('-')[1] === 'dev')
  || (window?.location.hostname.split('.')[0].split('-')[1] === 'qa');

async function fetchReleases() {
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

async function fetchReleaseNotes(year: string) {
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

async function fetchDatasets() {
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

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedReleases = (await fetchReleases()).reverse();
        const releasesWithReleaseNotes = await Promise.all(
          fetchedReleases.map(async (release) => ({
            ...release,
            releaseNotes: (await fetchReleaseNotes(release.name)).reverse(),
          }))
        );
        const fetchedDatasets = await fetchDatasets();
        setReleases(releasesWithReleaseNotes);
        setDatasets(fetchedDatasets);
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
    <main id="main-content">
      <DatasetAndReleaseNotes releases={releases} datasets={datasets} />
    </main>
  );
}
