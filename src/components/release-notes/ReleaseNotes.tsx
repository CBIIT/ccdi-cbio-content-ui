import * as React from 'react';
import { ReleaseNotesCard } from './ReleaseNotesCard';

function ReleaseNotes() {
  return (
    <div className="overflow-hidden">
      <div className="flex overflow-hidden gap-2.5 justify-center items-start w-full bg-white max-md:max-w-full">
        <div className="flex justify-center items-start pt-5 max-w-[1260px] min-h-[1795px] min-w-60 w-[960px]">
          <div className="px-2.5 pt-1.5 pb-16 min-w-60 w-[960px] max-md:max-w-full">
            <ReleaseNotesCard />
            <footer className="flex gap-10 pt-3.5 pb-3 mt-2.5 w-full border-slate-300 border-t-[3px] min-h-[63px] max-md:max-w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReleaseNotes;
