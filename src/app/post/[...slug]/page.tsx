import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import Breadcrumb from '@/components/Breadcrumb';

function rehypeCustomTheme() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'h1') {
        node.properties = node.properties || {};
        node.properties.className = ['text-4xl', 'font-bold', 'my-6', 'text-[#49B5B1]'];
      }
      if (node.tagName === 'p') {
        node.properties = node.properties || {};
        node.properties.className = ['text-base', 'leading-7', 'mb-4'];
      }
      if (node.tagName === 'a') {
        node.properties = node.properties || {};
        node.properties.className = ['text-blue-500', 'hover:underline'];
      }
    });
  };
}

function rehypeCustomTheme2() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'h1') {
        node.properties = node.properties || {};
        node.properties.className = ['text-4xl', 'font-bold', 'my-6', 'text-[#49B5B1]'];
      }
      if (node.tagName === 'p') {
        node.properties = node.properties || {};
        node.properties.className = ['text-base', 'leading-7', 'mb-4'];
      }
      if (node.tagName === 'a') {
        node.properties = node.properties || {};
        node.properties.className = ['text-blue-500', 'hover:underline'];
      }
    });
  };
}

async function fetchContent(slug: string) {
  const response = await fetch(
    `https://api.github.com/repos/CBIIT/ccdi-ods-content/contents/pages/${slug}.md`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3.raw',
      },
      next: { revalidate: 3600 }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch content');
  }

  const content = await response.text();
  return content;
}

async function processMarkdown(content: string, slug: string) {
  const theme = slug.split('/')[0] === 'program' ? rehypeCustomTheme : rehypeCustomTheme2;
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(theme)
    .use(rehypeSlug)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return result.toString();
}

function extractHeadings(content: string): { id: string; text: string }[] {
  const headings: { id: string; text: string }[] = [];
  const regex = /<h2 id="([^"]+)"[^>]*>([^<]+)<\/h2>/g;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    headings.push({ id: match[1], text: match[2] });
  }
  
  return headings;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Post(props: any) {
  const { params } = props;
  const slug = params.slug.join('/');
  const [collection, page] = params.slug;
  const content = await fetchContent(slug);
  const processedContent = await processMarkdown(content, slug);
  const headings = extractHeadings(processedContent);

  return (
    <div className="flex flex-col items-stretch px-20 pb-14 pt-3 max-md:px-5 max-w-[1444px] mx-auto min-h-screen">
      <Breadcrumb collection={collection} page={page} />
      <div className="flex flex-row gap-8 relative">
        {/* Side Navigation */}
        <nav className="mt-10 w-64 flex-shrink-0 sticky top-10 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <div className="border-l-[2.25px] border-[#49B5B1] p-4">
            <ul className="space-y-3 pl-4">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    className="text-gray-600 hover:text-blue-600 text-sm block transition-colors"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        {/* Main Content */}
        <main className="flex-1 max-w-4xl p-6">
          <div 
            className="prose lg:prose-xl"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        </main>
      </div>
    </div>
  );
}