import * as React from 'react';

interface ReleaseNotesHeaderProps {
  version: string;
  date: string;
}

export const ReleaseNotesHeader: React.FC<ReleaseNotesHeaderProps> = ({
  version,
  date,
}) => {
  return (
    <header className="w-full text-sky-800 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
        <h2 className="self-stretch my-auto text-base font-bold leading-none">
          {version}
        </h2>
        <time className="self-stretch my-auto text-sm leading-none">
          {date}
        </time>
      </div>
    </header>
  );
};
