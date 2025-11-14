'use client';

import { useEffect, useState } from 'react';
import { fetchGitHubData } from '@/utilities/data-fetching';
import { getTierName } from '@/utilities/environment';
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
  const [tier, setTier] = useState('dev');

  useEffect(() => {
    const loadData = async () => {
      if (typeof window !== 'undefined') {
        const tierName = getTierName(window.location.hostname);
        setTier(tierName);

        try {
          const { releases, datasets } = await fetchGitHubData(tierName);
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
      <DatasetAndReleaseNotes releases={releases} datasets={datasets} tier={tier} />
    </main>
  );
}
