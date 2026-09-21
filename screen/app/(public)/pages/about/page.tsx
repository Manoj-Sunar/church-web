// app/(public)/about/page.tsx
import { publicAPI } from '@/app/API/public.api';
import AboutClient from '@/app/Components/pages/About/AboutClient';
import type { Metadata } from 'next';
import { SITE_URL, ogImages, primaryKeywords, socialLinks } from '@/app/SEO/siteConfig';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: 'About Pastor Daniel Tiruwa | Biography, Ministry & Calling',

  description:
    'Learn about Pastor Daniel Tiruwa, his life, calling, and ministry at Light to the Nations Emmanuel Church. Discover his mission, leadership, and teachings.',

  keywords: [
    ...primaryKeywords,
    'Pastor Daniel Tiruwa biography',
    'About Pastor Daniel Tiruwa',
    'Pastor Daniel Tiruwa life story',
    'Pastor Daniel Tiruwa calling',
  ],

  alternates: { canonical: '/about' },

  openGraph: {
    type: 'profile',
    url: `${SITE_URL}/about`,
    title: 'About Pastor Daniel Tiruwa | Biography & Ministry',
    description:
      'Explore the life, ministry, and calling of Pastor Daniel Tiruwa.',
    images: [
      {
        url: ogImages.about,
        width: 1200,
        height: 630,
        alt: 'Pastor Daniel Tiruwa biography',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'About Pastor Daniel Tiruwa',
    description: 'Biography and ministry of Pastor Daniel Tiruwa',
    images: [ogImages.about],
  },

  robots: { index: true, follow: true },
};

export const revalidate = 600;

export default async function AboutPage() {
  try {
    const [content, leaders] = await Promise.all([
      publicAPI.getPageContentByPageName('about', { next: { revalidate: 600 } }),
      publicAPI.getAllLeaders({ next: { revalidate: 600 } }),
    ]);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'AboutPage',
          '@id': `${SITE_URL}/about#page`,
          url: `${SITE_URL}/about`,
          name: 'About Pastor Daniel Tiruwa',
          description:
            'Biography, calling, and ministry of Pastor Daniel Tiruwa, founder of Light to the Nations Emmanuel Church.',
          about: { '@id': `${SITE_URL}/#person` },
          isPartOf: { '@id': `${SITE_URL}/#website` },
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: ogImages.about,
          },
          inLanguage: 'en',
        },
        {
          '@type': 'Person',
          '@id': `${SITE_URL}/#person`,
          name: 'Pastor Daniel Tiruwa',
          alternateName: ['Daniel Tiruwa', 'Pastor Tiruwa', 'Tiruwa'],
          url: SITE_URL,
          jobTitle: 'Senior Pastor',
          description:
            'Pastor Daniel Tiruwa is a Christian leader, preacher, and founder of Light to the Nations Emmanuel Church in Nepal.',
          image: ogImages.home,
          worksFor: { '@id': `${SITE_URL}/#organization` },
          nationality: { '@type': 'Country', name: 'Nepal' },
          knowsAbout: [
            'Christian Ministry',
            'Bible Teaching',
            'Pastoral Care',
            'Church Leadership',
            'Evangelism',
            'Children Ministry',
            'Village Ministry',
            'City Ministry',
          ],
          sameAs: socialLinks,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
          ],
        },
      ],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <AboutClient content={content} leaders={leaders.data} />
      </>
    );
  } catch (error) {
    console.error('[AboutPage]', error);
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-semibold">About Pastor Daniel Tiruwa</h1>
        <p className="text-gray-500 mt-2">Please refresh the page.</p>
      </div>
    );
  }
}