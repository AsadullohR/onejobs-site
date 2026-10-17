# onejobs-site

## Vacancies from Telegram

The Home and Jobseekers pages show the latest posts from the company's public Telegram channel.
`netlify/functions/vacancies` reads `https://t.me/s/<channel>` and turns each post into a vacancy card.
Netlify caches the result for 10 minutes.

Works with no setup. Optional overrides in Netlify → Site configuration → Environment variables:

| Variable | Required | Example |
|---|---|---|
| `TELEGRAM_CHANNEL` | yes | `onejobs_vakansiya` (no `@`) |
| `TELEGRAM_VACANCY_TAG` | no | `#vakansiya`: only posts containing this text are shown |

The parser is built around the channel's post template: flag + headline on the first line
(country comes from the flag), `Vakansiya:` / `Maosh:` lines, and `Talablar:` / `... tomonidan:`
headings with items on the following lines. The contact footer (phone, @handles) is dropped.
Labels work in Uzbek (Latin and Cyrillic), Russian, and English.

Local dev: `npm run dev` (the function runs inside Vite).

## Success stories: visa photos and videos

Home and Jobseekers show a "Real Visas. Real People." section. Defaults: visa photos from
[@onejobs_natija](https://t.me/onejobs_natija), videos from the [Natijalar playlist](https://www.youtube.com/playlist?list=PLS7Wa5BXaxCQ).
Override with:

| Variable | What it does |
|---|---|
| `TELEGRAM_VISA_CHANNEL` | Public Telegram channel with approved-visa photos (no `@`). Each photo becomes a gallery tile; the post's first line is its caption. |
| `YOUTUBE_PLAYLIST_ID` | Playlist of client video testimonials (the `list=` part of the playlist URL). Preferred. |
| `YOUTUBE_CHANNEL_ID` | Alternative: all videos from a channel (`UC...` ID). |

YouTube's public feed is used, so no API key is needed. Videos load only when a visitor presses play.

## Languages and addresses

Every page lives under a language prefix: `/en`, `/bg` (Bulgarian), `/me` (Montenegrin, Latin),
`/ru`, `/uz`. Employer pages (home, employers, agencies) are translated into all five; worker
pages (jobseekers, countries) exist in en/ru/uz and show English under `/bg` and `/me`.

- Text lives in `src/content/*.js` as `{ en, bg, me, ru, uz }` objects; English is the fallback.
- The bare domain and old links without a language (e.g. `/jobseekers`) go to the visitor's
  language: `public/_redirects` does it on Netlify (browser language or the `nf_lang` cookie the
  language switch sets), and the app does it as a fallback.

## Search engines

`npm run build` pre-renders every page in every language to static HTML
(`scripts/prerender.mjs`), with its own title, description, canonical URL, hreflang links,
Open Graph tags, and company details (JSON-LD) on the homepage. It also writes `sitemap.xml` and
`robots.txt`. Titles and descriptions are in `src/content/seo.js`.

## Trust facts

`src/content/facts.js` holds the figures employers see (workers placed, founding year, countries,
licence number, employer quote). Empty values are hidden, never replaced with placeholders.

## Forms

Static form definitions for Netlify live in `public/__forms.html`; the site's forms post there.
Form detection must be enabled in the Netlify project (Forms → Enable form detection).

## Destination countries

`src/content/countries.js` holds the five countries (Bulgaria, Montenegro, Germany, Turkey, Croatia):
card text, salary badge, facts, popular jobs, requirements, and documents in all three languages.
Each country page (`/countries/<slug>`) also lists that country's live vacancies, matched by the
flag emoji at the start of each Telegram post. Photos are in `public/countries/`; Wikimedia photos
carry the required author/licence credit on the page.
