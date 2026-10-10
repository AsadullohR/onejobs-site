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
