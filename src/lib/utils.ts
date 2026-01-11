export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '/blog';

export const resolveAssetPath = (path: string): string => {
  if (!path || path.startsWith('http://') || path.startsWith('https://') || path.startsWith(BASE_PATH)) {
    return path;
  }
  
  return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`;
};
