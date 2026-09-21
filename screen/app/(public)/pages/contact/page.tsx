// app/(public)/contact/page.tsx
import { publicAPI } from '@/app/API/public.api';
import ContactClient from '@/app/Components/pages/Contact/ContactClient';
import type { Metadata } from 'next';
import { SITE_URL, ogImages, primaryKeywords } from '@/app/SEO/siteConfig';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: 'Contact Pastor Daniel Tiruwa | Official Contact Page',

  description:
    'Contact Pastor Daniel Tiruwa for ministry inquiries, prayer requests, and speaking engagements. Connect directly with Pastor Daniel Tiruwa and Light to the Nations Emmanuel Church.',

  keywords: [
    ...primaryKeywords,
    'Contact Pastor Daniel Tiruwa',
    'Pastor Daniel Tiruwa contact',
    'Daniel Tiruwa ministry contact',
    'Pastor Daniel Tiruwa prayer request',
    'contact church Nepal',
  ],

  alternates: { canonical: '/contact' },

  openGraph: {
    type: 'website',
    url: `${SITE_URL}/contact`,
    title: 'Contact Pastor Daniel Tiruwa',
    description:
      'Reach out to Pastor Daniel Tiruwa for prayer requests, ministry, and speaking engagements.',
    images: [
      {
        url: ogImages.contact,
        width: 1200,
        height: 630,
        alt: 'Contact Pastor Daniel Tiruwa',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Contact Pastor Daniel Tiruwa',
    description: 'Official contact page for Pastor Daniel Tiruwa ministry',
    images: [ogImages.contact],
  },

  robots: { index: true, follow: true },
};

export const revalidate = 600;

export default async function ContactPage() {
  try {
    const content = await publicAPI.getPageContentByPageName('contact', {
      next: { revalidate: 600 },
    });

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ContactPage',
          '@id': `${SITE_URL}/contact#page`,
          url: `${SITE_URL}/contact`,
          name: 'Contact Pastor Daniel Tiruwa',
          description:
            'Contact page for Pastor Daniel Tiruwa Ministry and Light to the Nations Emmanuel Church.',
          about: { '@id': `${SITE_URL}/#person` },
          isPartOf: { '@id': `${SITE_URL}/#website` },
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: ogImages.contact,
          },
          inLanguage: 'en',
        },
        {
          '@type': 'Person',
          '@id': `${SITE_URL}/#person`,
          name: 'Pastor Daniel Tiruwa',
          url: SITE_URL,
          jobTitle: 'Senior Pastor',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
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
        <ContactClient content={content} />
      </>
    );
  } catch (error) {
    console.error('[ContactPage]', error);
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-semibold">Contact Pastor Daniel Tiruwa</h1>
        <p className="text-gray-500 mt-2">Failed to load contact information. Please refresh.</p>
      </div>
    );
  }
}