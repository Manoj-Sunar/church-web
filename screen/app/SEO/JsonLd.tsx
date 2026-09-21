// app/SEO/JsonLd.tsx
import React from 'react';

interface JsonLdProps {
  data: Record<string, any> | Record<string, any>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
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
      '@id': 'https://pastordanieltiruwaministry.org.np/#organization',
      name: 'Pastor Daniel Tiruwa Ministry',
      alternateName: [
        'Light to the Nations Emmanuel Church',
        'Daniel Tiruwa Ministry',
      ],
      url: 'https://pastordanieltiruwaministry.org.np',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pastordanieltiruwaministry.org.np/og/pastor-daniel-tiruwa.png',
        width: 1200,
        height: 630,
      },
      description: 'Official ministry of Pastor Daniel Tiruwa and Light to the Nations Emmanuel Church. Dedicated to spreading the gospel through children ministry, village ministry, and city ministry.',
      founder: {
        '@type': 'Person',
        '@id': 'https://pastordanieltiruwaministry.org.np/#person',
        name: 'Pastor Daniel Tiruwa',
      },
      sameAs: [
        'https://www.facebook.com/pastordanieltiruwa',
        'https://www.youtube.com/@pastordanieltiruwa',
      ],
    },
    // Person
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://pastordanieltiruwaministry.org.np/#person',
      name: 'Pastor Daniel Tiruwa',
      alternateName: ['Daniel Tiruwa', 'Pastor Tiruwa'],
      url: 'https://pastordanieltiruwaministry.org.np',
      jobTitle: 'Senior Pastor',
      description: 'Pastor Daniel Tiruwa is a Christian leader and founder of Light to the Nations Emmanuel Church, known for powerful sermons and Bible teachings.',
      image: 'https://pastordanieltiruwaministry.org.np/og/pastor-daniel-tiruwa.png',
      worksFor: {
        '@type': 'Organization',
        '@id': 'https://pastordanieltiruwaministry.org.np/#organization',
      },
      knowsAbout: [
        'Christian Ministry',
        'Bible Teaching',
        'Children Ministry',
        'Village Ministry',
        'City Ministry',
      ],
    },
    // WebSite
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://pastordanieltiruwaministry.org.np/#website',
      url: 'https://pastordanieltiruwaministry.org.np',
      name: 'Pastor Daniel Tiruwa Ministry',
      publisher: {
        '@id': 'https://pastordanieltiruwaministry.org.np/#organization',
      },
    },
    // Church
    {
      '@context': 'https://schema.org',
      '@type': 'Church',
      '@id': 'https://pastordanieltiruwaministry.org.np/#church',
      name: 'Light to the Nations Emmanuel Church',
      alternateName: 'Pastor Daniel Tiruwa Ministry',
      url: 'https://pastordanieltiruwaministry.org.np',
      founder: {
        '@type': 'Person',
        '@id': 'https://pastordanieltiruwaministry.org.np/#person',
      },
    },
  ];

  return <JsonLd data={schemas} />;
}