'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';

// ==========================
// Interfaces
// ==========================
interface GithubCollection {
  name: string;
  path: string;
  type: string;
  posts?: GithubPost[];
}

interface GithubPost {
  name: string;
  path: string;
  type: string;
  content?: string; // Added content property
}

interface PostWithCollection extends GithubPost {
  collectionName: string;
}

// ==========================
// Fetch Helpers
// ==========================

// Fetch top-level collections (directories under pages/)
async function fetchCollections() {
  const response = await fetch(
    'https://api.github.com/repos/CBIIT/ccdi-ods-content/contents/pages',
    {
      headers: { 'Accept': 'application/vnd.github.v3+json' },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch collections');
  }

  const data: GithubCollection[] = await response.json();
  return data.filter(item => item.type === 'dir');
}

// Fetch posts under a collection
async function fetchPosts(collectionPath: string): Promise<GithubPost[]> {
  const response = await fetch(
    `https://api.github.com/repos/CBIIT/ccdi-ods-content/contents/pages/${collectionPath}`,
    {
      headers: { 'Accept': 'application/vnd.github.v3+json' },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch posts for ${collectionPath}`);
  }

  const items: GithubPost[] = await response.json();

  // For each item inside the collection
  const posts: GithubPost[] = [];
  for (const item of items) {
    if (item.type === 'file' && item.name.endsWith('.md')) {
      const postResonse = await fetch(
        `https://api.github.com/repos/CBIIT/ccdi-ods-content/contents/${item.path}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3.raw',
          },
          next: { revalidate: 3600 }
        }
      );
      if (postResonse.ok) {
        const content = await postResonse.text();
        const post: GithubPost = {
          ...item,
          content,
        };
        posts.push(post);
      }
    } 
  }
  return posts;
}


// ==========================
// SearchPage Component
// ==========================
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [collections, setCollections] = useState<GithubCollection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedCollections = await fetchCollections();
        const collectionsWithPosts = await Promise.all(
          fetchedCollections.map(async (collection) => ({
            ...collection,
            posts: await fetchPosts(collection.name),
          }))
        );
        setCollections(collectionsWithPosts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Flatten posts and add collection context
  const allPosts: PostWithCollection[] = collections.flatMap(collection =>
    (collection.posts || []).map(post => ({
      ...post,
      collectionName: collection.name
    }))
  );
  console.log(allPosts);
  const fuse = new Fuse(allPosts, {
    keys: ['name','content'],
    includeScore: true,
    threshold: 0.2,
    ignoreLocation: true,
    shouldSort: true, 
    findAllMatches: true,
    useExtendedSearch: true,
  });

  const searchResults = query ? fuse.search(query) : [];

  // Group results by collection
  const groupedResults = searchResults.reduce((acc, result) => {
    const post = result.item;
    if (!acc[post.collectionName]) {
      acc[post.collectionName] = [];
    }
    acc[post.collectionName].push(post);
    return acc;
  }, {} as Record<string, PostWithCollection[]>);

  if (loading) {
    return <div className="max-w-4xl mx-auto p-6">Loading...</div>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          ← Back to Home
        </Link>
      </div>

      <form action="/search" method="GET" className="mb-6">
        <input
          type="text"
          name="q"
          placeholder="Search documentation..."
          defaultValue={query}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>

      <h1 className="text-4xl font-bold mb-6">Search Results</h1>
      <p className="mb-6">Showing results for: &quot;{query}&quot;</p>

      {Object.keys(groupedResults).length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid gap-6">
          {Object.entries(groupedResults).map(([collectionName, posts]) => (
            <article key={collectionName} className="border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">
                <Link href={`/collection/${collectionName}`} className="hover:text-blue-600">
                  {collectionName.charAt(0).toUpperCase() + collectionName.slice(1)}
                </Link>
              </h2>
              <ul className="space-y-2 ml-4">
                {posts.map((post) => (
                  <li key={post.path}>
                    <Link
                      href={`/post/${collectionName}/${post.name.replace('.md', '')}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {post.name.replace('.md', '').replace(/-/g, ' ')}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto p-6">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
