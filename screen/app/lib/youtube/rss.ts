import { XMLParser } from "fast-xml-parser";

export type YoutubeVideo = {
    id: string;
    title: string;
    published: string;
    url: string;
    thumbnail: string;
};

const CHANNEL_ID = "UC3M0FGO1Qf5P-FCrkDYHTTQ";

const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
});

export async function fetchMyChannelVideos(limit = 12): Promise<YoutubeVideo[]> {
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

    const res = await fetch(feedUrl, {
        next: { revalidate: 60 * 10 }, // refresh every 10 min
    });

    if (!res.ok) throw new Error(`YouTube RSS fetch failed: ${res.status}`);

    const xml = await res.text();
    const data = parser.parse(xml);

    const entries = data?.feed?.entry;
    const list = Array.isArray(entries) ? entries : entries ? [entries] : [];

    return list.slice(0, limit).map((e: any) => {
        const id = e["yt:videoId"];
        return {
            id,
            title: e.title,
            published: e.published,
            url: e.link?.href ?? `https://www.youtube.com/watch?v=${id}`,
            thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, // reliable
        };
    });
}