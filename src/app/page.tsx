'use client';

import { useEffect, useState } from 'react';
import { fetchGitHubData } from '@/utilities/data-fetching';
import DatasetAndReleaseNotes from '@/components/DatasetAndReleaseNotes';
import { GitHubRelease, GitHubDataset } from '@/utilities/configs';

export default function Home() {
  const [releases, setReleases] = useState<GitHubRelease[]>([]);
  const [datasets, setDatasets] = useState<GitHubDataset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { releases, datasets } = await fetchGitHubData();
        setReleases(releases);
        setDatasets(datasets);
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
    <main>
      <DatasetAndReleaseNotes releases={releases} datasets={datasets} />
    </main>
  );
}
