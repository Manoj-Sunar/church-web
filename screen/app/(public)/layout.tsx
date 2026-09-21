// app/(public)/layout.tsx
import type { Metadata } from 'next';
import ClientWrapper from '../ClientWrapper';
import { SITE_URL, ogImages, primaryKeywords } from '../SEO/siteConfig';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Pastor Daniel Tiruwa | Light to the Nations Emmanuel Church',
    template: '%s | Pastor Daniel Tiruwa Ministry',
  },

  description:
    'Official website of Pastor Daniel Tiruwa and Light to the Nations Emmanuel Church. Watch sermons, explore ministries, and connect with our community.',

  keywords: primaryKeywords,

  alternates: { canonical: '/' },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Pastor Daniel Tiruwa Ministry',
    title: 'Pastor Daniel Tiruwa | Light to the Nations Emmanuel Church',
    description:
      'Watch sermons, explore ministries, and connect with Pastor Daniel Tiruwa.',
    images: [
      {
        url: ogImages.home,
        width: 1200,
        height: 630,
        alt: 'Pastor Daniel Tiruwa - Light to the Nations Emmanuel Church',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Pastor Daniel Tiruwa | Light to the Nations Emmanuel Church',
    description: 'Official website of Pastor Daniel Tiruwa Ministry.',
    images: [ogImages.home],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  category: 'religion',
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <ClientWrapper>{children}</ClientWrapper>;
}