// app/(public)/sermons/[id]/page.tsx
import { publicAPI } from '@/app/API/public.api';
import SermonDetailClient from '@/app/Components/pages/Sermon/SermonDetailsClient';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SITE_URL, ogImages } from '@/app/SEO/siteConfig';

export const revalidate = 600;

// ✅ Pre-render top 100 sermons at build time
export async function generateStaticParams() {
  try {
    const res = await publicAPI.getAllSermons(1, 100);
    return (res?.data ?? []).map((s: any) => ({ id: String(s._id) }));
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
    const res = await publicAPI.getSermonDetails(id);
    const sermon = res?.data;

    if (!sermon) {
      return { title: 'Sermon Not Found | Pastor Daniel Tiruwa Ministry' };
    }

    const title = `${sermon.title} | Pastor Daniel Tiruwa Sermon`;
    const description =
      sermon.description?.slice(0, 160) ||
      `Watch "${sermon.title}" - a powerful sermon by Pastor Daniel Tiruwa.`;

    return {
      metadataBase: new URL(SITE_URL),
      title,
      description,
      keywords: [
        sermon.title,
        `${sermon.title} sermon`,
        'Pastor Daniel Tiruwa sermon',
        'Daniel Tiruwa preaching',
        'Christian sermon Nepal',
        'Bible teaching Nepal',
        sermon.speaker,
      ],
      authors: [{ name: sermon.speaker || 'Pastor Daniel Tiruwa' }],
      alternates: { canonical: `/sermons/${id}` },
      openGraph: {
        type: 'video.other',
        url: `${SITE_URL}/sermons/${id}`,
        title,
        description,
        siteName: 'Pastor Daniel Tiruwa Ministry',
        images: [{ url: ogImages.sermons, width: 1200, height: 630, alt: sermon.title }],
      },
      twitter: {
        card: 'player',
        title,
        description,
        images: [ogImages.sermons],
      },
      robots: { index: true, follow: true },
    };
  } catch {
    return { title: 'Sermon | Pastor Daniel Tiruwa' };
  }
}

export default async function SermonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await publicAPI.getSermonDetails(id, { next: { revalidate: 600 } });
  const sermon = res?.data;

  if (!sermon) return notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'VideoObject',
        name: sermon.title,
        description: sermon.description,
        uploadDate: sermon.date,
        contentUrl: sermon.videoUrl || undefined,
        embedUrl: sermon.videoUrl || undefined,
        thumbnailUrl: ogImages.sermons,
        author: {
          '@type': 'Person',
          '@id': `${SITE_URL}/#person`,
          name: sermon.speaker || 'Pastor Daniel Tiruwa',
        },
        publisher: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'Pastor Daniel Tiruwa Ministry',
        },
        mainEntityOfPage: `${SITE_URL}/sermons/${id}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Sermons', item: `${SITE_URL}/sermons` },
          { '@type': 'ListItem', position: 3, name: sermon.title, item: `${SITE_URL}/sermons/${id}` },
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
      <SermonDetailClient sermon={sermon} />
    </>
  );
}