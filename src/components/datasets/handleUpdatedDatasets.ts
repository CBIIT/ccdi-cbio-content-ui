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
        node.properties.target = '_blank';
      }
      if (node.tagName === 'ol') {
        node.properties = node.properties || {};
        node.properties.className = ['list-decimal', 'list-outside', 'px-5', 'mb-2'];
      }
      if (node.tagName === 'ul') {
        node.properties = node.properties || {};
        node.properties.className = ['list-disc', 'list-outside', 'px-5', 'mb-2'];
      }
      if (node.tagName === 'li') {
        node.properties = node.properties || {};
        node.properties.className = ['mb-1'];
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

export function extractH2Content(content: string): string {
  if (!content.includes('</h2>')) {
		return '';
	}
  return content.split('</h2>')[1].trim().split('<h3')[0].trim() || '';
}

export function extractSubtitles(content: string): { id: string; text: string }[] {
  const regex = /<h3 id="([^"]+)"[^>]*>([^<]+)<\/h3>/g;

  return extractElements(content, regex);
}

// Extracts the content of all H3 headings purely
export function extractH3Contents(content: string): string[] {
  if (!content.includes('</h3>')) {
		return [];
	}
  const h3Contents = content.split('</h3>');
  const updatedH3Contents = [];
  for (let i = 1; i < h3Contents.length; i++) {
    if (i === 3) {
      // Handle the h3 content which contains h5 contents (TODO: A special case, not widely used)
      h3Contents[i] = h3Contents[i].trim().split('<h5')[0].trim();
    } else {
      h3Contents[i] = h3Contents[i].trim().split('<h3')[0].trim();
    }
    updatedH3Contents.push(h3Contents[i]);
  }

  return updatedH3Contents;
}

export function extractDataCategories(content: string): { id: string; text: string }[] {
  const regex = /<h5 id="([^"]+)"[^>]*>([^<]+)<\/h5>/g;

  return extractElements(content, regex);
}

// Extracts the content of all H5 headings purely
export function extractH5Contents(content: string): string[] {
  if (!content.includes('</h5>')) {
		return [];
	}
  const h5Contents = content.split('</h5>');
  const updatedH5Contents = [];
  for (let i = 1; i < h5Contents.length - 1; i++) {
    h5Contents[i] = h5Contents[i].trim().split('<h5')[0].trim();
    updatedH5Contents.push(h5Contents[i]);
  }

  return [...updatedH5Contents, h5Contents[h5Contents.length - 1].trim().split('<h3')[0].trim()];
}
