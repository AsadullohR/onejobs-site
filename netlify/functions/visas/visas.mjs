import { fetchChannelHtml, parseChannelPosts } from "../../lib/telegram.mjs";
import { json } from "../../lib/response.mjs";

// Public Telegram channel where approved visas are posted (without @).
const CHANNEL = (process.env.TELEGRAM_VISA_CHANNEL || "").replace(/^@/, "");

// Caption like "🇩🇪 Germany work visa — Jasur" -> first line, without hashtags.
const caption = (text) =>
  text
    .split("\n")
    .map((l) => l.replace(/#[\p{L}\p{N}_]+/gu, "").trim())
    .find(Boolean) || "";

export default async () => {
  if (!CHANNEL) return json({ error: "TELEGRAM_VISA_CHANNEL is not set", visas: [] }, 500, 60);

  const url = `https://t.me/${CHANNEL}`;
  try {
    const visas = parseChannelPosts(await fetchChannelHtml(CHANNEL), CHANNEL)
      .filter((p) => p.photos.length)
      .flatMap((p) => p.photos.map((photo, i) => ({ id: `${p.id}-${i}`, url: p.url, date: p.date, photo, caption: caption(p.text) })));
    return json({ channel: CHANNEL, url, visas: visas.slice(0, 24) }, 200, 600);
  } catch (err) {
    return json({ channel: CHANNEL, url, error: String(err.message || err), visas: [] }, 502, 60);
  }
};
