// app/ministries/[id]/page.tsx

import { publicAPI } from "@/app/API/public.api";
import MinistryDetailClient from "@/app/Components/pages/Ministry/MinistryDetailsClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const siteUrl = "https://lighttothenationsemmanuel.org";

// ✅ Dynamic SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await publicAPI.getMinistryById(id);

    if (!res?.data) {
      return {
        title: "Ministry Not Found | Pastor Daniel Tiruwa",
      };
    }

    const ministry = res.data;

    const title = `${ministry.name} | Pastor Daniel Tiruwa Ministry`;
    const description =
      ministry.description?.slice(0, 160) ||
      "Explore ministry led by Pastor Daniel Tiruwa.";

    const image = ministry.image?.url || `${siteUrl}/og/ministries.png`;

    return {
      metadataBase: new URL(siteUrl),

      title,
      description,

      keywords: [
        ministry.name,
        "Pastor Daniel Tiruwa ministry",
        "Daniel Tiruwa ministries",
        "Christian ministry Nepal",
      ],

      alternates: {
        canonical: `/ministries/${id}`,
      },

      openGraph: {
        type: "article",
        url: `${siteUrl}/ministries/${id}`,
        title,
        description,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: ministry.name,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },

      robots: {
        index: true,
        follow: true,
      },
    };
  } catch {
    return {
      title: "Ministry | Pastor Daniel Tiruwa",
    };
  }
}

// ✅ Page Component
const MinistryDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  try {
    const res = await publicAPI.getMinistryById(id);

    if (!res?.data) return notFound();

    const ministry = res.data;

    // ✅ Structured Data (VERY IMPORTANT)
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "@id": `${siteUrl}/ministries/${id}#ministry`,
          url: `${siteUrl}/ministries/${id}`,
          name: ministry.name,
          description: ministry.description,
          image: ministry.image?.url,
          author: {
            "@type": "Person",
            "@id": `${siteUrl}/#person`,
            name: "Pastor Daniel Tiruwa",
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

    return (
      <>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* SEO reinforcement (IMPORTANT: better make visible) */}
        <section style={{ display: "none" }}>
          <h1>{ministry.name} - Pastor Daniel Tiruwa Ministry</h1>
          <p>
            {ministry.name} is part of the ministry led by Pastor Daniel Tiruwa.
            Explore teachings, service, and spiritual growth through this ministry.
          </p>
        </section>

        <MinistryDetailClient ministry={ministry} />
      </>
    );
  } catch (error) {
    console.error("Ministry fetch error:", error);
    return notFound();
  }
};

export default MinistryDetailPage;