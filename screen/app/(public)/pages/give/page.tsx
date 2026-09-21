// app/(public)/donate/page.tsx
import { publicAPI } from '@/app/API/public.api';
import DonateClient from '@/app/Components/pages/Give/GiveClient';
import type { Metadata } from 'next';
import { SITE_URL, ogImages, primaryKeywords } from '@/app/SEO/siteConfig';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: 'Donate to Pastor Daniel Tiruwa Ministry | Support the Mission',

  description:
    'Support Pastor Daniel Tiruwa Ministry through donations. Help expand ministry work, community outreach, and global missions in Nepal.',

  keywords: [
    ...primaryKeywords,
    'Donate Pastor Daniel Tiruwa',
    'Support Pastor Daniel Tiruwa ministry',
    'Christian ministry donation Nepal',
    'Pastor Daniel Tiruwa giving',
    'church donation Nepal',
  ],

  alternates: { canonical: '/donate' },

  openGraph: {
    type: 'website',
    url: `${SITE_URL}/donate`,
    title: 'Donate to Pastor Daniel Tiruwa Ministry',
    description:
      'Support the ministry of Pastor Daniel Tiruwa. Your giving helps expand outreach and impact lives.',
    images: [
      {
        url: ogImages.donate,
        width: 1200,
        height: 630,
        alt: 'Donate to Pastor Daniel Tiruwa Ministry',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Donate to Pastor Daniel Tiruwa Ministry',
    description: 'Support the mission through giving',
    images: [ogImages.donate],
  },

  robots: { index: true, follow: true },
};

export const revalidate = 600;

export default async function DonatePage() {
  try {
    const content = await publicAPI.getPageContentByPageName('donate', {
      next: { revalidate: 600 },
    });

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/donate#page`,
          url: `${SITE_URL}/donate`,
          name: 'Donate to Pastor Daniel Tiruwa Ministry',
          description:
            'Support Pastor Daniel Tiruwa Ministry through donations and giving.',
          isPartOf: { '@id': `${SITE_URL}/#website` },
        },
        {
          '@type': 'DonateAction',
          name: 'Donate to Pastor Daniel Tiruwa Ministry',
          target: `${SITE_URL}/donate`,
          recipient: {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: 'Pastor Daniel Tiruwa Ministry',
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Donate', item: `${SITE_URL}/donate` },
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
        <DonateClient content={content} />
      </>
    );
  } catch (error) {
    console.error('[DonatePage]', error);
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-semibold">Support the Ministry</h1>
        <p className="text-gray-500 mt-2">Failed to load donation info. Please refresh.</p>
      </div>
    );
  }
}