'use client';

import React, { createContext, useContext } from 'react';
import type { ModulesConfig } from '@/utilities/data-fetching';

const ModulesContext = createContext<ModulesConfig | null>(null);

export function ModulesProvider({
  modules,
  children,
}: {
  modules: ModulesConfig;
  children: React.ReactNode;
}) {
  return <ModulesContext.Provider value={modules}>{children}</ModulesContext.Provider>;
}

export function useModules(): ModulesConfig {
  const ctx = useContext(ModulesContext);
  if (!ctx) {
    throw new Error('useModules must be used within a ModulesProvider');
  }
  return ctx;
}

