import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

function rehypeCustomTheme() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'a') {
        const LINK_CLASSES = [
          'text-[18px]', 'lg:text-[16px]',
          'font-[Poppins]',
          'font-semibold',
          'leading-[24px]', 'lg:leading-[16px]',
          'text-[rgba(69,82,153,1)]',
          'underline'
        ];
        node.properties = node.properties || {};
        node.properties.className = LINK_CLASSES;
        node.properties.target = '_blank';
      }
    });
  };
}

export async function processMarkdown(content: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeCustomTheme)
    .use(rehypeSlug)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return result.toString();
}

function extractElements(content: string, regex: RegExp): { id: string; text: string }[] {
  const elements: { id: string; text: string }[] = [];
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    elements.push({ id: match[1], text: match[2] });
  }

  return elements;
}

export function extractTitles(content: string): { id: string; text: string }[] {
  const regex = /<h2 id="([^"]+)"[^>]*>([^<]+)<\/h2>/g;

  return extractElements(content, regex);
}

export function extractSection1Content(content: string): string {
  if (!content.includes('</h2>')) {
		return '';
	}
  return content.split('</h2>')[1].trim().split('<h2')[0].trim() || '';
}

export function extractSection2Content(content: string): string {
  if (!content.includes('</h2>')) {
		return '';
	}
  return content.split('</h2>')[2].trim().split('<h2')[0].trim() || '';
}

export function extractSection3Content(content: string): string {
	if (!content.includes('</h2>')) {
		return '';
	}
  return content.split('</h2>')[3] || '';
}
