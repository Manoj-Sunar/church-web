// app/sitemap.ts
import { MetadataRoute } from 'next';
import { SITE_URL } from './SEO/siteConfig';

export const revalidate = 3600; // regenerate hourly

/**
 * ✅ Stable build date for static pages.
 * Using `new Date()` on every regeneration makes Google think
 * static pages change every hour — which dilutes the `lastmod` signal.
 * Update this date manually only when you actually change static page content.
 */
const BUILD_DATE = new Date('2026-09-24T00:00:00.000Z');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: BUILD_DATE, changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/sermons`, lastModified: BUILD_DATE, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/ministries`, lastModified: BUILD_DATE, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/events`, lastModified: BUILD_DATE, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/donate`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const dynamic: MetadataRoute.Sitemap = [];

  try {
    // Lazy import inside try so if env is missing we don't crash the build
    const { publicAPI } = await import('@/app/API/public.api');

    const [sermons, ministries, events] = await Promise.allSettled([
      publicAPI.getAllSermons(1, 100),
      publicAPI.getAllMinistry(1, 100),
      publicAPI.getAllEvents({}),
    ]);

    if (sermons.status === 'fulfilled' && sermons.value?.data) {
      dynamic.push(
        ...sermons.value.data.map((s: any) => ({
          url: `${SITE_URL}/sermons/${s._id}`,
          lastModified: new Date(s.updatedAt || s.date || Date.now()),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        })),
      );
    }

    if (ministries.status === 'fulfilled' && ministries.value?.data) {
      dynamic.push(
        ...ministries.value.data.map((m: any) => ({
          url: `${SITE_URL}/ministries/${m._id}`,
          lastModified: new Date(m.updatedAt || Date.now()),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        })),
      );
    }

    if (events.status === 'fulfilled' && events.value?.data) {
      dynamic.push(
        ...events.value.data.map((e: any) => ({
          url: `${SITE_URL}/events/${e._id}`,
          lastModified: new Date(e.updatedAt || e.date || Date.now()),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        })),
      );
    }
  } catch (error) {
    console.error('[sitemap] Failed to fetch dynamic data:', error);
  }

  return [...staticPages, ...dynamic];
}