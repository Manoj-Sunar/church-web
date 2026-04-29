// app/sermons/[id]/page.tsx

import { publicAPI } from '@/app/API/public.api';
import SermonDetailClient from '@/app/Components/pages/Sermon/SermonDetailsClient';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const siteUrl = 'https://lighttothenationsemmanuel.org';

// ✅ Dynamic SEO Metadata
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
      return {
        title: 'Sermon Not Found | Pastor Daniel Tiruwa',
      };
    }

    const title = `${sermon.title} | Pastor Daniel Tiruwa Sermon`;
    const description =
      sermon.description?.slice(0, 160) ||
      'Watch powerful sermon from Pastor Daniel Tiruwa';



    return {
      metadataBase: new URL(siteUrl),

      title,
      description,

      keywords: [
        sermon.title,
        'Pastor Daniel Tiruwa sermon',
        'Daniel Tiruwa preaching',
        'Christian sermon Nepal',
      ],

      alternates: {
        canonical: `/sermons/${id}`,
      },

      openGraph: {
        type: 'video.other',
        url: `${siteUrl}/sermons/${id}`,
        title,
        description,

      },

      twitter: {
        card: 'summary_large_image',
        title,
        description,

      },

      robots: {
        index: true,
        follow: true,
      },
    };
  } catch {
    return {
      title: 'Sermon | Pastor Daniel Tiruwa',
    };
  }
}

// ✅ Page Component
export default async function SermonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await publicAPI.getSermonDetails(id);
  const sermon = res?.data;

  if (!sermon) return notFound();

  // ✅ FULL Structured Data (IMPORTANT FIXED VERSION)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: sermon.title,
    description: sermon.description,

    uploadDate: sermon.date,
    contentUrl: sermon.videoUrl || undefined,


    author: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Pastor Daniel Tiruwa",
    },

    publisher: {
      "@type": "Organization",
      name: "Pastor Daniel Tiruwa Ministry",
      url: siteUrl,
    },
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* SEO Content (IMPORTANT: make visible in UI ideally) */}
      <section>
        <h1>{sermon.title}</h1>

        <p>
          Watch this powerful sermon by Pastor Daniel Tiruwa.
          This message will help you grow spiritually and understand God’s Word
          more deeply.
        </p>
      </section>

      <SermonDetailClient sermon={sermon} />
    </>
  );
}