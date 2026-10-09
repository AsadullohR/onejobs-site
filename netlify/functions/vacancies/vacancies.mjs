import { parseChannelHtml } from "./parse.mjs";

// Set TELEGRAM_CHANNEL in Netlify (Site configuration > Environment variables)
// to the public channel username, without the @.
const CHANNEL = (process.env.TELEGRAM_CHANNEL || "").replace(/^@/, "");
const KEYWORD = (process.env.TELEGRAM_VACANCY_TAG || "").toLowerCase(); // optional: only posts containing this, e.g. "#vakansiya"

const json = (body, status, maxAge) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      // Netlify's CDN keeps the result for 10 min, then refreshes in the background.
      "Cache-Control": "public, max-age=60",
      "Netlify-CDN-Cache-Control": `public, s-maxage=${maxAge}, stale-while-revalidate=86400`,
    },
  });

export default async () => {
  if (!CHANNEL) return json({ error: "TELEGRAM_CHANNEL is not set", vacancies: [] }, 500, 60);

  try {
    const res = await fetch(`https://t.me/s/${CHANNEL}`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; OneJobsSite/1.0)", "Accept-Language": "en" },
    });
    if (!res.ok) throw new Error(`Telegram responded ${res.status}`);

    let vacancies = parseChannelHtml(await res.text(), CHANNEL);
    if (KEYWORD) vacancies = vacancies.filter((v) => v.text.toLowerCase().includes(KEYWORD));

    return json({ channel: CHANNEL, url: `https://t.me/${CHANNEL}`, vacancies: vacancies.slice(0, 12) }, 200, 600);
  } catch (err) {
    return json({ channel: CHANNEL, url: `https://t.me/${CHANNEL}`, error: String(err.message || err), vacancies: [] }, 502, 60);
  }
};
