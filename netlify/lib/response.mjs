// JSON response cached on Netlify's CDN for `maxAge` seconds, then refreshed in the background.
export const json = (body, status, maxAge) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=60",
      "Netlify-CDN-Cache-Control": `public, s-maxage=${maxAge}, stale-while-revalidate=86400`,
    },
  });
