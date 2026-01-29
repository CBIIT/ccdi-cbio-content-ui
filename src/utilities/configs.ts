function getBranchNameFromHostname(hostname?: string | null) {
  if (!hostname) return 'main';

  const firstPart: string = hostname.includes('.') ? hostname.split('.')[0] : hostname;
  const tierNameArr: string[] = firstPart.split('-');

  const isDevEnv = process.env.NODE_ENV === 'development' || tierNameArr.includes('dev');
  const isQaEnv = tierNameArr.includes('qa');
  const isStageEnv = tierNameArr.includes('stage');

  if (isDevEnv) return 'dev';
  if (isQaEnv) return 'qa';
  if (isStageEnv) return 'stage';
  return 'main';
}

function getBranchName() {
  if (typeof window !== 'undefined') {
    return getBranchNameFromHostname(window.location.hostname);
  }
  return getBranchNameFromHostname(undefined);
}

export { getBranchName, getBranchNameFromHostname };
