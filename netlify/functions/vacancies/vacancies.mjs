import { fetchChannelHtml } from "../../lib/telegram.mjs";
import { json } from "../../lib/response.mjs";
import { parseVacancies } from "./parse.mjs";

// Public channel username (without @). Override with TELEGRAM_CHANNEL in Netlify env vars.
const CHANNEL = (process.env.TELEGRAM_CHANNEL || "onejobs_vakansiyalar").replace(/^@/, "");
const KEYWORD = (process.env.TELEGRAM_VACANCY_TAG || "").toLowerCase(); // optional: only posts containing this, e.g. "#vakansiya"

export default async () => {
  const url = `https://t.me/${CHANNEL}`;
  try {
    let vacancies = parseVacancies(await fetchChannelHtml(CHANNEL), CHANNEL);
    if (KEYWORD) vacancies = vacancies.filter((v) => v.text.toLowerCase().includes(KEYWORD));
    return json({ channel: CHANNEL, url, vacancies: vacancies.slice(0, 12) }, 200, 600);
  } catch (err) {
    return json({ channel: CHANNEL, url, error: String(err.message || err), vacancies: [] }, 502, 60);
  }
};
