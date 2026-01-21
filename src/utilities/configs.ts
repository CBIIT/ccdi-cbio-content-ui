interface GitHubRelease {
  name: string;
  path: string;
  type: string;
  releaseNotes?: GitHubReleaseNote[];
}

interface GitHubReleaseNote {
  name: string;
  path: string;
  type: string;
}

interface GitHubDataset {
  name: string;
  path: string;
  type: string;
}

function getBranchName() {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;

    if (!hostname) return 'main';
    const firstPart: string = hostname.includes('.') ? hostname.split('.')[0] : hostname;
    const tierNameArr: string[] = firstPart.split('-');
    const isDevEnv = process.env.NODE_ENV === 'development' || tierNameArr.includes('dev');
    const isQaEnv = tierNameArr.includes('qa');
    const isStageEnv = tierNameArr.includes('stage');
    if (isDevEnv) {
      return 'dev';
    }
    if (isQaEnv) {
      return 'qa';
    }
    if (isStageEnv) {
      return 'stage';
    }
    return 'main';
  }
  return 'main';
}

export type { GitHubRelease, GitHubDataset };
export { getBranchName };
