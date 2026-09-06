import type { Metadata } from 'next';
import { Inter, Inter_Tight, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter-tight',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AVERO · Performance Marketing · Meta & Google Ads',
  description:
    'Give me 15 minutes. I’ll show you where your ads are losing money — and what I’d fix first. Performance marketing for Meta Ads, Google Ads, CRO, and tracking.',
  openGraph: {
    title: 'AVERO · Performance Marketing · Meta & Google Ads',
    description:
      'Give me 15 minutes. I’ll show you where your ads are losing money — and what I’d fix first.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AVERO · Performance Marketing · Meta & Google Ads',
    description:
      'Give me 15 minutes. I’ll show you where your ads are losing money — and what I’d fix first.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-h-full w-full bg-white text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
