export const getTierName = (hostname: string): string => {
  if (!hostname) return 'dev';
  const firstPart: string = hostname.includes('.') ? hostname.split('.')[0] : hostname;
  const tierNameArr: string[] = firstPart.split('-');
  const isDevEnv = process.env.NODE_ENV === 'development' || tierNameArr.includes('dev');
  const isQaEnv = tierNameArr.includes('qa');
  const isStageEnv = tierNameArr.includes('stage');
  switch (true) {
    case isDevEnv:
      return 'dev';
    case isQaEnv:
      return 'qa';
    case isStageEnv:
      return 'stage';
    default:
      return 'prod';
  }
};
