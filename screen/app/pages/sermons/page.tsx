
import { publicAPI } from '@/app/API/public.api';
import SermonsClient from '@/app/Components/pages/Sermon/SermonClient';
import type { Metadata } from 'next';


const siteUrl = 'https://lighttothenationsemmanuel.org'; // ✅ change
const ogImage = `${siteUrl}/og/sermons.png`; // ✅ optional

export const metadata: Metadata = {
  title: 'Sermons | Light To The Nations Emanuel Church',
  description:
    'Watch and listen to our latest sermons. Grow in faith through the Word of God—messages, speakers, and topics.',
  alternates: { canonical: `${siteUrl}/sermons` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/sermons`,
    title: 'Sermons | Light To The Nations Emanuel Church',
    description:
      'Watch and listen to our latest sermons—messages, speakers, and topics to strengthen your faith.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Sermons and messages' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sermons | Light To The Nations Emanuel Church',
    description:
      'Watch and listen to our latest sermons—messages, speakers, and topics to strengthen your faith.',
    images: [ogImage],
  },
};

export default async function SermonsPage() {

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Sermons',
    url: `${siteUrl}/sermons`,
    isPartOf: { '@type': 'WebSite', name: 'Light To The Nations Emanuel Church', url: siteUrl },
  };


  const res = await publicAPI.getPageContentByPageName("sermons");
  const sermons = await publicAPI.getAllSermons(1, 10);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SermonsClient sermons={sermons.data} pagination={sermons.pagination} content={res} />
    </>
  );
}