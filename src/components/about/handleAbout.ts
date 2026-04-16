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
        const PARAGRAPH_CLASSES = [
          'text-[18px]', 'lg:text-[16px]',
          'font-[Inter]',
          'font-medium',
          'leading-[24px]', 'lg:leading-[22px]',
          'mb-3',
          'max-md:max-w-full'
        ];
        node.properties = node.properties || {};
        node.properties.className = PARAGRAPH_CLASSES;
      }
      if (node.tagName === 'a') {
        const LINK_CLASSES = [
          'text-[18px]', 'lg:text-[16px]',
          'font-[Inter]',
          'font-semibold',
          'leading-[24px]', 'lg:leading-[22px]',
          'text-[rgba(69,82,153,1)]',
          'underline'
        ];
        if (node.properties.href.includes('mailto:')) {
          LINK_CLASSES.push('wrap-break-word');
        }
        node.properties = node.properties || {};
        node.properties.className = LINK_CLASSES;
        node.properties.target = '_blank';
      }
      if (node.tagName === 'ul') {
        const LIST_CLASSES = [
          'list-disc', 'list-outside',
          'px-5', 'my-8'
        ];
        node.properties = node.properties || {};
        node.properties.className = LIST_CLASSES;
      }
			if (node.tagName === 'li') {
        const LIST_ITEM_CLASSES = [
          'text-[18px]', 'lg:text-[16px]',
          'font-[Inter]',
          'font-medium',
          'leading-[24px]', 'lg:leading-[22px]',
          'ml-1'
        ];
        node.properties = node.properties || {};
        node.properties.className = LIST_ITEM_CLASSES;
      }
      if (node.tagName === 'h2') {
        const TITLE_CLASSES = [
          'text-[25px]', 'lg:text-[22px]',
          'font-[Poppins]',
          'font-normal',
          'leading-[26px]',
          'tracking-[-0.05px]', 'lg:tracking-[-0.044px]',
          'text-[#05555C]',
          'mt-10', 'lg:mt-15',
          'mb-2', 'flex', 'items-center'
        ];
        node.properties = node.properties || {};
        node.properties.className = TITLE_CLASSES;
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
