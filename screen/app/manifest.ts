// app/manifest.ts
import { MetadataRoute } from 'next';
import { SITE_URL } from './SEO/siteConfig';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pastor Daniel Tiruwa Ministry | Light to the Nations Emmanuel Church',
    short_name: 'PDT Ministry',
    description:
      'Official website of Pastor Daniel Tiruwa. Watch sermons, explore ministries, and connect with Light to the Nations Emmanuel Church.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#F8FAFC',
    theme_color: '#4F46E5',
    orientation: 'portrait',
    lang: 'en',
    dir: 'ltr',
    id: 'pastor-daniel-tiruwa-ministry',
    categories: ['religion', 'education', 'community'],
    icons: [
      { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcuts: [
      { name: 'Sermons', url: '/sermons' },
      { name: 'Ministries', url: '/ministries' },
      { name: 'Events', url: '/events' },
      { name: 'Donate', url: '/donate' },
    ],
  };
}