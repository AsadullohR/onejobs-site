// Writes a static HTML file for every page in every language, so search engines and link
// previews see real content, titles, descriptions, and hreflang links without running JavaScript.
// Also writes sitemap.xml and robots.txt. Runs after `vite build` and the SSR build (see package.json).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = path.join(root, "dist");
const load = (p) => import(pathToFileURL(path.join(root, p)).href);

const { render } = await load("dist-server/entry-server.js");
const { seo, SITE_URL, EMPLOYER_LANGS, WORKER_LANGS } = await load("src/content/seo.js");
const { LANGS } = await load("src/i18n/lang.js");
const { COUNTRIES, countryText } = await load("src/content/countries.js");
const { SITE } = await load("src/site.js");
const { FACTS } = await load("src/content/facts.js");

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const ALL = LANGS.map((l) => l.code);
const localeOf = (lang) => LANGS.find((l) => l.code === lang).locale;
const ogLocale = { en: "en_GB", bg: "bg_BG", me: "sr_ME", ru: "ru_RU", uz: "uz_UZ" };
// hreflang uses ISO 639-1 language (+ region) codes, which is what Google reads.
const hreflang = { en: "en", bg: "bg", me: "sr-ME", ru: "ru", uz: "uz" };
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// Trailing slash: Netlify serves pre-rendered pages as folders and redirects /bg to /bg/.
const url = (lang, p) => `${SITE_URL}/${lang}/${p ? `${p}/` : ""}`;

const pages = [
  { key: "home", path: "", langs: EMPLOYER_LANGS },
  { key: "employers", path: "employers", langs: EMPLOYER_LANGS },
  { key: "agencies", path: "agencies", langs: EMPLOYER_LANGS },
  { key: "jobseekers", path: "jobseekers", langs: WORKER_LANGS },
  { key: "countries", path: "countries", langs: WORKER_LANGS },
  ...COUNTRIES.map((c) => ({ key: "country", path: `countries/${c.slug}`, langs: WORKER_LANGS, country: c })),
];

// Company details for Google (shown on the homepage in each language).
function organizationJsonLd(lang) {
  return {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    name: SITE.name,
    url: url(lang, ""),
    logo: `${SITE_URL}/favicon.png`,
    image: `${SITE_URL}/hero-workers.jpg`,
    telephone: SITE.phone,
    email: SITE.email,
    foundingDate: String(FACTS.since),
    address: { "@type": "PostalAddress", addressLocality: "Andijan", addressCountry: "UZ" },
    areaServed: FACTS.countries.map((code) => ({ "@type": "Country", name: COUNTRIES.find((c) => c.code === code).en.name })),
    sameAs: ["https://t.me/onejobs_vakansiyalar", "https://t.me/onejobs_natija", "https://www.youtube.com/playlist?list=PLS7Wa5BXaxCQ"],
  };
}

function head(page, lang) {
  const entry = seo[page.key][lang] ?? seo[page.key].en;
  const name = page.country ? countryText(page.country, lang).name : undefined;
  const resolve = (v) => (typeof v === "function" ? v(name) : v);
  const title = resolve(entry.title);
  const description = resolve(entry.description);
  const translated = page.langs.includes(lang);
  // Untranslated versions (e.g. /bg/jobseekers shows English) point search engines at the English page.
  const canonical = url(translated ? lang : "en", page.path);

  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    ...page.langs.map((l) => `<link rel="alternate" hreflang="${hreflang[l]}" href="${url(l, page.path)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${url("en", page.path)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${SITE_URL}${page.country ? page.country.photo : "/hero-workers.jpg"}" />`,
    `<meta property="og:locale" content="${ogLocale[lang]}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  if (page.key === "home") tags.push(`<script type="application/ld+json">${JSON.stringify(organizationJsonLd(lang))}</script>`);
  return tags.map((t) => `    ${t}`).join("\n");
}

let count = 0;
for (const page of pages) {
  for (const lang of ALL) {
    const route = `/${lang}${page.path ? `/${page.path}` : ""}`;
    const html = template
      .replace(/<html lang="[^"]*">/, `<html lang="${localeOf(lang)}">`)
      .replace(/<!--seo:start-->[\s\S]*<!--seo:end-->/, head(page, lang).trimStart())
      .replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`);
    const file = path.join(dist, lang, page.path, "index.html");
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, html);
    count++;
  }
}

// Sitemap: translated pages only, each with its language alternates.
const urls = pages.flatMap((page) =>
  page.langs.map(
    (lang) =>
      `  <url>\n    <loc>${url(lang, page.path)}</loc>\n` +
      page.langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${hreflang[l]}" href="${url(l, page.path)}" />`).join("\n") +
      `\n  </url>`
  )
);
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`
);
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /__forms.html\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`prerendered ${count} pages, sitemap with ${urls.length} URLs`);
