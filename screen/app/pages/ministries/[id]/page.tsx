// app/ministries/[id]/page.tsx
import { publicAPI } from "@/app/API/public.api";
import MinistryDetailClient from "@/app/Components/pages/Ministry/MinistryDetailsClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";



// Optional: generate SEO metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {

  const { id } = await params;
  try {
    const res = await publicAPI.getMinistryById(id);

    if (!res?.data) return { title: "Ministry Not Found" };

    const ministry = res.data;

    return {
      title: ministry.name,
      description: ministry.description,
      openGraph: {
        title: ministry.name,
        description: ministry.description,
        images: ministry.image?.url
          ? [
            {
              url: ministry.image.url||"",
              width: 800,
              height: 600,
              alt: ministry.name,
            },
          ]
          : [],
      },
    };
  } catch {
    return { title: "Ministry" };
  }
}

const MinistryDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  try {
    // Fetch ministry data from public API
    const res = await publicAPI.getMinistryById(id);

    // If no data found, redirect to 404 page
    if (!res?.data) return notFound();

    // Render client component with ministry data
    return <MinistryDetailClient ministry={res.data} />;
  } catch (error) {
    console.error("Ministry fetch error:", error);

    // Fallback to 404 page on error
    return notFound();
  }
};

export default MinistryDetailPage;