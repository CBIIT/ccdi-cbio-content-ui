import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { getBranchName } from '@/utilities/configs';

function rehypeCustomTheme() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'a') {
        const LINK_CLASSES = [
          'text-[18px]', 'lg:text-[16px]',
          'font-[Poppins]', 'font-semibold',
          'leading-[24px]', 'lg:leading-[16px]',
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
      if (node.tagName === 'p') {
        const LINK_CLASSES = [
          'mb-5', 'lg:mb-6', 'w-full'
        ];
        if (node.children[0].tagName === 'em') {
          LINK_CLASSES.push(
            'flex', 'items-start', 'justify-center',
            'px-4', 'sm:px-6', 'lg:px-[50px]', 'py-0',
          )
        } else {
          LINK_CLASSES.push('lg:max-w-[984px]');
        }
        node.properties = node.properties || {};
        node.properties.className = LINK_CLASSES;
      }
      if (node.tagName === 'h2') {
        const LINK_CLASSES = [
          'font-[Poppins]', 'font-normal',
          'text-[25px]', 'lg:text-[22px]', 'text-[#05555c]',
          'leading-[26px]', 'tracking-[-0.05px]', 'lg:tracking-[-0.044px]',
          'pt-5', 'lg:pt-9', 'mb-5', 'lg:mb-6',
          'w-full', 'lg:max-w-[984px]'
        ];
        node.properties = node.properties || {};
        node.properties.className = LINK_CLASSES;
      }
      if (node.tagName === 'img') {
        const srcUrl = node.properties.src.split('/');
        // Replace the branch name with the correct one
        srcUrl.splice(5, 1, getBranchName());
        node.properties.src = srcUrl.join('/');
        const LINK_CLASSES = [
          'border', 'border-[#4a8497]', 'border-solid',
          'mx-auto', 'w-full', 'sm:min-h-[227px]',
          'max-w-[335px]', 'sm:max-w-[504px]', 'lg:max-w-[656px]',
          'lg:shadow-[2px_6px_15px_0_rgba(0,0,0,0.25)]',
        ];
        if (node.properties.alt.toLowerCase().includes('cbioportal clinical data tab')) {
          LINK_CLASSES.push('mb-[15px]');
        }
        node.properties = node.properties || {};
        node.properties.className = LINK_CLASSES;
      }
      if (node.tagName === 'em') {
        const LINK_CLASSES = [
          'text-left', 'lg:text-center',
          'text-[18px]', 'lg:text-[16px]',
          'leading-[24px]', 'lg:leading-[22px]',
          'max-w-full', 'lg:max-w-[784px]'
        ];
        node.properties = node.properties || {};
        node.properties.className = LINK_CLASSES;
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
