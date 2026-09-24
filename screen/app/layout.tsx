// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Fredoka, Quicksand } from 'next/font/google';
import './globals.css';
import { SITE_URL, ogImages, primaryKeywords, socialLinks } from './SEO/siteConfig';
import { Providers } from './Provider';

const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quicksand',
});

const fredoka = Fredoka({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fredoka',
});

export const viewport: Viewport = {
  themeColor: '#4F46E5',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Pastor Daniel Tiruwa | Light to the Nations Emmanuel Church',
    template: '%s | Pastor Daniel Tiruwa Ministry',
  },

  description:
    'Official website of Pastor Daniel Tiruwa and Light to the Nations Emmanuel Church. Watch powerful sermons, explore children ministry, village ministry, city ministry, and connect with our church community in Nepal.',

  keywords: primaryKeywords,

  authors: [{ name: 'Pastor Daniel Tiruwa', url: SITE_URL }],
  creator: 'Pastor Daniel Tiruwa Ministry',
  publisher: 'Pastor Daniel Tiruwa Ministry',
  applicationName: 'Pastor Daniel Tiruwa Ministry',

  alternates: {
    canonical: '/',
  },

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

  // ✅ Google verification is handled via /public/google569467be9df5b0b2.html
  // No `verification` block needed here.

  category: 'religion',
  classification: 'Church Ministry',
  formatDetection: { email: false, address: true, telephone: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${quicksand.variable} ${fredoka.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://church-web-kicd.onrender.com" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />

        {/* Global Organization + Person + WebSite schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                '@id': `${SITE_URL}/#organization`,
                name: 'Pastor Daniel Tiruwa Ministry',
                alternateName: [
                  'Light to the Nations Emmanuel Church',
                  'Daniel Tiruwa Ministry',
                ],
                url: SITE_URL,
                logo: {
                  '@type': 'ImageObject',
                  url: ogImages.home,
                  width: 1200,
                  height: 630,
                },
                description:
                  'Official ministry of Pastor Daniel Tiruwa and Light to the Nations Emmanuel Church.',
                founder: {
                  '@type': 'Person',
                  '@id': `${SITE_URL}/#person`,
                  name: 'Pastor Daniel Tiruwa',
                },
                sameAs: socialLinks,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Person',
                '@id': `${SITE_URL}/#person`,
                name: 'Pastor Daniel Tiruwa',
                alternateName: ['Daniel Tiruwa', 'Pastor Tiruwa'],
                url: SITE_URL,
                jobTitle: 'Senior Pastor',
                description:
                  'Pastor Daniel Tiruwa is a Christian leader and founder of Light to the Nations Emmanuel Church.',
                image: ogImages.home,
                worksFor: { '@id': `${SITE_URL}/#organization` },
                knowsAbout: [
                  'Christian Ministry',
                  'Bible Teaching',
                  'Children Ministry',
                  'Village Ministry',
                  'City Ministry',
                ],
                sameAs: socialLinks,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                url: SITE_URL,
                name: 'Pastor Daniel Tiruwa Ministry',
                inLanguage: 'en',
                publisher: { '@id': `${SITE_URL}/#organization` },
              },
            ]),
          }}
        />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased">
        

        {children}
       
      </body>
    </html>
  );
}