// app/(public)/ministries/page.tsx
import { publicAPI } from '@/app/API/public.api';
import MinistriesClient from '@/app/Components/pages/Ministry/MinistryClient';
import type { Metadata } from 'next';
import { SITE_URL, ogImages, primaryKeywords } from '@/app/SEO/siteConfig';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: 'Pastor Daniel Tiruwa Ministries | Programs & Services',

  description:
    'Explore ministries led by Pastor Daniel Tiruwa: children ministry, village ministry, city ministry, youth ministry, and more. Discover programs, services, and opportunities to grow, serve, and connect.',

  keywords: [
    ...primaryKeywords,
    'Pastor Daniel Tiruwa ministries',
    'Daniel Tiruwa ministry programs',
    'children ministry Nepal',
    'village ministry Nepal',
    'city ministry Nepal',
    'church ministries Pastor Daniel Tiruwa',
  ],

  alternates: { canonical: '/ministries' },

  openGraph: {
    type: 'website',
    url: `${SITE_URL}/ministries`,
    title: 'Pastor Daniel Tiruwa Ministries',
    description:
      'Explore ministry programs and services led by Pastor Daniel Tiruwa.',
    images: [
      {
        url: ogImages.ministries,
        width: 1200,
        height: 630,
        alt: 'Pastor Daniel Tiruwa ministries',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Pastor Daniel Tiruwa Ministries',
    description: 'Ministry programs and services',
    images: [ogImages.ministries],
  },

  robots: { index: true, follow: true },
};

export const revalidate = 600;

export default async function MinistriesPage() {
  try {
    const [content, ministry] = await Promise.all([
      publicAPI.getPageContentByPageName('ministries', { next: { revalidate: 600 } }),
      publicAPI.getAllMinistry(),
    ]);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${SITE_URL}/ministries#page`,
          url: `${SITE_URL}/ministries`,
          name: 'Pastor Daniel Tiruwa Ministries',
          description:
            'Ministry programs and services led by Pastor Daniel Tiruwa.',
          about: { '@id': `${SITE_URL}/#person` },
          isPartOf: { '@id': `${SITE_URL}/#website` },
          inLanguage: 'en',
        },
        {
          '@type': 'ItemList',
          name: 'Church Ministries',
          numberOfItems: ministry.data?.length || 0,
          itemListElement: (ministry.data || []).slice(0, 20).map((m: any, i: number) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${SITE_URL}/ministries/${m._id}`,
            name: m.name,
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Ministries', item: `${SITE_URL}/ministries` },
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
        <MinistriesClient
          content={content}
          ministry={ministry.data}
          pagination={ministry.pagination}
        />
      </>
    );
  } catch (error) {
    console.error('[MinistriesPage]', error);
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-semibold">Pastor Daniel Tiruwa Ministries</h1>
        <p className="text-gray-500 mt-2">Failed to load ministries. Please refresh.</p>
      </div>
    );
  }
}