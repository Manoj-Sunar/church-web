// app/events/page.tsx
import { publicAPI } from "@/app/API/public.api";
import EventsClient from "@/app/Components/pages/Events/EventsClient";
import type { Metadata } from "next";


const siteName = "Light To The Nations Emanuel Church";
const siteUrl = "https://lighttothenationsemmanuel.org"; // change

export const metadata: Metadata = {
  title: `Events | ${siteName}`,
  description:
    "Join us for upcoming fellowship, worship, and community events at Light To The Nations Emanuel Church.",
  alternates: { canonical: `${siteUrl}/events` },
  openGraph: {
    title: `Events | ${siteName}`,
    description:
      "Join us for upcoming fellowship, worship, and community events at Light To The Nations Emanuel Church.",
    url: `${siteUrl}/events`,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Events | ${siteName}`,
    description:
      "Join us for upcoming fellowship, worship, and community events at Light To The Nations Emanuel Church.",
  },
};

export default async function EventsPage() {
  try {

    const [content, events] = await Promise.all([
      publicAPI.getPageContentByPageName("events"),
      publicAPI.getAllEvents(),
    ]);

    return <EventsClient events={events.data} contents={content} pagination={events.pagination} />;

  } catch (error) {
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