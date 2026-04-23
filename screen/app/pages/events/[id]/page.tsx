import { publicAPI } from "@/app/API/public.api";
import EventDetailClient from "@/app/Components/pages/Events/EventClientDetails";
import { Metadata } from "next";
import { notFound } from "next/navigation";



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

        return {
            title: event?.title || "Event Details",
            description: event?.description?.slice(0, 150),
            openGraph: {
                title: event?.title,
                description: event?.description,
                images: [event?.image],
            },
        };
    } catch {
        return {
            title: "Event Not Found",
            description: "This event does not exist",
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
            next: { revalidate: 60 }, // ISR (cache for 60s)
        });

        const event = res.data;

        if (!event) return notFound();

        return <EventDetailClient event={event} />;
    } catch (error) {
        console.error("Event fetch error:", error);

        // Optional: redirect to 404 page
        return notFound();
    }
};

export default EventClientDetails;