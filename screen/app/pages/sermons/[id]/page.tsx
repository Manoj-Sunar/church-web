import { publicAPI } from '@/app/API/public.api';
import SermonDetailClient from '@/app/Components/pages/Sermon/SermonDetailsClient';









export default async function SermonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;
  const res = await publicAPI.getSermonDetails(id);





  // Minimal JSON-LD (helps even if client fetch differs)
  const jsonLd =
    res?.data && {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: res?.data?.title,
      description: res?.data.description,
      uploadDate: res?.data?.date,
      // If you have video URL later, add:
      // contentUrl: `${siteUrl}/watch/${params.slug}`,
      // embedUrl: ...
      author: res?.data.speaker ? { '@type': 'Person', name: res?.data.speaker } : undefined,

    };



  return (
    <>
      {jsonLd ? (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}

      <SermonDetailClient sermon={res?.data} />
    </>
  );
}