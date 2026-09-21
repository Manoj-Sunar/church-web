// app/(public)/events/[id]/page.tsx
import { publicAPI } from '@/app/API/public.api';
import EventDetailClient from '@/app/Components/pages/Events/EventClientDetails';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL, ogImages } from '@/app/SEO/siteConfig';

export const revalidate = 600;

export async function generateStaticParams() {
  try {
    const res = await publicAPI.getAllEvents({});
    return (res?.data ?? []).map((e: any) => ({ id: String(e._id) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await publicAPI.getEventById(id);
    const event = res.data;

    if (!event) {
      return { title: 'Event Not Found | Pastor Daniel Tiruwa Ministry' };
    }

    const title = `${event.title} | Pastor Daniel Tiruwa Event`;
    const description =
      event.description?.slice(0, 160) ||
      `Join "${event.title}", a special event led by Pastor Daniel Tiruwa.`;
    const image = event.image?.url || ogImages.events;

    return {
      metadataBase: new URL(SITE_URL),
      title,
      description,
      keywords: [
        event.title,
        `${event.title} Nepal`,
        'Pastor Daniel Tiruwa event',
        'Daniel Tiruwa ministry event',
        'Christian event Nepal',
        event.location,
        event.category,
      ],
      alternates: { canonical: `/events/${id}` },
      openGraph: {
        type: 'article',
        url: `${SITE_URL}/events/${id}`,
        title,
        description,
        siteName: 'Pastor Daniel Tiruwa Ministry',
        images: [{ url: image, width: 1200, height: 630, alt: event.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
      },
      robots: { index: true, follow: true },
    };
  } catch {
    return { title: 'Event | Pastor Daniel Tiruwa' };
  }
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const res = await publicAPI.getEventById(id, { next: { revalidate: 600 } });
    const event = res.data;

    if (!event) return notFound();

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Event',
          name: event.title,
          startDate: event.date || new Date().toISOString(),
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
          description: event.description,
          image: event.image?.url ? [event.image.url] : [ogImages.events],
          location: {
            '@type': 'Place',
            name: event.location || 'Event Location',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'NP',
              addressLocality: event.location || 'Nepal',
            },
          },
          organizer: {
            '@type': 'Person',
            '@id': `${SITE_URL}/#person`,
            name: 'Pastor Daniel Tiruwa',
          },
          performer: {
            '@type': 'Person',
            '@id': `${SITE_URL}/#person`,
            name: 'Pastor Daniel Tiruwa',
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'NPR',
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/events/${id}`,
          },
          url: `${SITE_URL}/events/${id}`,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Events', item: `${SITE_URL}/events` },
            { '@type': 'ListItem', position: 3, name: event.title, item: `${SITE_URL}/events/${id}` },
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
        <EventDetailClient event={event} />
      </>
    );
  } catch (error) {
    console.error('[EventDetailPage]', error);
    return notFound();
  }
}