import { getBranchName } from './configs';

const BASE_URL = `https://raw.githubusercontent.com/CBIIT/ccdi-cbio-content/refs/heads/${getBranchName()}/`;

export async function fetchContent(filePath: string) {
  const response = await fetch(`${BASE_URL}${filePath}`, {
    headers: { 'Accept': 'application/json' },
    next: { revalidate: 3600 }  // Next.js specific - for Incremental Static Regeneration (ISR)
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch content from ${filePath}`);
  }

  const content = await response.text();
  return content;
}
