import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: {
    default: 'undefined-art',
    template: '%s | undefined-art',
  },
  description: 'Thoughts, code, and creative experiments by undefined-art.',
  openGraph: {
    title: 'undefined-art',
    description: 'Thoughts, code, and creative experiments by undefined-art.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <div className="fixed inset-0 pointer-events-none grain-overlay" aria-hidden="true" />
          <Header />
          <main className="flex-1 relative">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
