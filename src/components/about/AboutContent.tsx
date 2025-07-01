import { FC } from 'react';

export const AboutContent: FC<{ content: string }> = ({
  content
}) => {
  return (
    <section
      className="pt-0.5 mt-1 w-full text-sm font-semibold leading-5 text-neutral-800 max-md:max-w-full"
      dangerouslySetInnerHTML={{ __html: content }}
    >
    </section>
  );
};
