import * as React from 'react';
import { ReleaseNotesHeader } from './ReleaseNotesHeader';
import { ReleaseNotesContent } from './ReleaseNotesContent';

export const ReleaseNotesCard: React.FC = () => {
  return (
    <article className="w-full">
      <div className="p-2 w-full bg-white rounded border border-solid border-neutral-300">
        <ReleaseNotesHeader version="Version v.1.4" date="May 1, 2025" />
        <ReleaseNotesContent />
      </div>
    </article>
  );
};
