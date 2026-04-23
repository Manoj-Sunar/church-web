// app/contact/page.tsx
import { publicAPI } from "@/app/API/public.api";
import ContactClient from "@/app/Components/pages/Contact/ContactClient";
import type { Metadata } from "next";


const siteName = "Light To The Nations Emanuel Church";
const siteUrl = "https://lighttothenationsemmanuel.org"; // change

export const metadata: Metadata = {
  title: `Contact Us | ${siteName}`,
  description:
    "Contact Light To The Nations Emanuel Church. Send a message, request prayer, ask about volunteering, or get directions.",
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: `Contact Us | ${siteName}`,
    description:
      "Contact Light To The Nations Emanuel Church. Send a message, request prayer, ask about volunteering, or get directions.",
    url: `${siteUrl}/contact`,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact Us | ${siteName}`,
    description:
      "Contact Light To The Nations Emanuel Church. Send a message, request prayer, ask about volunteering, or get directions.",
  },
};

export default async function ContactPage() {
  try {
    const res = await publicAPI.getPageContentByPageName("contact");
    return <ContactClient content={res} />;
  } catch (error) {

  }

}