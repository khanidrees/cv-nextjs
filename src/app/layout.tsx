import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';

export const metadata: Metadata = {
  metadataBase: new URL('https://idreeskhanpathan.vercel.app'),

  title: 'Idrees Khan Pathan — Full-Stack Developer',
  description:
    'Full-Stack Developer specializing in React, Next.js, Node.js, and React Native. Available for freelance projects and full-time roles. 4+ years shipping production-ready web and mobile applications.',
  keywords: [
    'Full-Stack Developer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'React Native Developer',
    'Freelance Developer India',
    'Idrees Khan Pathan',
  ],
  authors: [{ name: 'Idrees Khan Pathan', url: 'https://github.com/khanidrees' }],
  openGraph: {
    title: 'Idrees Khan Pathan — Full-Stack Developer',
    description:
      'Full-Stack Developer specializing in React, Next.js, Node.js, and React Native. Available for freelance projects.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Idrees Khan Pathan — Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Idrees Khan Pathan — Full-Stack Developer',
    description:
      'Full-Stack Developer specializing in React, Next.js, Node.js, and React Native.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
