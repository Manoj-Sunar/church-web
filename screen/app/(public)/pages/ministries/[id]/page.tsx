// app/(public)/ministries/[id]/page.tsx
import { publicAPI } from '@/app/API/public.api';
import MinistryDetailClient from '@/app/Components/pages/Ministry/MinistryDetailsClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SITE_URL, ogImages } from '@/app/SEO/siteConfig';

export const revalidate = 600;

export async function generateStaticParams() {
  try {
    const res = await publicAPI.getAllMinistry(1, 100);
    return (res?.data ?? []).map((m: any) => ({ id: String(m._id) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await publicAPI.getMinistryById(id);

    if (!res?.data) {
      return { title: 'Ministry Not Found | Pastor Daniel Tiruwa Ministry' };
    }

    const ministry = res.data;
    const title = `${ministry.name} | Pastor Daniel Tiruwa Ministry`;
    const description =
      ministry.description?.slice(0, 160) ||
      `Explore ${ministry.name} — a ministry led by Pastor Daniel Tiruwa.`;
    const image = ministry.image?.url || ogImages.ministries;

    return {
      metadataBase: new URL(SITE_URL),
      title,
      description,
      keywords: [
        ministry.name,
        `${ministry.name} ministry`,
        'Pastor Daniel Tiruwa ministry',
        'Daniel Tiruwa ministries',
        'Christian ministry Nepal',
        ministry.leader,
      ],
      alternates: { canonical: `/ministries/${id}` },
      openGraph: {
        type: 'article',
        url: `${SITE_URL}/ministries/${id}`,
        title,
        description,
        siteName: 'Pastor Daniel Tiruwa Ministry',
        images: [{ url: image, width: 1200, height: 630, alt: ministry.name }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
      },
      robots: { index: true, follow: true },
    };
  } catch {
    return { title: 'Ministry | Pastor Daniel Tiruwa' };
  }
}

export default async function MinistryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const res = await publicAPI.getMinistryById(id, { next: { revalidate: 600 } });

    if (!res?.data) return notFound();

    const ministry = res.data;

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/ministries/${id}#ministry`,
          name: ministry.name,
          description: ministry.description,
          url: `${SITE_URL}/ministries/${id}`,
          image: ministry.image?.url,
          parentOrganization: { '@id': `${SITE_URL}/#organization` },
          leader: {
            '@type': 'Person',
            name: ministry.leader,
          },
          founder: {
            '@type': 'Person',
            '@id': `${SITE_URL}/#person`,
            name: 'Pastor Daniel Tiruwa',
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Ministries', item: `${SITE_URL}/ministries` },
            { '@type': 'ListItem', position: 3, name: ministry.name, item: `${SITE_URL}/ministries/${id}` },
          ],
        },
      ],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MinistryDetailClient ministry={ministry} />
      </>
    );
  } catch (error) {
    console.error('[MinistryDetailPage]', error);
    return notFound();
  }
}