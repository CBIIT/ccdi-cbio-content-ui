'use client';

import { useState, FC, KeyboardEvent, useEffect } from 'react';
import { TabItem } from './TabItem';
import ReleaseNotes from './release-notes/ReleaseNotes';
import Dataset from './datasets/Dataset';
import { GitHubRelease, GitHubDataset } from '@/app/page';

const tabs = [
  {
    id: 'application-release-notes',
    label: 'Application Release Notes'
  },
  {
    id: 'dataset-updates',
    label: 'Dataset Updates'
  }
];

export const DatasetAndReleaseNotes: FC<{ releases: GitHubRelease[], datasets: GitHubDataset[], isDev: boolean }> = ({ releases, datasets, isDev }) => {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const [contentHeight, setContentHeight] = useState<number | undefined>(0);

  const handleContentHeight = () => {
    setContentHeight(document.querySelector('#main-content')?.scrollHeight);
    window.parent.postMessage(['setHeight', contentHeight], '*');
  };

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
    handleContentHeight();
  };

  const handleKeyDown = (event: KeyboardEvent, tabId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTabClick(tabId);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const currentIndex = tabs.findIndex(tab => tab.id === activeTabId);
      const nextIndex = event.key === 'ArrowLeft'
        ? (currentIndex - 1 + tabs.length) % tabs.length
        : (currentIndex + 1) % tabs.length;
      handleTabClick(tabs[nextIndex].id);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const height = document.querySelector('#main-content')?.scrollHeight;
      setContentHeight(height);
      window.parent.postMessage(['setHeight', height], '*');
    }, 2000);
  }, []);
  
  return (
    <>
      <h1 className="sr-only">Dataset and Release Notes</h1>
      <section className="flex relative flex-col gap-1.5 items-center self-stretch bg-sky-50 border-b border-solid border-b-cyan-600 h-[88px] max-sm:h-auto">
        <div className="flex relative flex-col gap-1.5 justify-end items-start self-stretch max-w-[1260px] mx-30 max-sm:mx-5">
          <nav
            className="flex relative gap-6 items-end self-stretch h-[88px] max-w-[1380px] max-md:flex-col max-sm:flex-row max-md:h-auto max-sm:h-auto"
            role="tablist"
            aria-label="Dataset and Release Notes Navigation"
          >
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onKeyDown={(e) => handleKeyDown(e, tab.id)}
              >
                <TabItem
                  isActive={activeTabId === tab.id}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {tab.label}
                </TabItem>
              </div>
            ))}
          </nav>
        </div>
      </section>
      <section>
        {activeTabId === tabs[0].id && <ReleaseNotes releases={releases} isDev={isDev} />}
        {activeTabId === tabs[1].id && <Dataset datasets={datasets} isDev={isDev} />}
      </section>
    </>
  );
};

export default DatasetAndReleaseNotes;
