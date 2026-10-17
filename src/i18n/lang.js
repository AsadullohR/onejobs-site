import { createContext, useContext } from "react";

// English first: it is the fallback for any content not written in a language yet.
export const LANGS = [
  { code: "en", label: "EN", name: "English", locale: "en" },
  { code: "bg", label: "BG", name: "Български", locale: "bg" },
  { code: "me", label: "ME", name: "Crnogorski", locale: "sr-Latn-ME" },
  { code: "ru", label: "RU", name: "Русский", locale: "ru" },
  { code: "uz", label: "UZ", name: "Oʻzbekcha", locale: "uz-Latn" },
];
export const CODES = LANGS.map((l) => l.code);
export const STORAGE_KEY = "onejobs-lang";
export const FALLBACK = "en";

// Browser language codes that should land on Montenegrin (Serbo-Croatian family).
const ME_ALIASES = ["me", "cnr", "sr", "hr", "bs", "sh"];

export const isLang = (code) => CODES.includes(code);

// Saved choice first, then the browser's language, then English. Client-only.
export function detectLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    // storage blocked (private mode): fall through to the browser language
  }
  const prefs = typeof navigator !== "undefined" ? navigator.languages || [navigator.language] : [];
  for (const p of prefs) {
    const code = String(p || "").toLowerCase().slice(0, 3).replace(/[-_].*/, "");
    if (isLang(code)) return code;
    if (ME_ALIASES.includes(code)) return "me";
  }
  return FALLBACK;
}

export function saveLang(code) {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // not persisted; the URL still carries the language
  }
}

// "/en/employers#hire" -> { lang: "en", rest: "/employers#hire" }
export function splitLangPath(pathname) {
  const m = pathname.match(/^\/([a-z]{2})(?=\/|$)(.*)$/);
  if (m && isLang(m[1])) return { lang: m[1], rest: m[2] || "/" };
  return { lang: null, rest: pathname || "/" };
}

// Prefix an app path with a language, ending the path in "/" because pre-rendered pages are
// served as folders (Netlify redirects /bg to /bg/):
// ("/", "bg") -> "/bg/", ("/employers#request", "bg") -> "/bg/employers/#request".
export function withLang(path, lang) {
  if (!path.startsWith("/")) return path;
  const cut = path.search(/[?#]/);
  const pathname = cut === -1 ? path : path.slice(0, cut);
  const tail = cut === -1 ? "" : path.slice(cut);
  const slashed = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return `/${lang}${slashed === "/" ? "/" : slashed}${tail}`;
}

export const LangContext = createContext({ lang: FALLBACK });

export const useLang = () => useContext(LangContext);

// Picks the current language from a { en, bg, me, ru, uz } object, falling back to English.
export const pick = (content, lang) => content[lang] ?? content.en;

export function useT(content) {
  const { lang } = useLang();
  return pick(content, lang);
}

// Returns a function that turns "/employers" into "/<lang>/employers".
export function useLocalePath() {
  const { lang } = useLang();
  return (path) => withLang(path, lang);
}
