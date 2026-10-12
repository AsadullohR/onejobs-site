import { fetchChannelHtml } from "../../lib/telegram.mjs";
import { json } from "../../lib/response.mjs";
import { parseVacancies } from "./parse.mjs";

// Public channel username (without @). Override with TELEGRAM_CHANNEL in Netlify env vars.
const CHANNEL = (process.env.TELEGRAM_CHANNEL || "onejobs_vakansiyalar").replace(/^@/, "");
const KEYWORD = (process.env.TELEGRAM_VACANCY_TAG || "").toLowerCase(); // optional: only posts containing this, e.g. "#vakansiya"
const PAGES = 2; // t.me/s shows ~20 posts per page; two pages give country pages enough to filter
const LIMIT = 30;

export default async () => {
  const url = `https://t.me/${CHANNEL}`;
  try {
    let vacancies = [];
    let before;
    for (let page = 0; page < PAGES; page++) {
      const batch = parseVacancies(await fetchChannelHtml(CHANNEL, before), CHANNEL);
      if (!batch.length) break;
      vacancies.push(...batch);
      before = Math.min(...batch.map((v) => v.id));
    }
    vacancies = [...new Map(vacancies.map((v) => [v.id, v])).values()].sort((a, b) => b.id - a.id);
    if (KEYWORD) vacancies = vacancies.filter((v) => v.text.toLowerCase().includes(KEYWORD));
    return json({ channel: CHANNEL, url, vacancies: vacancies.slice(0, LIMIT) }, 200, 600);
  } catch (err) {
    return json({ channel: CHANNEL, url, error: String(err.message || err), vacancies: [] }, 502, 60);
  }
};
