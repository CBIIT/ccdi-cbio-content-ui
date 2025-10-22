export const isDevEnv = (hostname: string): boolean => {
  if (!hostname) return false;
  const firstPart: string = hostname.includes('.') ? hostname.split('.')[0] : hostname;
  const tierNameArr: string[] = firstPart.split('-');
  const isLocalEnv = process.env.NODE_ENV === 'development';
  return isLocalEnv || tierNameArr.includes('dev') || tierNameArr.includes('qa');
};
