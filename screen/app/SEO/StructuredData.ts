// app/SEO/structuredData.ts

import { siteUrl } from "./Metadata";


// Organization Schema
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'Pastor Daniel Tiruwa Ministry',
  alternateName: [
    'Light to the Nations Emmanuel Church',
    'Daniel Tiruwa Ministry',
  ],
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/og/pastor-daniel-tiruwa.png`,
    width: 1200,
    height: 630,
  },
  description: 'Official ministry of Pastor Daniel Tiruwa. Light to the Nations Emmanuel Church is dedicated to spreading the gospel, teaching God\'s Word, and serving communities through children ministry, village ministry, city ministry, and various outreach programs.',
  founder: {
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: 'Pastor Daniel Tiruwa',
  },
  foundingDate: '2000',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'NP',
    addressLocality: 'Nepal',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+977-XXXXXXXXX',
    contactType: 'customer service',
    email: 'info@pastordanieltiruwaministry.org.np',
    availableLanguage: ['English', 'Nepali'],
  },
  sameAs: [
    'https://www.facebook.com/pastordanieltiruwa',
    'https://www.youtube.com/@pastordanieltiruwa',
    'https://www.instagram.com/pastordanieltiruwa',
  ],
};

// Person Schema for Pastor Daniel Tiruwa
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: 'Pastor Daniel Tiruwa',
  alternateName: ['Daniel Tiruwa', 'Pastor Tiruwa', 'Daniel'],
  url: siteUrl,
  jobTitle: 'Senior Pastor',
  description: 'Pastor Daniel Tiruwa is a dedicated Christian leader, preacher, and founder of Light to the Nations Emmanuel Church. He is known for his powerful sermons, Bible teachings, and commitment to spreading the gospel in Nepal and beyond.',
  image: {
    '@type': 'ImageObject',
    url: `${siteUrl}/og/pastor-daniel-tiruwa.png`,
    width: 1200,
    height: 630,
  },
  worksFor: {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'Light to the Nations Emmanuel Church',
  },
  nationality: {
    '@type': 'Country',
    name: 'Nepal',
  },
  knowsAbout: [
    'Christian Ministry',
    'Bible Teaching',
    'Pastoral Care',
    'Church Leadership',
    'Evangelism',
    'Children Ministry',
    'Village Ministry',
    'City Ministry',
  ],
  sameAs: [
    'https://www.facebook.com/pastordanieltiruwa',
    'https://www.youtube.com/@pastordanieltiruwa',
    'https://www.instagram.com/pastordanieltiruwa',
  ],
};

// Website Schema
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: 'Pastor Daniel Tiruwa Ministry',
  alternateName: 'Light to the Nations Emmanuel Church',
  description: 'Official website of Pastor Daniel Tiruwa Ministry',
  publisher: {
    '@id': `${siteUrl}/#organization`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/sermons?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: ['en', 'ne'],
};

// Local Business / Church Schema
export const churchSchema = {
  '@context': 'https://schema.org',
  '@type': 'Church',
  '@id': `${siteUrl}/#church`,
  name: 'Light to the Nations Emmanuel Church',
  alternateName: 'Pastor Daniel Tiruwa Ministry',
  url: siteUrl,
  logo: `${siteUrl}/og/pastor-daniel-tiruwa.png`,
  description: 'Light to the Nations Emmanuel Church, led by Pastor Daniel Tiruwa, is a vibrant Christian community dedicated to worship, Bible teaching, and community outreach through children ministry, village ministry, and city ministry.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'NP',
    addressLocality: 'Nepal',
  },
  founder: {
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: 'Pastor Daniel Tiruwa',
  },
  sameAs: [
    'https://www.facebook.com/pastordanieltiruwa',
    'https://www.youtube.com/@pastordanieltiruwa',
  ],
};

// Breadcrumb Schema Generator
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

// Article Schema for Sermons
export function generateSermonSchema(sermon: {
  title: string;
  description: string;
  date: string;
  videoUrl?: string;
  speaker: string;
  id: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: sermon.title,
    description: sermon.description,
    uploadDate: sermon.date,
    contentUrl: sermon.videoUrl,
    embedUrl: sermon.videoUrl,
    thumbnailUrl: `${siteUrl}/og/sermon-default.png`,
    author: {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Pastor Daniel Tiruwa',
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Pastor Daniel Tiruwa Ministry',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/sermons/${sermon.id}`,
    },
  };
}

// Event Schema
export function generateEventSchema(event: {
  title: string;
  description: string;
  date: string;
  location: string;
  image?: { url: string };
  id: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.date,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'NP',
      },
    },
    image: event.image?.url,
    organizer: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Pastor Daniel Tiruwa Ministry',
    },
    performer: {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Pastor Daniel Tiruwa',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/events/${event.id}`,
    },
  };
}

// Ministry Schema
export function generateMinistrySchema(ministry: {
  name: string;
  description: string;
  leader: string;
  id: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ministry.name,
    description: ministry.description,
    parentOrganization: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Pastor Daniel Tiruwa Ministry',
    },
    leader: {
      '@type': 'Person',
      name: ministry.leader,
    },
    url: `${siteUrl}/ministries/${ministry.id}`,
  };
}