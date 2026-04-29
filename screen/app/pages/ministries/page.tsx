// app/ministries/page.tsx

import { publicAPI } from "@/app/API/public.api";
import MinistriesClient from "@/app/Components/pages/Ministry/MinistryClient";
import type { Metadata } from "next";

const siteUrl = "https://lighttothenationsemmanuel.org";
const ogImage = `${siteUrl}/og/pastor-daniel-tiruwa-ministries.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "Pastor Daniel Tiruwa Ministries | Programs & Services",

  description:
    "Explore ministries led by Pastor Daniel Tiruwa. Discover programs, services, and opportunities to grow, serve, and connect.",

  keywords: [
    "Pastor Daniel Tiruwa ministries",
    "Daniel Tiruwa ministry programs",
    "Christian ministries Nepal Pastor Daniel Tiruwa",
    "church ministries Pastor Daniel Tiruwa",
  ],

  alternates: {
    canonical: "/ministries",
  },

  openGraph: {
    type: "website",
    url: `${siteUrl}/ministries`,
    title: "Pastor Daniel Tiruwa Ministries",
    description:
      "Explore ministry programs and services led by Pastor Daniel Tiruwa.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Pastor Daniel Tiruwa ministries",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Pastor Daniel Tiruwa Ministries",
    description: "Ministry programs and services",
    images: [ogImage],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function MinistriesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/ministries#ministries`,
        url: `${siteUrl}/ministries`,
        name: "Pastor Daniel Tiruwa Ministries",
        description:
          "Ministry programs and services led by Pastor Daniel Tiruwa.",
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
      },
    ],
  };

  try {
    const [res, ministry] = await Promise.all([
      publicAPI.getPageContentByPageName("ministries"),
      publicAPI.getAllMinistry(),
    ]);

    return (
      <>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* SEO reinforcement (better to show in UI) */}
        <section style={{ display: "none" }}>
          <h1>Pastor Daniel Tiruwa Ministries</h1>
          <p>
            Explore ministries led by Pastor Daniel Tiruwa. Discover programs,
            services, and opportunities to grow spiritually, serve the community,
            and connect with Pastor Daniel Tiruwa ministry.
          </p>
        </section>

        <MinistriesClient
          content={res}
          ministry={ministry.data}
          pagination={ministry.pagination}
        />
      </>
    );
  } catch (error) {
        console.error(error);

    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <p className="text-gray-500 mt-2">
          Failed to load ministries.
        </p>
      </div>
    );
  }
}