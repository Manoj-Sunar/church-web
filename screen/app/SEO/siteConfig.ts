// app/SEO/siteConfig.ts

/**
 * ⚠️ IMPORTANT — Change this ONE value after you attach your domain.
 * While on Vercel, keep this as the vercel.app URL.
 * After domain: set to 'https://pastordanieltiruwaministry.org.np'
 */
export const SITE_URL = 'https://pastordanieltiruwaministry.org.np';

// Where the sitemap, canonical, and OG will point
export const siteUrl = SITE_URL;

// Image paths (OG images must exist in /public/og/)
export const ogImages = {
  home: `${siteUrl}/og/pastor-daniel-tiruwa.png`,
  about: `${siteUrl}/og/pastor-daniel-tiruwa-about.png`,
  sermons: `${siteUrl}/og/pastor-daniel-tiruwa-sermons.png`,
  ministries: `${siteUrl}/og/pastor-daniel-tiruwa-ministries.png`,
  events: `${siteUrl}/og/pastor-daniel-tiruwa-events.png`,
  contact: `${siteUrl}/og/pastor-daniel-tiruwa-contact.png`,
  donate: `${siteUrl}/og/pastor-daniel-tiruwa-donate.png`,
  fallback: `${siteUrl}/og/pastor-daniel-tiruwa.png`,
};

// Social handles used across schemas
export const socialLinks = [
  'https://www.facebook.com/pastordanieltiruwa',
  'https://www.youtube.com/@pastordanieltiruwa',
  'https://www.instagram.com/pastordanieltiruwa',
];

// Primary keywords (used on every page for consistency)
export const primaryKeywords = [
  'Pastor Daniel Tiruwa',
  'Daniel Tiruwa',
  'Pastor Daniel Tiruwa Ministry',
  'Daniel Tiruwa Ministry',
  'Pastor Tiruwa',
  'Tiruwa',
  'Light to the Nations',
  'Light to the Nations Emmanuel Church',
  'Emmanuel Church',
  'Emmanuel Church Nepal',
  'children ministry',
  'village ministry',
  'city ministry',
  'youth ministry',
  'worship ministry',
  'prayer ministry',
  'outreach ministry',
  'Christian ministry Nepal',
  'church in Nepal',
  'Nepali pastor',
  'Pastor Daniel Tiruwa sermons',
  'Daniel Tiruwa preaching',
  'Bible teaching Nepal',
];

// Shared organization info
export const orgInfo = {
  name: 'Pastor Daniel Tiruwa Ministry',
  legalName: 'Light to the Nations Emmanuel Church',
  alternateNames: [
    'Light to the Nations Emmanuel Church',
    'Daniel Tiruwa Ministry',
    'Emmanuel Church Nepal',
  ],
  email: 'info@pastordanieltiruwaministry.org.np',
  phone: '+977-9800000000', // ⚠️ replace with real
  country: 'NP',
};