import type { Metadata } from "next";

import HomeView from "@/app/Components/pages/Home/HomeClient";
import { publicAPI } from "@/app/API/public.api";

const siteUrl = "https://lighttothenationsemmanuel.org";
const ogImage = `${siteUrl}/og/pastor-daniel-tiruwa.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Pastor Daniel Tiruwa | Official Website",
    template: "%s | Pastor Daniel Tiruwa",
  },

  description:
    "Official website of Pastor Daniel Tiruwa. Watch sermons, teachings, and connect with the ministry.",

  keywords: [
    "Pastor Daniel Tiruwa",
    "Daniel Tiruwa",
    "Pastor Daniel Tiruwa sermons",
    "Daniel Tiruwa ministry",
    "Nepali pastor Daniel Tiruwa",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Pastor Daniel Tiruwa | Official Website",
    description:
      "Official Pastor Daniel Tiruwa website. Watch sermons and explore ministry work.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Pastor Daniel Tiruwa preaching",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Pastor Daniel Tiruwa",
    description: "Official website and sermons",
    images: [ogImage],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function IndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Pastor Daniel Tiruwa",
        url: siteUrl,
        jobTitle: "Pastor",
        image: ogImage,
        description:
          "Pastor Daniel Tiruwa is a Christian leader sharing sermons, teachings, and ministry work.",
        sameAs: [
          "https://www.facebook.com/yourpage",
          "https://www.youtube.com/yourchannel",
        ],
      },
      {
        "@type": "Organization",
        name: "Pastor Daniel Tiruwa Ministry",
        url: siteUrl,
      },
    ],
  };

  try {
    const [res, ministries, publicAnalytics, mission] = await Promise.all([
      publicAPI.getPageContentByPageName("home"),
      publicAPI.getAllMinistry(1, 3),
      publicAPI.getPublicAnalytics(),
      publicAPI.getPageContentByPageName("about"),
    ]);

    return (
      <>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* IMPORTANT: Add visible SEO content */}
        <section style={{ display: "none" }}>
          <h1>Pastor Daniel Tiruwa</h1>
          <p>
            Official website of Pastor Daniel Tiruwa. Watch sermons, explore
            ministry work, and stay connected with Pastor Daniel Tiruwa.
          </p>
        </section>

        <HomeView
          content={res}
          ministry={ministries?.data}
          analytics={publicAnalytics}
          mission={mission.data.about?.missionContent || []}
        />
      </>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}