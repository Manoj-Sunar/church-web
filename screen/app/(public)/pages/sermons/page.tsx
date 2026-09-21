// app/(public)/sermons/page.tsx
import { publicAPI } from '@/app/API/public.api';
import SermonsClient from '@/app/Components/pages/Sermon/SermonClient';
import type { Metadata } from 'next';
import { SITE_URL, ogImages, primaryKeywords } from '@/app/SEO/siteConfig';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: 'Pastor Daniel Tiruwa Sermons | Bible Teachings & Messages',

  description:
    'Watch Pastor Daniel Tiruwa sermons and Bible teachings. Powerful Christian messages to strengthen your faith and spiritual life.',

  keywords: [
    ...primaryKeywords,
    'Pastor Daniel Tiruwa sermons',
    'Daniel Tiruwa preaching',
    'Bible sermons Nepal',
    'Christian messages Nepal',
    'online sermons Nepal',
  ],

  alternates: { canonical: '/sermons' },

  openGraph: {
    type: 'website',
    url: `${SITE_URL}/sermons`,
    title: 'Pastor Daniel Tiruwa Sermons',
    description: 'Watch powerful sermons and Bible teachings from Pastor Daniel Tiruwa.',
    images: [{ url: ogImages.sermons, width: 1200, height: 630, alt: 'Pastor Daniel Tiruwa sermons' }],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Pastor Daniel Tiruwa Sermons',
    description: 'Watch Bible teachings and sermons online',
    images: [ogImages.sermons],
  },

  robots: { index: true, follow: true },
};

export default async function SermonsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/sermons#page`,
        url: `${SITE_URL}/sermons`,
        name: 'Pastor Daniel Tiruwa Sermons',
        description: 'Watch sermons and Bible teachings from Pastor Daniel Tiruwa.',
        mainEntity: { '@id': `${SITE_URL}/#person` },
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Sermons', item: `${SITE_URL}/sermons` },
        ],
      },
    ],
  };

  const [res, sermons] = await Promise.all([
    publicAPI.getPageContentByPageName('sermons', { next: { revalidate: 600 } }),
    publicAPI.getAllSermons(1, 10),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SermonsClient
        sermons={sermons.data}
        pagination={sermons.pagination}
        content={res}
      />
    </>
  );
}