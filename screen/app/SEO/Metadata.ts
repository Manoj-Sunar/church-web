// app/SEO/metadata.ts
import type { Metadata } from 'next';

export const siteUrl = 'https://pastordanieltiruwaministry.org.np';

// Primary keywords for all pages
export const primaryKeywords = [
  'Pastor Daniel Tiruwa',
  'Daniel Tiruwa',
  'Pastor Daniel Tiruwa Ministry',
  'Daniel Tiruwa Ministry',
  'Light to the Nations',
  'Light to the Nations Emmanuel Church',
  'Emmanuel Church',
  'Pastor Daniel Tiruwa sermons',
  'Daniel Tiruwa preaching',
  'Nepali pastor Daniel Tiruwa',
  'Tiruwa ministry',
  'Daniel Tiruwa church',
  'Pastor Tiruwa',
  'Daniel Tiruwa teachings',
  'Christian ministry Nepal',
  'church in Nepal',
  'children ministry',
  'village ministry',
  'city ministry',
  'youth ministry',
  'worship ministry',
  'prayer ministry',
  'outreach ministry',
  'Bible teaching Nepal',
];

// Organization info for structured data
export const organizationInfo = {
  name: 'Pastor Daniel Tiruwa Ministry',
  alternateName: [
    'Light to the Nations Emmanuel Church',
    'Daniel Tiruwa Ministry',
    'Emmanuel Church Nepal',
  ],
  url: siteUrl,
  logo: `${siteUrl}/og/pastor-daniel-tiruwa.png`,
  description: 'Official ministry of Pastor Daniel Tiruwa and Light to the Nations Emmanuel Church. Sharing the gospel, teaching the Word, and building communities through various ministries including children ministry, village ministry, and city ministry.',
  founder: {
    name: 'Pastor Daniel Tiruwa',
    jobTitle: 'Senior Pastor',
  },
  sameAs: [
    'https://www.facebook.com/pastordanieltiruwa',
    'https://www.youtube.com/@pastordanieltiruwa',
    'https://www.instagram.com/pastordanieltiruwa',
    'https://twitter.com/pastordaniel',
  ],
  contactPoint: {
    telephone: '+977-XXXXXXXXX',
    contactType: 'customer service',
    email: 'info@pastordanieltiruwaministry.org.np',
  },
};

// Default metadata
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Pastor Daniel Tiruwa | Light to the Nations Emmanuel Church | Official Website',
    template: '%s | Pastor Daniel Tiruwa Ministry',
  },
  description: 'Official website of Pastor Daniel Tiruwa and Light to the Nations Emmanuel Church. Watch powerful sermons, explore children ministry, village ministry, city ministry, and connect with our church community in Nepal.',
  keywords: primaryKeywords,
  authors: [{ name: 'Pastor Daniel Tiruwa', url: siteUrl }],
  creator: 'Pastor Daniel Tiruwa Ministry',
  publisher: 'Pastor Daniel Tiruwa Ministry',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Pastor Daniel Tiruwa Ministry',
    title: 'Pastor Daniel Tiruwa | Light to the Nations Emmanuel Church',
    description: 'Watch sermons, explore ministries, and connect with Pastor Daniel Tiruwa and Light to the Nations Emmanuel Church.',
    images: [
      {
        url: `${siteUrl}/og/pastor-daniel-tiruwa.png`,
        width: 1200,
        height: 630,
        alt: 'Pastor Daniel Tiruwa - Light to the Nations Emmanuel Church',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@pastordaniel',
    creator: '@pastordaniel',
    title: 'Pastor Daniel Tiruwa | Light to the Nations Emmanuel Church',
    description: 'Official website of Pastor Daniel Tiruwa Ministry. Watch sermons and explore our ministries.',
    images: [`${siteUrl}/og/pastor-daniel-tiruwa.png`],
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
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    yandex: 'YOUR_YANDEX_VERIFICATION_CODE',
    // bing: 'YOUR_BING_VERIFICATION_CODE',
  },
  category: 'religion',
  classification: 'Church Ministry',
};