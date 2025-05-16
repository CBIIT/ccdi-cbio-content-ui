import Link from 'next/link';

interface GithubContent {
  name: string;
  path: string;
  sha: string;
}

async function fetchGithubPosts(slug: string) {
  const response = await fetch(
    `https://api.github.com/repos/CBIIT/ccdi-ods-content/contents/pages/${slug}`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  const data: GithubContent[] = await response.json();
  return data
    .filter(file => file.name.endsWith('.md'))
    .map(file => ({
      id: file.sha,
      title: file.name.replace('.md', ''),
      slug: file.path.replace('pages/', '').replace('.md', '')
    }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function PostsList(props : any) {
  const { params } = props;
  const slug = params.slug.join('/');
  const posts = await fetchGithubPosts(slug);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Policy Documents</h1>
      
      <div className="grid gap-4">
        {posts.map((post) => (
          <article 
            key={post.id} 
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <Link href={`/post/${post.slug}`}>
              <h2 className="text-xl font-semibold hover:text-blue-500">
                {post.title}
              </h2>
            </Link>
          </article>
        ))}
      </div>
      
      <div className="mt-6">
        <Link 
          href="/" 
          className="text-blue-500 hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}