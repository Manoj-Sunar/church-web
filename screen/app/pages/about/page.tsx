
import { publicAPI } from '@/app/API/public.api';
import AboutClient from '@/app/Components/pages/About/AboutClient';
import type { Metadata } from 'next';


const siteUrl = 'https://lighttothenationsemmanuel.org'; // ✅ change to your domain
const ogImage = `${siteUrl}/og/about.png`; // ✅ create later

export const metadata: Metadata = {
  title: 'About Us | Light To The Nations Emanuel Church',
  description:
    'Learn the story, mission, and leaders of Light To The Nations Emanuel Church. A faith-filled community built on love, growth, and service.',
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/about`,
    title: 'About Us | Light To The Nations Emanuel Church',
    description:
      'Our story, mission, and pastors—serving the community with faith, love, and hope.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'About our church community' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Light To The Nations Emanuel Church',
    description:
      'Our story, mission, and pastors—serving the community with faith, love, and hope.',
    images: [ogImage],
  },
};

export default async function AboutPage() {



  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Us',
    url: `${siteUrl}/about`,
    isPartOf: { '@type': 'WebSite', name: 'Light To The Nations Emanuel Church', url: siteUrl },
  };


  try {

    const [res, leaders] = await Promise.all([
      publicAPI.getPageContentByPageName("about"),
      publicAPI.getAllLeaders(),

    ])
    return (<>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient content={res} leaders={leaders.data}/>
    </>)

  } catch (error) {

  }









}