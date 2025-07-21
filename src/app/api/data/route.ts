import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const isDev = searchParams.get('dev') === 'true';

  try {
    // Fetch releases
    const releasesResponse = await fetch(
      `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/releases${isDev ? '?ref=dev' : ''}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${process.env.CONTENT_API_TOKEN}`
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
          `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/releases/${year}${isDev ? '?ref=dev' : ''}`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              'Authorization': `Bearer ${process.env.CONTENT_API_TOKEN}`
            },
            next: { revalidate: 3600 }
          }
        );

        if (!releaseNotesResponse.ok) {
          throw new Error(`Failed to fetch release notes for Year ${year}`);
        }

        const releaseNotesData = await releaseNotesResponse.json();
        const releaseNotes = releaseNotesData.filter((item: { type: string; name: string }) => item.type === 'file' && item.name.endsWith('.md'));

        return {
          ...release,
          releaseNotes
        };
      })
    );

    // Fetch datasets
    const datasetsResponse = await fetch(
      `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/datasets${isDev ? '?ref=dev' : ''}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${process.env.CONTENT_API_TOKEN}`
        },
        next: { revalidate: 3600 }
      }
    );

    if (!datasetsResponse.ok) {
      throw new Error('Failed to fetch datasets');
    }

    const datasetsData = await datasetsResponse.json();
    const datasets = datasetsData.filter((item: { type: string; name: string }) => item.type === 'file' && item.name.endsWith('.md'));

    return NextResponse.json({
      releases: releasesWithReleaseNotes,
      datasets
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
