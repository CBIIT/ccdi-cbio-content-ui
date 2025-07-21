import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const isDev = searchParams.get('dev') === 'true';

  try {
    // Fetch about files list
    const aboutsResponse = await fetch(
      `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/about${isDev ? '?ref=dev' : ''}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${process.env.CONTENT_API_TOKEN}`
        },
        next: { revalidate: 3600 }
      }
    );

    if (!aboutsResponse.ok) {
      throw new Error('Failed to fetch about files');
    }

    const aboutsData = await aboutsResponse.json();
    const aboutFiles = aboutsData.filter((item: { type: string; name: string }) => item.type === 'file' && item.name.endsWith('.md'));

    // Fetch content
    const contentResponse = await fetch(
      `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/about/about.md${isDev ? '?ref=dev' : ''}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3.raw',
          'Authorization': `Bearer ${process.env.CONTENT_API_TOKEN}`
        },
        next: { revalidate: 3600 }
      }
    );

    if (!contentResponse.ok) {
      throw new Error('Failed to fetch about content');
    }

    const content = await contentResponse.text();

    return NextResponse.json({
      aboutFiles,
      content
    });
  } catch (error) {
    console.error('Error fetching about data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about data' },
      { status: 500 }
    );
  }
}
