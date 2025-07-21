import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get('year');
  const slug = searchParams.get('slug');
  const isDev = searchParams.get('dev') === 'true';

  if (!year || !slug) {
    return NextResponse.json(
      { error: 'Year and slug parameters are required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/CBIIT/ccdi-cbio-content/contents/releases/${year}/${slug}.md${isDev ? '?ref=dev' : ''}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3.raw',
          'Authorization': `Bearer ${process.env.CONTENT_API_TOKEN}`
        },
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch release note content');
    }

    const content = await response.text();

    return NextResponse.json({
      content
    });
  } catch (error) {
    console.error('Error fetching release note content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch release note content' },
      { status: 500 }
    );
  }
}
