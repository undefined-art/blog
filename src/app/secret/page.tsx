import type { Metadata } from 'next';
import { ThanksContent } from './ThanksContent';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'A heartfelt thank you to all our visitors.',
  robots: {
    index: false,
    follow: false,
  },
};

const ThanksPage = () => {
  return <ThanksContent />;
};

export default ThanksPage;
