import type { Metadata } from "next";


import HomeView from "@/app/Components/pages/Home/HomeClient";
import { publicAPI } from "@/app/API/public.api";

const siteUrl = "https://lighttothenationsemmanuel.org";
const ogImage = `${siteUrl}/og/home.png`;

export const metadata: Metadata = {
  title: "Light To The Nations Emanuel Church | Home",
  description:
    "Join Light To The Nations Emanuel Church—worship, sermons, ministries, and community events.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Light To The Nations Emanuel Church",
    description:
      "Worship with us, watch sermons, join ministries, and be part of a welcoming church family.",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Church community worship" }],
  },
};

export default async function IndexPage() {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: "Light To The Nations Emanuel Church",
    url: siteUrl,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <HomeView
          content={res}
          ministry={ministries?.data}
          analytics={publicAnalytics}
          mission={mission.data.about?.missionContent || []}
        />
      </>
    );
  } catch (error) {

  }




}