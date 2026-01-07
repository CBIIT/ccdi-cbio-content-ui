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
        node.properties.className = ['mt-1', 'mb-4', 'max-md:max-w-full'];
      }
      if (node.tagName === 'a') {
        node.properties = node.properties || {};
        node.properties.className = ['text-[rgba(69,82,153,1)]', 'underline'];
        node.properties.target = '_blank';
      }
      if (node.tagName === 'ol') {
        node.properties = node.properties || {};
        node.properties.className = ['list-decimal', 'list-outside', 'px-5', 'mb-3'];
      }
      if (node.tagName === 'ul') {
        node.properties = node.properties || {};
        node.properties.className = ['list-disc', 'list-outside', 'px-5', 'mb-3'];
      }
      if (node.tagName === 'li') {
        node.properties = node.properties || {};
        node.properties.className = ['mb-1'];
      }

      if (node.tagName === 'h2') {
        node.properties = node.properties || {};
        node.properties.className = [
          'gap-1.5', 'self-stretch', 'my-auto', 'text-lg', 'font-bold', 'leading-none', 'text-sky-800', 'min-w-60', 'w-[641px]', 'max-md:max-w-full'
        ];
      }

      if (node.tagName === 'h3') {
        node.properties = node.properties || {};
        node.properties.className = [
          'text-base', 'font-semibold', 'leading-none', 'text-sky-800'
        ];
      }

      if (node.tagName === 'h5') {
        // Convert h5 to h4 for consistency with the updated design (508 compliance)
        node.tagName = 'h4';
        node.properties = node.properties || {};
        node.properties.className = [
          'mt-2.5', 'text-sm', 'font-semibold', 'leading-none', 'text-sky-800'
        ];
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
