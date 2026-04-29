// app/contact/page.tsx

import { publicAPI } from "@/app/API/public.api";
import ContactClient from "@/app/Components/pages/Contact/ContactClient";
import type { Metadata } from "next";

const siteUrl = "https://lighttothenationsemmanuel.org";
const ogImage = `${siteUrl}/og/pastor-daniel-tiruwa-contact.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "Contact Pastor Daniel Tiruwa | Official Contact Page",

  description:
    "Contact Pastor Daniel Tiruwa for ministry inquiries, prayer requests, and speaking engagements. Connect directly with Pastor Daniel Tiruwa.",

  keywords: [
    "Contact Pastor Daniel Tiruwa",
    "Pastor Daniel Tiruwa contact",
    "Daniel Tiruwa ministry contact",
    "Pastor Daniel Tiruwa prayer request",
  ],

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    type: "website",
    url: `${siteUrl}/contact`,
    title: "Contact Pastor Daniel Tiruwa",
    description:
      "Reach out to Pastor Daniel Tiruwa for prayer requests, ministry, and speaking engagements.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Contact Pastor Daniel Tiruwa",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Pastor Daniel Tiruwa",
    description:
      "Official contact page for Pastor Daniel Tiruwa ministry",
    images: [ogImage],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${siteUrl}/contact#contact`,
        url: `${siteUrl}/contact`,
        name: "Contact Pastor Daniel Tiruwa",
        mainEntity: {
          "@type": "Person",
          "@id": `${siteUrl}/#person`,
          name: "Pastor Daniel Tiruwa",
          jobTitle: "Pastor",
          description:
            "Pastor Daniel Tiruwa is a Christian leader available for ministry, prayer, and speaking engagements.",
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
    const res = await publicAPI.getPageContentByPageName("contact");

    return (
      <>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* SEO reinforcement (make visible in UI ideally) */}
        <section style={{ display: "none" }}>
          <h1>Contact Pastor Daniel Tiruwa</h1>
          <p>
            Get in touch with Pastor Daniel Tiruwa for prayer requests,
            ministry inquiries, and speaking engagements. Connect with Pastor
            Daniel Tiruwa today.
          </p>
        </section>

        <ContactClient content={res} />
      </>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}