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

Post format that fills the cards best (one field per line, English, Uzbek, or Russian labels):

```
Welder needed in Germany
Country: Germany
Position: Welder
Salary: €2,800 – €3,500
Schedule: 5/2, 8 hours
Housing: provided
```

Local dev: `npm run dev` (the function runs inside Vite).
