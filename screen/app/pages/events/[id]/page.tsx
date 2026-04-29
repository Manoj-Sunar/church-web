import { publicAPI } from "@/app/API/public.api";
import EventDetailClient from "@/app/Components/pages/Events/EventClientDetails";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const siteUrl = "https://lighttothenationsemmanuel.org";

// ✅ Dynamic SEO Metadata
export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;

    try {
        const res = await publicAPI.getEventById(id);
        const event = res.data;

        const title = `${event?.title} | Pastor Daniel Tiruwa Event`;
        const description =
            event?.description?.slice(0, 160) ||
            "Join this event led by Pastor Daniel Tiruwa.";

        const image = event?.image.url || `${siteUrl}/og/pastor-daniel-tiruwa-events.png`;

        return {
            metadataBase: new URL(siteUrl),

            title,
            description,

            keywords: [
                event?.title,
                "Pastor Daniel Tiruwa event",
                "Daniel Tiruwa ministry event",
                "Christian event Nepal",
            ],

            alternates: {
                canonical: `/events/${id}`,
            },

            openGraph: {
                type: "article",
                url: `${siteUrl}/events/${id}`,
                title,
                description,
                images: [
                    {
                        url: image,
                        width: 1200,
                        height: 630,
                        alt: `${event?.title} - Pastor Daniel Tiruwa`,
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
            title: "Event Not Found | Pastor Daniel Tiruwa",
            description: "This event does not exist.",
        };
    }
}

// ✅ Page Component
const EventClientDetails = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;

    try {
        const res = await publicAPI.getEventById(id, {
            next: { revalidate: 60 },
        });

        const event = res.data;

        if (!event) return notFound();

        // ✅ Structured Data (VERY IMPORTANT)
        const jsonLd = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Event",
                    name: event.title,
                    startDate: event.date || new Date().toISOString(),

                    eventAttendanceMode:
                        "https://schema.org/OfflineEventAttendanceMode",
                    eventStatus: "https://schema.org/EventScheduled",
                    description: event.description,
                    image: event.image,
                    location: {
                        "@type": "Place",
                        name: event.location || "Event Location",
                    },
                    organizer: {
                        "@type": "Person",
                        "@id": `${siteUrl}/#person`,
                        name: "Pastor Daniel Tiruwa",
                    },
                    url: `${siteUrl}/events/${id}`,
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

                {/* SEO reinforcement (make visible in UI ideally) */}
                <section style={{ display: "none" }}>
                    <h1>{event.title} - Pastor Daniel Tiruwa Event</h1>
                    <p>
                        Join {event.title}, a special event led by Pastor Daniel Tiruwa.
                        Participate in this ministry gathering, teachings, and fellowship.
                    </p>
                </section>

                <EventDetailClient event={event} />
            </>
        );
    } catch (error) {
        console.error("Event fetch error:", error);
        return notFound();
    }
};

export default EventClientDetails;