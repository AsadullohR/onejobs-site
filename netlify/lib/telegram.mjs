// Reads the public web preview of a Telegram channel (https://t.me/s/<channel>).
// No bot or API key needed; works for public channels only.

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", apos: "'", nbsp: " " };

function decode(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z#0-9]+);/gi, (m, e) => ENTITIES[e.toLowerCase()] ?? m);
}

export function htmlToText(html) {
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

// Strips leading emoji/bullets and trailing emoji from a line.
export const clean = (line) =>
  line
    .replace(/^[^\p{L}\p{N}+€$£₩¥]+/u, "")
    .replace(/[\s\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}️]+$/u, "")
    .trim();

// Every OneJobs post ends with the same contact footer: a call-to-action, phone, @handles.
const FOOTER_RE = /band qil|biz orqali|ro['‘’]yxatdan o['‘’]tish|o['‘’]z joyingizni|^\W*\+?\d[\d\s()-]{8,}\d\W*$|^\W*@\w+/iu;
const NOISE_RE = /^(#[\p{L}\p{N}_]+\s*)+$|^(https?:\/\/|t\.me\/|www\.)\S+$|telegram\s*\|\s*instagram/iu;

// Post text as trimmed lines (blank lines kept) without the contact footer, links, or hashtag lines.
// A post that is only the footer returns [].
export function stripFooter(text) {
  const raw = text.split("\n").map((l) => l.trim());
  const footer = raw.findIndex((l) => FOOTER_RE.test(clean(l) || l));
  return (footer >= 0 ? raw.slice(0, footer) : raw).filter((l) => !NOISE_RE.test(l));
}

// `before` pages back through older posts (t.me/s shows about 20 per page).
export async function fetchChannelHtml(channel, before) {
  const res = await fetch(`https://t.me/s/${channel}${before ? `?before=${before}` : ""}`, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; OneJobsSite/1.0)", "Accept-Language": "en" },
  });
  if (!res.ok) throw new Error(`Telegram responded ${res.status}`);
  return res.text();
}

// Every regular post on the page, newest first: text (may be empty) and all photos (albums included).
export function parseChannelPosts(html, channel) {
  const posts = [];
  const blocks = html.split(/<div class="tgme_widget_message_wrap/).slice(1);

  for (const block of blocks) {
    const id = block.match(/data-post="[^"/]+\/(\d+)"/)?.[1];
    if (!id) continue;
    if (/class="tgme_widget_message [^"]*service_message/.test(block)) continue; // "Channel created", pinned notices

    // Text block ends at its closing </div>; Telegram does not nest divs inside it.
    const textHtml = block.match(/<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/)?.[1];
    const photos = [...block.matchAll(/tgme_widget_message_photo_wrap[^>]*background-image:url\('([^']+)'\)/g)].map((m) => m[1]);

    posts.push({
      id: Number(id),
      url: `https://t.me/${channel}/${id}`,
      date: block.match(/<time[^>]*datetime="([^"]+)"/)?.[1] || null,
      text: textHtml ? htmlToText(textHtml) : "",
      photos,
    });
  }

  return posts.sort((a, b) => b.id - a.id);
}
