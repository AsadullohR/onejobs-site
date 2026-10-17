import { useEffect } from "react";
import { useLang, pick } from "../i18n/lang";
import { seo } from "../content/seo";

// Keeps <title> and the description in sync during client-side navigation.
// The pre-rendered HTML already carries the same values for search engines.
export function useSeo(key, arg) {
  const { lang } = useLang();
  useEffect(() => {
    const entry = seo[key] && pick(seo[key], lang);
    if (!entry) return;
    const resolve = (v) => (typeof v === "function" ? v(arg) : v);
    document.title = resolve(entry.title);
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", resolve(entry.description));
  }, [key, arg, lang]);
}
