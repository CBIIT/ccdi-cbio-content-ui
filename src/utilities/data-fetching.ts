import { getBranchName } from './configs';

async function fetchGitHubData() {
  try {
    // Fetch releases
    const releasesResponse = await fetch(
      `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/releases${getBranchName() === 'main' ? '' : `?ref=${getBranchName()}`}`,
      {
        headers: { 'Accept': 'application/vnd.github.v3+json' },
        next: { revalidate: 3600 }
      }
    );

    if (!releasesResponse.ok) {
      throw new Error('Failed to fetch releases');
    }

    const releasesData = await releasesResponse.json();
    const releases = releasesData.filter((item: { type: string }) => item.type === 'dir');

    // Fetch release notes for each release
    const releasesWithReleaseNotes = await Promise.all(
      releases.map(async (release: { name: string }) => {
        const year = release.name;
        const releaseNotesResponse = await fetch(
          `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/releases/${year}${getBranchName() === 'main' ? '' : `?ref=${getBranchName()}`}`,
          {
            headers: { 'Accept': 'application/vnd.github.v3+json' },
            next: { revalidate: 3600 }
          }
        );

        if (!releaseNotesResponse.ok) {
          throw new Error(`Failed to fetch release notes for Year ${year}`);
        }

        const releaseNotesData = await releaseNotesResponse.json();
        const releaseNotes = releaseNotesData.filter((item: { type: string; name: string }) => item.type === 'file' && item.name.endsWith('.md')).reverse();

        return {
          ...release,
          releaseNotes
        };
      })
    );

    // Fetch datasets
    const datasetsResponse = await fetch(
      `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/datasets${getBranchName() === 'main' ? '' : `?ref=${getBranchName()}`}`,
      {
        headers: { 'Accept': 'application/vnd.github.v3+json' },
        next: { revalidate: 3600 }
      }
    );

    if (!datasetsResponse.ok) {
      throw new Error('Failed to fetch datasets');
    }

    const datasetsData = await datasetsResponse.json();
    const datasets = datasetsData.filter((item: { type: string; name: string }) => item.type === 'file' && item.name.endsWith('.md'));

    return {
      releases: releasesWithReleaseNotes,
      datasets
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    throw error;
  }
}

const BASE_URL = `https://raw.githubusercontent.com/CBIIT/ccdi-cbio-content/refs/heads/${getBranchName()}/`;

async function fetchContent(filePath: string) {
  const response = await fetch(`${BASE_URL}${filePath}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch content from ${filePath}`);
  }

  const content = await response.text();
  return content;
}

export { fetchGitHubData, fetchContent };
