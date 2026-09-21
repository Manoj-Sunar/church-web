// app/(public)/events/page.tsx
import { publicAPI } from '@/app/API/public.api';
import EventsClient from '@/app/Components/pages/Events/EventsClient';
import type { Metadata } from 'next';
import { SITE_URL, ogImages, primaryKeywords } from '@/app/SEO/siteConfig';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: 'Pastor Daniel Tiruwa Events | Ministry & Programs',

  description:
    'Explore upcoming events, programs, and gatherings led by Pastor Daniel Tiruwa. Join services, fellowships, and ministry events in Nepal.',

  keywords: [
    ...primaryKeywords,
    'Pastor Daniel Tiruwa events',
    'Daniel Tiruwa programs',
    'Pastor Daniel Tiruwa ministry events',
    'Christian events Nepal pastor Daniel Tiruwa',
    'church events Nepal',
  ],

  alternates: { canonical: '/events' },

  openGraph: {
    type: 'website',
    url: `${SITE_URL}/events`,
    title: 'Pastor Daniel Tiruwa Events',
    description:
      'Join events and ministry programs led by Pastor Daniel Tiruwa.',
    images: [
      {
        url: ogImages.events,
        width: 1200,
        height: 630,
        alt: 'Pastor Daniel Tiruwa events',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Pastor Daniel Tiruwa Events',
    description: 'Upcoming ministry events and gatherings',
    images: [ogImages.events],
  },

  robots: { index: true, follow: true },
};

export const revalidate = 600;

export default async function EventsPage() {
  try {
    const [content, events] = await Promise.all([
      publicAPI.getPageContentByPageName('events', { next: { revalidate: 600 } }),
      publicAPI.getAllEvents({ next: { revalidate: 600 } }),
    ]);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${SITE_URL}/events#page`,
          url: `${SITE_URL}/events`,
          name: 'Pastor Daniel Tiruwa Events',
          description:
            'Upcoming events and ministry programs led by Pastor Daniel Tiruwa.',
          about: { '@id': `${SITE_URL}/#person` },
          isPartOf: { '@id': `${SITE_URL}/#website` },
          inLanguage: 'en',
        },
        {
          '@type': 'ItemList',
          name: 'Upcoming Church Events',
          numberOfItems: events.data?.length || 0,
          itemListElement: (events.data || []).slice(0, 20).map((e: any, i: number) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${SITE_URL}/events/${e._id}`,
            name: e.title,
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Events', item: `${SITE_URL}/events` },
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
        <EventsClient
          events={events.data}
          contents={content}
          pagination={events.pagination}
        />
      </>
    );
  } catch (error) {
    console.error('[EventsPage]', error);
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-semibold">Pastor Daniel Tiruwa Events</h1>
        <p className="text-gray-500 mt-2">Failed to load events. Please refresh.</p>
      </div>
    );
  }
}