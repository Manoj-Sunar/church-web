import { publicAPI } from '@/app/API/public.api';
import AboutClient from '@/app/Components/pages/About/AboutClient';
import type { Metadata } from 'next';

const siteUrl = 'https://lighttothenationsemmanuel.org';
const ogImage = `${siteUrl}/og/pastor-daniel-tiruwa-about.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "About Pastor Daniel Tiruwa | Biography & Ministry",

  description:
    "Learn about Pastor Daniel Tiruwa, his life, calling, and ministry. Discover his mission, leadership, and teachings.",

  keywords: [
    "Pastor Daniel Tiruwa",
    "Daniel Tiruwa biography",
    "About Pastor Daniel Tiruwa",
    "Pastor Daniel Tiruwa ministry",
    "Nepali pastor Daniel Tiruwa",
  ],

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    type: "profile",
    url: `${siteUrl}/about`,
    title: "About Pastor Daniel Tiruwa | Biography & Ministry",
    description:
      "Explore the life, ministry, and calling of Pastor Daniel Tiruwa.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Pastor Daniel Tiruwa biography",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Pastor Daniel Tiruwa",
    description: "Biography and ministry of Pastor Daniel Tiruwa",
    images: [ogImage],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/about#profile`,
        url: `${siteUrl}/about`,
        name: "About Pastor Daniel Tiruwa",
        mainEntity: {
          "@type": "Person",
          "@id": `${siteUrl}/#person`,
          name: "Pastor Daniel Tiruwa",
          jobTitle: "Pastor",
          description:
            "Pastor Daniel Tiruwa is a Christian leader known for his teachings, sermons, and ministry work.",
          image: `${siteUrl}/og/pastor-daniel-tiruwa.png`,
          sameAs: [
            "https://www.facebook.com/yourpage",
            "https://www.youtube.com/yourchannel",
          ],
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
    const [res, leaders] = await Promise.all([
      publicAPI.getPageContentByPageName("about"),
      publicAPI.getAllLeaders(),
    ]);

    return (
      <>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* SEO Content (IMPORTANT: make visible in real UI if possible) */}
        <section style={{ display: "none" }}>
          <h1>About Pastor Daniel Tiruwa</h1>
          <p>
            Pastor Daniel Tiruwa is a dedicated Christian leader known for his
            powerful sermons, teachings, and ministry work. Learn about Pastor
            Daniel Tiruwa’s journey, calling, and mission.
          </p>
        </section>

        <AboutClient content={res} leaders={leaders.data} />
      </>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}