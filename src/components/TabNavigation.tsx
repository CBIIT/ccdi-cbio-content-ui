'use client';
import * as React from 'react';
import { TabItem } from './TabItem';

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTabId,
  onTabChange
}) => {
  const [internalActiveTab, setInternalActiveTab] = React.useState(
    activeTabId || tabs[0]?.id || ''
  );

  const currentActiveTab = activeTabId || internalActiveTab;

  const handleTabClick = (tabId: string) => {
    if (!activeTabId) {
      setInternalActiveTab(tabId);
    }
    onTabChange?.(tabId);
  };

  const handleKeyDown = (event: React.KeyboardEvent, tabId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTabClick(tabId);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const currentIndex = tabs.findIndex(tab => tab.id === currentActiveTab);
      const nextIndex = event.key === 'ArrowLeft'
        ? (currentIndex - 1 + tabs.length) % tabs.length
        : (currentIndex + 1) % tabs.length;
      handleTabClick(tabs[nextIndex].id);
    }
  };

  return (
    <nav
      className="flex relative gap-6 items-end self-stretch h-[88px] max-w-[1380px] max-md:flex-col max-md:h-auto max-sm:pb-5 max-sm:h-auto"
      role="tablist"
      aria-label="Dataset and Release Notes Navigation"
    >
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onKeyDown={(e) => handleKeyDown(e, tab.id)}
        >
          <TabItem
            isActive={currentActiveTab === tab.id}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </TabItem>
        </div>
      ))}
    </nav>
  );
};
