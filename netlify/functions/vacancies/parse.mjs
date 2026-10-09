// Parses the public web preview of a Telegram channel (https://t.me/s/<channel>)
// into vacancy objects. No bot or API key needed; works for public channels only.

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", apos: "'", nbsp: " " };

function decode(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z#0-9]+);/gi, (m, e) => ENTITIES[e.toLowerCase()] ?? m);
}

function htmlToText(html) {
  return decode(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div)>/gi, "\n")
      .replace(/<[^>]+>/g, "")
  )
    .replace(/ /g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Label words (EN / UZ / RU) mapped to the field they describe.
const FIELDS = {
  position: ["position", "job", "vacancy", "role", "lavozim", "kasb", "vakansiya", "ish", "должность", "вакансия", "профессия", "позиция"],
  country: ["country", "location", "davlat", "mamlakat", "joylashuv", "shahar", "страна", "город", "локация", "место"],
  salary: ["salary", "pay", "wage", "maosh", "oylik", "ish haqi", "зарплата", "зп", "оклад", "заработная плата"],
  schedule: ["schedule", "hours", "ish vaqti", "grafik", "график", "режим"],
  requirements: ["requirements", "talablar", "требования"],
  contact: ["contact", "aloqa", "murojaat", "telefon", "контакт", "контакты", "телефон", "связь"],
};

function fieldFor(label) {
  const l = label.toLowerCase().trim();
  for (const [field, words] of Object.entries(FIELDS)) {
    if (words.some((w) => l === w || l.startsWith(w + " ") || l.endsWith(" " + w))) return field;
  }
  return null;
}

// "🇩🇪 Country: Germany" -> { label: "Country", value: "Germany" }
const LINE_RE = /^[^\p{L}\p{N}]*([\p{L}][\p{L}\s'’.]{0,30}?)\s*[:：]\s*(.+)$/u;

export function parsePostText(text) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const fields = {};
  const extra = [];
  const body = [];

  for (const line of lines) {
    if (/^(#[\p{L}\p{N}_]+\s*)+$/u.test(line)) continue; // hashtag-only lines
    if (/^(https?:\/\/|t\.me\/|www\.)\S+$/i.test(line)) continue; // bare links
    const m = line.match(LINE_RE);
    if (m && !m[2].startsWith("//")) {
      const field = fieldFor(m[1]);
      if (field && !fields[field]) {
        fields[field] = m[2].trim();
        continue;
      }
      extra.push({ label: m[1].trim(), value: m[2].trim() });
      continue;
    }
    body.push(line);
  }

  const firstLine = (body[0] || lines[0] || "").replace(/^[^\p{L}\p{N}]+/u, "").trim();
  return {
    title: fields.position || firstLine,
    country: fields.country || null,
    salary: fields.salary || null,
    schedule: fields.schedule || null,
    requirements: fields.requirements || null,
    details: extra,
    summary: body.filter((l) => l.replace(/^[^\p{L}\p{N}]+/u, "").trim() !== firstLine).slice(0, 4).join("\n"),
  };
}

export function parseChannelHtml(html, channel) {
  const posts = [];
  const blocks = html.split(/<div class="tgme_widget_message_wrap/).slice(1);

  for (const block of blocks) {
    const id = block.match(/data-post="[^"/]+\/(\d+)"/)?.[1];
    if (!id) continue;

    // Text block ends at its closing </div>; Telegram does not nest divs inside it.
    const textHtml = block.match(/<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/)?.[1];
    if (!textHtml) continue; // photo-only or service posts
    const text = htmlToText(textHtml);
    if (!text) continue;

    const date = block.match(/<time[^>]*datetime="([^"]+)"/)?.[1] || null;
    const photo = block.match(/tgme_widget_message_photo_wrap[^>]*background-image:url\('([^']+)'\)/)?.[1] || null;

    posts.push({
      id: Number(id),
      url: `https://t.me/${channel}/${id}`,
      date,
      photo,
      text,
      ...parsePostText(text),
    });
  }

  return posts.sort((a, b) => b.id - a.id);
}
