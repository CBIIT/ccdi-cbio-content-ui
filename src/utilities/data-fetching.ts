import { getBranchName } from './configs';

function getBaseUrl(branchName?: string) {
  const branch = branchName ?? getBranchName();
  return `https://raw.githubusercontent.com/CBIIT/ccdi-cbio-content/refs/heads/${branch}/`;
}

export type ModuleEntry = {
  title: string;
  id: string;
  path: string;
};

export type ModulesConfig = {
  about: ModuleEntry[];
  'data-using': ModuleEntry[];
  datasets: ModuleEntry[];
  releases: Record<string, ModuleEntry[]>;
  images: ModuleEntry[];
};

export async function fetchContent(filePath: string, options?: { branchName?: string }) {
  const baseUrl = getBaseUrl(options?.branchName);
  const response = await fetch(`${baseUrl}${filePath}`, {
    headers: { 'Accept': 'text/plain' },
    next: { revalidate: 3600 }  // Next.js specific - for Incremental Static Regeneration (ISR)
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch content from ${filePath}`);
  }

  const content = await response.text();
  return content;
}

export async function fetchModules(options?: { branchName?: string }): Promise<ModulesConfig> {
  try {
    const raw = await fetchContent('modules.json', { branchName: options?.branchName });
    return JSON.parse(raw) as ModulesConfig;
  } catch (error) {
    console.error('Failed to fetch modules:', error);
    return {} as ModulesConfig;
  }
}
