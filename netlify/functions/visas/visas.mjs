import { fetchChannelHtml, parseChannelPosts, stripFooter, clean } from "../../lib/telegram.mjs";
import { json } from "../../lib/response.mjs";

// Public Telegram channel where approved visas are posted (without @). Override with TELEGRAM_VISA_CHANNEL.
const CHANNEL = (process.env.TELEGRAM_VISA_CHANNEL || "onejobs_natija").replace(/^@/, "");
const PAGES = 3; // t.me/s shows ~20 posts per page; many posts here are videos, so read a few pages
const LIMIT = 24;

// "✅✅✅\nTabriklaymiz, opamiz Schengen vizasini qo'lga oldilar.\n🧾 Ro'yxatdan o'tish..." -> "Tabriklaymiz, ..."
const caption = (text) => stripFooter(text).map(clean).find(Boolean) || "";

export default async () => {
  const url = `https://t.me/${CHANNEL}`;
  try {
    const posts = [];
    let before;
    for (let page = 0; page < PAGES; page++) {
      const batch = parseChannelPosts(await fetchChannelHtml(CHANNEL, before), CHANNEL);
      if (!batch.length) break;
      posts.push(...batch);
      if (posts.reduce((n, p) => n + p.photos.length, 0) >= LIMIT) break;
      before = Math.min(...batch.map((p) => p.id));
    }

    const visas = posts
      .filter((p) => p.photos.length)
      .flatMap((p) => {
        const text = caption(p.text);
        return p.photos.map((photo, i) => ({ id: `${p.id}-${i}`, url: p.url, date: p.date, photo, caption: text }));
      });

    return json({ channel: CHANNEL, url, visas: visas.slice(0, LIMIT) }, 200, 600);
  } catch (err) {
    return json({ channel: CHANNEL, url, error: String(err.message || err), visas: [] }, 502, 60);
  }
};
