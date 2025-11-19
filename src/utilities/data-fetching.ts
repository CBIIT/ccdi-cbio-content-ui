function getValidatedToken() {
  const token = process.env.NEXT_PUBLIC_CONTENT_API_TOKEN;
  if (!token) {
    throw new Error('NEXT_PUBLIC_CONTENT_API_TOKEN is not configured');
  }
  return token;
}

async function fetchGitHubData(tier: string = 'dev') {
  const token = getValidatedToken();

  try {
    // Fetch releases
    const releasesResponse = await fetch(
      `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/releases${tier === 'prod' ? '' : `?ref=${tier}`}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${token}`
        },
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
          `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/releases/${year}${tier === 'prod' ? '' : `?ref=${tier}`}`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              'Authorization': `Bearer ${token}`
            },
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
      `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/datasets${tier === 'prod' ? '' : `?ref=${tier}`}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${token}`
        },
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

async function fetchAboutData(tier: string = 'dev') {
  const token = getValidatedToken();

  try {
    const response = await fetch(
      `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/about${tier === 'prod' ? '' : `?ref=${tier}`}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${token}`
        },
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch about files');
    }

    const aboutFiles = await response.json();
    const aboutFile = aboutFiles.find((file: { name: string }) => file.name === 'about.md');
    
    if (aboutFile) {
      const contentResponse = await fetch(
        `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/about/about.md${tier === 'prod' ? '' : `?ref=${tier}`}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3.raw',
            'Authorization': `Bearer ${token}`
          },
          next: { revalidate: 3600 }
        }
      );

      if (!contentResponse.ok) {
        throw new Error('Failed to fetch about content');
      }

      const content = await contentResponse.text();
      return { aboutFiles: [aboutFile], content };
    }

    return { aboutFiles: [], content: '' };
  } catch (error) {
    console.error('Error fetching about data:', error);
    throw error;
  }
}

async function fetchDataUsingData(tier: string = 'dev') {
  const token = getValidatedToken();

  try {
    const response = await fetch(
      `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/data-using${tier === 'prod' ? '' : `?ref=${tier}`}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${token}`
        },
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data using files');
    }

    const dataUsingFiles = await response.json();
    const dataUsingFile = dataUsingFiles.find((file: { name: string }) => file.name === 'data_using.md');
    
    if (dataUsingFile) {
      const contentResponse = await fetch(
        `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/data-using/data_using.md${tier === 'prod' ? '' : `?ref=${tier}`}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3.raw',
            'Authorization': `Bearer ${token}`
          },
          next: { revalidate: 3600 }
        }
      );

      if (!contentResponse.ok) {
        throw new Error('Failed to fetch data using content');
      }

      const content = await contentResponse.text();
      return { dataUsingFile, content };
    }

    return { dataUsingFile: null, content: '' };
  } catch (error) {
    console.error('Error fetching data using data:', error);
    throw error;
  }
}

async function fetchReleaseNoteContent(year: string, slug: string, tier: string = 'dev') {
  const token = getValidatedToken();

  try {
    const response = await fetch(
      `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/releases/${year}/${slug}.md${tier === 'prod' ? '' : `?ref=${tier}`}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3.raw',
          'Authorization': `Bearer ${token}`
        },
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch release note content');
    }

    const content = await response.text();
    return content;
  } catch (error) {
    console.error('Error fetching release note content:', error);
    throw error;
  }
}

async function fetchDatasetContent(slug: string, tier: string = 'dev') {
  const token = getValidatedToken();

  try {
    const response = await fetch(
      `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/datasets/${slug}.md${tier === 'prod' ? '' : `?ref=${tier}`}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3.raw',
          'Authorization': `Bearer ${token}`
        },
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch dataset content');
    }

    const content = await response.text();
    return content;
  } catch (error) {
    console.error('Error fetching dataset content:', error);
    throw error;
  }
}

export { 
  fetchGitHubData, 
  fetchAboutData, 
  fetchDataUsingData,
  fetchReleaseNoteContent, 
  fetchDatasetContent 
};
