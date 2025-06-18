import { FC } from 'react';

export const ReleaseNotesContent: FC<{ content: string }> = ({ content }) => {
  return (
    <section
      className="pt-0.5 mt-1 w-full text-sm font-semibold text-neutral-800 max-md:max-w-full"
      dangerouslySetInnerHTML={{ __html: content }}
    ></section>
  );
};
