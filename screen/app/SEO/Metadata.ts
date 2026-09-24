// app/SEO/Metadata.ts
import type { Metadata } from 'next';
import { SITE_URL, ogImages, primaryKeywords, socialLinks } from './siteConfig';

export const siteUrl = SITE_URL;

export const primaryKeywordsList = primaryKeywords;

export const organizationInfo = {
  name: 'Pastor Daniel Tiruwa Ministry',
  alternateName: [
    'Light to the Nations Emmanuel Church',
    'Daniel Tiruwa Ministry',
    'Emmanuel Church Nepal',
  ],
  url: siteUrl,
  logo: ogImages.home,
  description:
    'Official ministry of Pastor Daniel Tiruwa and Light to the Nations Emmanuel Church.',
  founder: {
    name: 'Pastor Daniel Tiruwa',
    jobTitle: 'Senior Pastor',
  },
  sameAs: socialLinks,
  contactPoint: {
    telephone: '+977 9825612100',
    contactType: 'customer service',
    email: 'trdaniel2022@gmail.com',
  },
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      'Pastor Daniel Tiruwa | Light to the Nations Emmanuel Church | Official Website',
    template: '%s | Pastor Daniel Tiruwa Ministry',
  },
  description:
    'Official website of Pastor Daniel Tiruwa and Light to the Nations Emmanuel Church. Watch powerful sermons, explore children ministry, village ministry, city ministry, and connect with our church community in Nepal.',
  keywords: primaryKeywords,
  authors: [{ name: 'Pastor Daniel Tiruwa', url: siteUrl }],
  creator: 'Pastor Daniel Tiruwa Ministry',
  publisher: 'Pastor Daniel Tiruwa Ministry',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Pastor Daniel Tiruwa Ministry',
    title: 'Pastor Daniel Tiruwa | Light to the Nations Emmanuel Church',
    description:
      'Watch sermons, explore ministries, and connect with Pastor Daniel Tiruwa and Light to the Nations Emmanuel Church.',
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
    description:
      'Official website of Pastor Daniel Tiruwa Ministry. Watch sermons and explore our ministries.',
    images: [ogImages.home],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Verification handled via /public/google569467be9df5b0b2.html
  category: 'religion',
  classification: 'Church Ministry',
};