import { json } from "../../lib/response.mjs";

// YouTube's public RSS feed lists the newest 15 videos of a playlist or channel; no API key needed.
// Prefer a playlist so only testimonial videos appear.
const PLAYLIST = process.env.YOUTUBE_PLAYLIST_ID || "";
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || "";

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");

export function parseYoutubeFeed(xml) {
  return xml
    .split("<entry>")
    .slice(1)
    .map((entry) => {
      const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      return {
        id,
        title: decode(entry.match(/<title>([^<]*)<\/title>/)?.[1] || ""),
        date: entry.match(/<published>([^<]+)<\/published>/)?.[1] || null,
        url: `https://www.youtube.com/watch?v=${id}`,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      };
    })
    .filter((v) => v.id);
}

export default async () => {
  const query = PLAYLIST ? `playlist_id=${PLAYLIST}` : CHANNEL_ID ? `channel_id=${CHANNEL_ID}` : "";
  if (!query) return json({ error: "YOUTUBE_PLAYLIST_ID or YOUTUBE_CHANNEL_ID is not set", videos: [] }, 500, 60);

  const url = PLAYLIST ? `https://www.youtube.com/playlist?list=${PLAYLIST}` : `https://www.youtube.com/channel/${CHANNEL_ID}`;
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?${query}`);
    if (!res.ok) throw new Error(`YouTube responded ${res.status}`);
    return json({ url, videos: parseYoutubeFeed(await res.text()) }, 200, 1800);
  } catch (err) {
    return json({ url, error: String(err.message || err), videos: [] }, 502, 60);
  }
};
