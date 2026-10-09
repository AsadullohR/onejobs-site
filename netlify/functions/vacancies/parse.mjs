// Turns Telegram channel posts into vacancy objects.
//
// Built around the OneJobs post template:
//   🇧🇬 BOLGARIYADA ISH IMKONIYATI!        <- headline; the flag gives the country
//   🐑 Vakansiya: Ferma ishchisi           <- "label: value" lines
//   📌 Talablar:                           <- "label:" heading, items on the following lines
//   Mas'uliyatli bo'lish
//   ...
//   🧾 Siz ham o'z joyingizni ...          <- footer (contacts, handles), dropped
import { parseChannelPosts } from "../../lib/telegram.mjs";

// Label words (EN / UZ Latin / UZ Cyrillic / RU) mapped to the field they describe.
const FIELDS = {
  position: ["position", "job", "vacancy", "vacancies", "role", "lavozim", "kasb", "vakansiya", "vakansiyalar", "bo'sh ish o'rinlari", "ish o'rinlari", "ish", "должность", "вакансия", "вакансии", "профессия", "позиция", "лавозим", "касб"],
  country: ["country", "davlat", "mamlakat", "страна", "давлат", "мамлакат"],
  location: ["location", "ish joyi", "joy", "joylashuv", "manzil", "shahar", "город", "локация", "место работы", "шаҳар", "шахар"],
  salary: ["salary", "pay", "wage", "maosh", "ish haqi", "зарплата", "зп", "оклад", "заработная плата", "маош", "иш ҳақи", "иш хаки"],
  schedule: ["schedule", "hours", "ish vaqti", "ish grafigi", "grafik", "график", "режим", "иш вақти", "иш вакти"],
  start: ["start", "ish boshlanishi", "ish boshlash", "boshlanish", "jo'nab ketish", "начало"],
  openings: ["openings", "talab qilinadi", "kerak", "jami ish o'rni", "ish o'rni", "нужно", "требуется"],
  requirements: ["requirements", "talablar", "требования", "талаблар"],
  perks: ["benefits", "we offer", "tomonidan", "biz taklif qilamiz", "sharoitlar", "qulayliklar", "условия", "мы предлагаем"],
  duties: ["duties", "responsibilities", "ish vazifalari", "vazifalar", "обязанности"],
};

// Longest labels first, so "ish vaqti" (schedule) wins over "ish" (job).
const LABELS = Object.entries(FIELDS)
  .flatMap(([field, words]) => words.map((w) => [w, field]))
  .sort((a, b) => b[0].length - a[0].length);

function fieldFor(label) {
  const l = label.toLowerCase().replace(/[‘’`ʻʼ]/g, "'").trim();
  return LABELS.find(([w]) => l === w || l.startsWith(w + " ") || l.endsWith(" " + w))?.[1] ?? null;
}

const clean = (line) => line.replace(/^[^\p{L}\p{N}+€$£₩¥]+/u, "").replace(/[\s\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}️]+$/u, "").trim();

// "🇩🇪" -> "Germany"
const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
function countryFromFlag(line) {
  const flag = line.match(/[\u{1F1E6}-\u{1F1FF}]{2}/u)?.[0];
  if (!flag) return null;
  const code = [...flag].map((c) => String.fromCharCode(c.codePointAt(0) - 0x1f1e6 + 65)).join("");
  try {
    return regionNames.of(code);
  } catch {
    return null;
  }
}

// "BOLGARIYADA ISH IMKONIYATI!" -> "Bolgariyada ish imkoniyati!"
const sentenceCase = (s) => (/\p{Ll}/u.test(s) ? s : s.charAt(0) + s.slice(1).toLowerCase());

// The footer starts at the booking call-to-action or the first phone number.
const FOOTER_RE = /band qil|biz orqali|o['‘’]z joyingizni|^\W*\+?\d[\d\s()-]{8,}\d\W*$|^\W*@\w+/iu;
const NOISE_RE = /^(#[\p{L}\p{N}_]+\s*)+$|^(https?:\/\/|t\.me\/|www\.)\S+$|telegram\s*\|\s*instagram/iu;

const LABEL_VALUE = /^([\p{L}][\p{L}\p{N}\s'’‘.]{0,40}?)\s*[:：]\s*(.+)$/u;
const HEADING = /^([\p{L}][\p{L}\p{N}\s'’‘.]{0,40}?)\s*[:：]\s*$/u;

export function parsePostText(text) {
  const raw = text.split("\n").map((l) => l.trim());
  const footer = raw.findIndex((l, i) => i > 0 && FOOTER_RE.test(clean(l) || l));
  const lines = (footer > 0 ? raw.slice(0, footer) : raw).filter((l) => !NOISE_RE.test(l));

  const firstIdx = lines.findIndex(Boolean);
  const headline = firstIdx >= 0 ? sentenceCase(clean(lines[firstIdx])) : "";
  const country = firstIdx >= 0 ? countryFromFlag(lines[firstIdx]) : null;

  const fields = {};
  const lists = {};
  const details = [];
  const body = [];

  for (let i = firstIdx + 1; i < lines.length; i++) {
    const line = clean(lines[i]);
    if (!line) continue;

    const heading = line.match(HEADING);
    if (heading) {
      // Collect the item lines under this heading, up to a blank line or the next label.
      if (i + 1 < lines.length && !lines[i + 1]) i++; // allow one blank line after the heading
      const items = [];
      // A list ends at the next heading or a recognised "label: value" line (e.g. "Maosh: 1300 €").
      const isLabel = (l) => HEADING.test(clean(l)) || !!fieldFor(clean(l).match(LABEL_VALUE)?.[1] || "");
      while (i + 1 < lines.length && lines[i + 1] && !isLabel(lines[i + 1])) {
        items.push(clean(lines[++i]));
      }
      const field = fieldFor(heading[1]);
      if (field && !lists[field]) lists[field] = items.filter(Boolean);
      continue;
    }

    const pair = line.match(LABEL_VALUE);
    if (pair) {
      const field = fieldFor(pair[1]);
      if (field && !fields[field]) fields[field] = pair[2].trim();
      else details.push({ label: pair[1].trim(), value: pair[2].trim() });
      continue;
    }

    body.push(line);
  }

  const positions = fields.position || lists.position?.join(", ") || lists.openings?.join(", ");
  return {
    title: positions || headline,
    headline: positions ? headline : null,
    country: fields.country || country,
    location: fields.location || null,
    salary: fields.salary || lists.salary?.[0] || null,
    schedule: fields.schedule || lists.schedule?.join(", ") || null,
    start: fields.start || lists.start?.join(", ") || null,
    perks: lists.perks || [],
    requirements: lists.requirements || (fields.requirements ? [fields.requirements] : []),
    duties: lists.duties || [],
    openings: fields.openings || null,
    details,
    summary: body.slice(0, 2).join("\n"),
  };
}

export function parseVacancies(html, channel) {
  return parseChannelPosts(html, channel)
    .filter((p) => p.text) // photo-only posts are not vacancies
    .map(({ photos, ...p }) => ({ ...p, photo: photos[0] || null, ...parsePostText(p.text) }));
}
