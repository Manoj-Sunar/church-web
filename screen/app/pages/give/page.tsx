// app/donate/page.tsx

import { publicAPI } from "@/app/API/public.api";
import DonateClient from "@/app/Components/pages/Give/GiveClient";
import type { Metadata } from "next";

const siteUrl = "https://lighttothenationsemmanuel.org";
const ogImage = `${siteUrl}/og/pastor-daniel-tiruwa-donate.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "Donate to Pastor Daniel Tiruwa Ministry | Support the Mission",

  description:
    "Support Pastor Daniel Tiruwa Ministry through donations. Help expand ministry work, community outreach, and global missions.",

  keywords: [
    "Donate Pastor Daniel Tiruwa",
    "Support Pastor Daniel Tiruwa ministry",
    "Christian ministry donation Nepal",
    "Pastor Daniel Tiruwa giving",
  ],

  alternates: {
    canonical: "/donate",
  },

  openGraph: {
    type: "website",
    url: `${siteUrl}/donate`,
    title: "Donate to Pastor Daniel Tiruwa Ministry",
    description:
      "Support the ministry of Pastor Daniel Tiruwa. Your giving helps expand outreach and impact lives.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Donate to Pastor Daniel Tiruwa Ministry",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Donate to Pastor Daniel Tiruwa Ministry",
    description:
      "Support the mission through giving",
    images: [ogImage],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function DonatePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DonateAction",
        name: "Donate to Pastor Daniel Tiruwa Ministry",
        target: `${siteUrl}/donate`,
        recipient: {
          "@type": "Person",
          "@id": `${siteUrl}/#person`,
          name: "Pastor Daniel Tiruwa",
        },
        description:
          "Support Pastor Daniel Tiruwa Ministry through donations and giving.",
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
    const res = await publicAPI.getPageContentByPageName("donate");

    return (
      <>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* SEO reinforcement (better to show in UI) */}
        <section style={{ display: "none" }}>
          <h1>Donate to Pastor Daniel Tiruwa Ministry</h1>
          <p>
            Support Pastor Daniel Tiruwa Ministry through your generous giving.
            Your donation helps expand ministry work, outreach, and impact lives.
          </p>
        </section>

        <DonateClient content={res} />
      </>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}