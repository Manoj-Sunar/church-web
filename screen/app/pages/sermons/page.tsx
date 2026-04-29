// app/sermons/page.tsx

import { publicAPI } from '@/app/API/public.api';
import SermonsClient from '@/app/Components/pages/Sermon/SermonClient';
import type { Metadata } from 'next';

const siteUrl = 'https://lighttothenationsemmanuel.org';
const ogImage = `${siteUrl}/og/pastor-daniel-tiruwa-sermons.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "Pastor Daniel Tiruwa Sermons | Bible Teachings & Messages",

  description:
    "Watch Pastor Daniel Tiruwa sermons and Bible teachings. Powerful Christian messages to strengthen your faith and spiritual life.",

  keywords: [
    "Pastor Daniel Tiruwa sermons",
    "Daniel Tiruwa preaching",
    "Bible sermons Nepal",
    "Christian messages Nepal",
    "Pastor Daniel Tiruwa teachings",
    "online sermons Nepal",
  ],

  alternates: {
    canonical: "/sermons",
  },

  openGraph: {
    type: "website",
    url: `${siteUrl}/sermons`,
    title: "Pastor Daniel Tiruwa Sermons",
    description:
      "Watch powerful sermons and Bible teachings from Pastor Daniel Tiruwa.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Pastor Daniel Tiruwa sermons",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Pastor Daniel Tiruwa Sermons",
    description:
      "Watch Bible teachings and sermons online",
    images: [ogImage],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function SermonsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/sermons#page`,
        url: `${siteUrl}/sermons`,
        name: "Pastor Daniel Tiruwa Sermons",
        description:
          "Watch sermons and Bible teachings from Pastor Daniel Tiruwa.",
        mainEntity: {
          "@type": "Person",
          "@id": `${siteUrl}/#person`,
          name: "Pastor Daniel Tiruwa",
          jobTitle: "Pastor",
          url: siteUrl,
        },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Pastor Daniel Tiruwa",
        url: siteUrl,
      },
    ],
  };

  const res = await publicAPI.getPageContentByPageName("sermons");
  const sermons = await publicAPI.getAllSermons(1, 10);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* SEO Content (IMPORTANT: make visible in UI ideally) */}
      <section>
        <h1>Pastor Daniel Tiruwa Sermons</h1>

        <p>
          Watch powerful Bible teachings and sermons from Pastor Daniel Tiruwa.
          These messages are designed to strengthen your faith, guide your
          spiritual journey, and deepen your understanding of God’s Word.
        </p>
      </section>

      <SermonsClient
        sermons={sermons.data}
        pagination={sermons.pagination}
        content={res}
      />
    </>
  );
}