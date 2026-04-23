// app/donate/page.tsx
import { publicAPI } from "@/app/API/public.api";
import DonateClient from "@/app/Components/pages/Give/GiveClient";
import type { Metadata } from "next";


const siteName = "Light To The Nations Emanuel Church";
const siteUrl = "https://lighttothenationsemmanuel.org"; // change

export const metadata: Metadata = {
  title: `Donate | ${siteName}`,
  description:
    "Support our mission through giving. Your donation helps ministry operations, community care, global missions, and special projects.",
  alternates: { canonical: `${siteUrl}/donate` },
  openGraph: {
    title: `Donate | ${siteName}`,
    description:
      "Support our mission through giving. Your donation helps ministry operations, community care, global missions, and special projects.",
    url: `${siteUrl}/donate`,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Donate | ${siteName}`,
    description:
      "Support our mission through giving. Your donation helps ministry operations, community care, global missions, and special projects.",
  },
};

export default async function DonatePage() {

  try {
    const res = await publicAPI.getPageContentByPageName("donate");
    return <DonateClient content={res} />;
  } catch (error) {

  }

}