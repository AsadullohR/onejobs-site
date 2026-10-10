import { useEffect, useState } from "react";

// One request per feed per page load, shared by every component that asks for it.
const cache = {};
function load(name) {
  cache[name] ??= fetch(`/.netlify/functions/${name}`)
    .then((r) => r.json())
    .catch(() => ({ error: "network" }));
  return cache[name];
}

// Reads a Netlify function feed ("vacancies", "visas", "videos").
// `items` is the array under `key`; `url` is the source channel/playlist (absent when not configured).
export function useFeed(name, key) {
  const [state, setState] = useState({ loading: true, items: [], url: null, error: null });
  useEffect(() => {
    let alive = true;
    load(name).then((d) => {
      if (alive) setState({ loading: false, items: d[key] || [], url: d.url || null, error: d.error || null });
    });
    return () => {
      alive = false;
    };
  }, [name, key]);
  return state;
}
