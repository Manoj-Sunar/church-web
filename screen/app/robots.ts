// app/robots.ts
import { MetadataRoute } from 'next';
import { SITE_URL } from './SEO/siteConfig';

export default function robots(): MetadataRoute.Robots {
  // ✅ On Vercel preview or with a different host header, block everything
  const isProd =
    process.env.VERCEL_ENV === 'production' ||
    process.env.NODE_ENV === 'production';

  if (!isProd) {
    // Preview / dev — block all crawlers
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin/*',
          '/api/',
          '/_next/',
          '/private/',
          '/admin-login',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/admin/*', '/api/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/admin/*', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}