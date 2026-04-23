// app/ministries/page.tsx
import { publicAPI } from "@/app/API/public.api";
import MinistriesClient from "@/app/Components/pages/Ministry/MinistryClient";
import type { Metadata } from "next";


const siteName = "Light To The Nations Emanuel Church";
const siteUrl = "https://lighttothenationsemmanuel.org"; // change to your real domain

export const metadata: Metadata = {
    title: `Ministries | ${siteName}`,
    description:
        "Discover ministries at Light To The Nations. Find where you can grow, serve, and connect with the church community.",
    alternates: { canonical: `${siteUrl}/ministries` },
    openGraph: {
        title: `Ministries | ${siteName}`,
        description:
            "Discover ministries at Light To The Nations. Find where you can grow, serve, and connect with the church community.",
        url: `${siteUrl}/ministries`,
        siteName,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: `Ministries | ${siteName}`,
        description:
            "Discover ministries at Light To The Nations. Find where you can grow, serve, and connect with the church community.",
    },
};

export default async function MinistriesPage() {
    try {
        const [res, ministry] = await Promise.all([
            publicAPI.getPageContentByPageName("ministries"), // ✅ FIXED
            publicAPI.getAllMinistry(),
        ]);

        return (
            <MinistriesClient
                content={res}
                ministry={ministry.data}
                pagination={ministry.pagination}
            />
        );
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