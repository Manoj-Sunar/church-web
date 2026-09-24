// app/(public)/page.tsx
import type { Metadata } from 'next';

import HomeView from '@/app/Components/pages/Home/HomeClient';
import { publicAPI } from '@/app/API/public.api';
import {
  SITE_URL,
  ogImages,
  primaryKeywords,
  socialLinks,
} from '@/app/SEO/siteConfig';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Pastor Daniel Tiruwa | Light to the Nations Emmanuel Church',
    template: '%s | Pastor Daniel Tiruwa Ministry',
  },

  description:
    'Official website of Pastor Daniel Tiruwa and Light to the Nations Emmanuel Church. Watch powerful sermons, explore children ministry, village ministry, city ministry, and connect with our church community in Nepal.',

  keywords: primaryKeywords,

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Pastor Daniel Tiruwa Ministry',
    title: 'Pastor Daniel Tiruwa | Light to the Nations Emmanuel Church',
    description:
      'Official Pastor Daniel Tiruwa website. Watch sermons and explore ministry work.',
    images: [
      {
        url: ogImages.home,
        width: 1200,
        height: 630,
        alt: 'Pastor Daniel Tiruwa preaching',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Pastor Daniel Tiruwa',
    description: 'Official website and sermons',
    images: [ogImages.home],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function IndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Pastor Daniel Tiruwa',
        url: SITE_URL,
        jobTitle: 'Senior Pastor',
        image: ogImages.home,
        description:
          'Pastor Daniel Tiruwa is a Christian leader sharing sermons, teachings, and ministry work.',
        sameAs: socialLinks,
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Pastor Daniel Tiruwa Ministry',
        url: SITE_URL,
        sameAs: socialLinks,
      },
    ],
  };

  try {
    const [res, ministries, publicAnalytics, sermons, mission] =
      await Promise.all([
        publicAPI.getPageContentByPageName('home'),
        publicAPI.getAllMinistry(1, 3),
        publicAPI.getPublicAnalytics(),
        publicAPI.getAllSermons(1, 3),
        publicAPI.getPageContentByPageName('about'),
      ]);

    const sermonsData = sermons?.data ?? [];

    return (
      <>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hidden SEO content for crawlers */}
        <section style={{ display: 'none' }}>
          <h1>Pastor Daniel Tiruwa</h1>
          <p>
            Official website of Pastor Daniel Tiruwa. Watch sermons, explore
            ministry work, and stay connected with Pastor Daniel Tiruwa.
          </p>
        </section>

        <HomeView
          content={res}
          ministry={ministries?.data}
          analytics={publicAnalytics}
          mission={mission.data.about?.missionContent || []}
          sermons={sermonsData}
        />
      </>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}