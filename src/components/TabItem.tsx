'use client';
import * as React from 'react';

interface TabItemProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export const TabItem: React.FC<TabItemProps> = ({
  children,
  isActive = false,
  onClick
}) => {
  return (
    <button
      className={`flex relative gap-2.5 justify-center items-end px-6 py-5 rounded-tl-md rounded-tr-md border-t border-r border-l border-solid border-t-cyan-600 border-x-cyan-600 transition-colors duration-200 hover:cursor-pointer ${
        isActive ? 'bg-white' : ''
      }`}
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
    >
      <span
        className={`relative text-2xl leading-6 text-neutral-700 max-md:text-xl max-sm:text-lg ${
          isActive ? 'font-bold text-neutral-700' : 'font-medium text-neutral-600'
        }`}
      >
        {children}
      </span>
    </button>
  );
};
