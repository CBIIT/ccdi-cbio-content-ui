'use client';
import * as React from 'react';

interface UpdatedDatasetBodyProps {
  title: string;
  subtitles: { id: string; text: string }[];
  dataCategories: { id: string; text: string }[];
  h2Content: string;
  h3Contents: string[];
  h5Contents: string[];
}

export const UpdatedDatasetBody: React.FC<UpdatedDatasetBodyProps> = ({
  title,
  subtitles,
  dataCategories,
  h2Content,
  h3Contents,
  h5Contents,
}) => {
  return (
    <>
      <header className="mb-1.5 w-full max-md:max-w-full">
        <div className="flex flex-wrap justify-between items-center w-full max-md:max-w-full">
          <h2 className="gap-1.5 self-stretch my-auto text-lg font-bold leading-none text-sky-800 min-w-60 w-[641px] max-md:max-w-full">
            {title}
          </h2>
          <section
            className="mt-1 w-full text-sm font-semibold leading-5 text-neutral-800 max-md:max-w-full"
            dangerouslySetInnerHTML={{ __html: h2Content }}
          >
          </section>
        </div>
      </header>
      {h3Contents.length > 0 && h3Contents.map((h3Content, index) => (
        <section key={subtitles[index].id} className="mb-3">
          <section>
            <h3 className="text-base font-semibold leading-none text-sky-800">
              <span>{subtitles[index].text}</span>
            </h3>
            <section
              className="mt-1 w-full text-sm font-semibold leading-5 text-neutral-800 max-md:max-w-full"
              dangerouslySetInnerHTML={{ __html: h3Content }}
            >
            </section>
          </section>
          {index === 2 && h5Contents.length > 0 && h5Contents.map((h5Content, i) => (
            <section key={dataCategories[i].id}>
              <h4 className="mt-2.5 text-sm font-semibold leading-none text-sky-800">
                <span>{dataCategories[i].text}</span>
              </h4>
              <section
                className="mt-1 w-full text-sm font-semibold leading-5 text-neutral-800 max-md:max-w-full"
                dangerouslySetInnerHTML={{ __html: h5Content }}
              >
              </section>
            </section>
          ))}
        </section>
      ))}
    </>
  );
};
