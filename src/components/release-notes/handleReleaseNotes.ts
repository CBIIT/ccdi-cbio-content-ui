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
      if (node.tagName === 'p') {
        node.properties = node.properties || {};
        node.properties.className = ['mb-3', 'max-md:max-w-full'];
      }
      if (node.tagName === 'a') {
        node.properties = node.properties || {};
        node.properties.className = ['text-[rgba(69,82,153,1)]', 'underline'];
        if (node.properties.href === 'dataset-updates') {
          node.properties.id = node.properties.href;
          node.properties.href = 'javascript:void(0);';
        } else {
          node.properties.target = '_blank';
        }
      }
      if (node.tagName === 'ul') {
        node.properties = node.properties || {};
        node.properties.className = ['list-disc', 'list-outside', 'px-5'];
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

export function extractDates(content: string): { id: string; text: string }[] {
  const regex = /<h3 id="([^"]+)"[^>]*>([^<]+)<\/h3>/g;

  return extractElements(content, regex);
}

export function extractContent(content: string): string {
  if (!content.includes('</h3>')) {
		return '';
	}
  return content.split('</h3>')[1] || '';
}
