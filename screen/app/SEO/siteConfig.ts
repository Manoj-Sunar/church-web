// app/SEO/siteConfig.ts

/**
 * Single source of truth for the site URL.
 * Change this ONE value and every metadata, sitemap, canonical,
 * and JSON-LD reference updates automatically.
 */
export const SITE_URL = 'https://church-web-ebon.vercel.app';

export const siteUrl = SITE_URL;

// OG image paths (files must exist in /public/og/)
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

// Social handles used across all schemas
export const socialLinks = [
  'https://www.facebook.com/daniel.tiruwa.5',
  'https://www.youtube.com/@daniel_tiruwa',
  'https://www.tiktok.com/@danieltr104',
];

// Primary keywords used site-wide
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
  email: 'trdaniel2022@gmail.com',
  phone: '+977 9825612100',
  country: 'NP',
};