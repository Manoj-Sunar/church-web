// app/SEO/JsonLd.tsx
import React from 'react';
import { SITE_URL, ogImages, socialLinks } from './siteConfig';

interface JsonLdProps {
  data: Record<string, any> | Record<string, any>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Combined schemas component for homepage
export function HomePageJsonLd() {
  const schemas = [
    // Organization
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Pastor Daniel Tiruwa Ministry',
      alternateName: [
        'Light to the Nations Emmanuel Church',
        'Daniel Tiruwa Ministry',
      ],
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: ogImages.home,
        width: 1200,
        height: 630,
      },
      description:
        'Official ministry of Pastor Daniel Tiruwa and Light to the Nations Emmanuel Church. Dedicated to spreading the gospel through children ministry, village ministry, and city ministry.',
      founder: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Pastor Daniel Tiruwa',
      },
      sameAs: socialLinks,
    },
    // Person
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Pastor Daniel Tiruwa',
      alternateName: ['Daniel Tiruwa', 'Pastor Tiruwa'],
      url: SITE_URL,
      jobTitle: 'Senior Pastor',
      description:
        'Pastor Daniel Tiruwa is a Christian leader and founder of Light to the Nations Emmanuel Church, known for powerful sermons and Bible teachings.',
      image: ogImages.home,
      worksFor: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
      },
      knowsAbout: [
        'Christian Ministry',
        'Bible Teaching',
        'Children Ministry',
        'Village Ministry',
        'City Ministry',
      ],
      sameAs: socialLinks,
    },
    // WebSite
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Pastor Daniel Tiruwa Ministry',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
    },
    // Church
    {
      '@context': 'https://schema.org',
      '@type': 'Church',
      '@id': `${SITE_URL}/#church`,
      name: 'Light to the Nations Emmanuel Church',
      alternateName: 'Pastor Daniel Tiruwa Ministry',
      url: SITE_URL,
      founder: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
      },
      sameAs: socialLinks,
    },
  ];

  return <JsonLd data={schemas} />;
}