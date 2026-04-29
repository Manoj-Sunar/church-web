// app/events/page.tsx

import { publicAPI } from "@/app/API/public.api";
import EventsClient from "@/app/Components/pages/Events/EventsClient";
import type { Metadata } from "next";

const siteUrl = "https://lighttothenationsemmanuel.org";
const ogImage = `${siteUrl}/og/pastor-daniel-tiruwa-events.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "Pastor Daniel Tiruwa Events | Ministry & Programs",

  description:
    "Explore upcoming events, programs, and gatherings led by Pastor Daniel Tiruwa. Join services, fellowships, and ministry events.",

  keywords: [
    "Pastor Daniel Tiruwa events",
    "Daniel Tiruwa programs",
    "Pastor Daniel Tiruwa ministry events",
    "Christian events Nepal pastor Daniel Tiruwa",
  ],

  alternates: {
    canonical: "/events",
  },

  openGraph: {
    type: "website",
    url: `${siteUrl}/events`,
    title: "Pastor Daniel Tiruwa Events",
    description:
      "Join events and ministry programs led by Pastor Daniel Tiruwa.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Pastor Daniel Tiruwa events",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Pastor Daniel Tiruwa Events",
    description:
      "Upcoming ministry events and gatherings",
    images: [ogImage],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function EventsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/events#events`,
        url: `${siteUrl}/events`,
        name: "Pastor Daniel Tiruwa Events",
        description:
          "Upcoming events and ministry programs led by Pastor Daniel Tiruwa.",
        mainEntity: {
          "@type": "Person",
          "@id": `${siteUrl}/#person`,
          name: "Pastor Daniel Tiruwa",
          jobTitle: "Pastor",
        },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Pastor Daniel Tiruwa",
        url: siteUrl,
      }
    ],
  };

  try {
    const [content, events] = await Promise.all([
      publicAPI.getPageContentByPageName("events"),
      publicAPI.getAllEvents(),
    ]);

    return (
      <>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* SEO reinforcement (better to make visible in UI) */}
        <section style={{ display: "none" }}>
          <h1>Pastor Daniel Tiruwa Events</h1>
          <p>
            Explore upcoming events, fellowships, and ministry programs led by
            Pastor Daniel Tiruwa. Join Pastor Daniel Tiruwa in worship,
            teachings, and community gatherings.
          </p>
        </section>

        <EventsClient
          events={events.data}
          contents={content}
          pagination={events.pagination}
        />
      </>
    );
  } catch (error) {
    console.error(error);

    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <p className="text-gray-500 mt-2">
          Failed to load events.
        </p>
      </div>
    );
  }
}