import { createContext, useContext } from "react";

export const LANGS = [
  { code: "uz", label: "UZ", name: "Oʻzbekcha" },
  { code: "ru", label: "RU", name: "Русский" },
  { code: "en", label: "EN", name: "English" },
];
export const CODES = LANGS.map((l) => l.code);
export const STORAGE_KEY = "onejobs-lang";
export const FALLBACK = "uz";

// Saved choice first, then the browser's language, then Uzbek.
export function detectLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (CODES.includes(saved)) return saved;
  } catch {
    // storage blocked (private mode): fall through to the browser language
  }
  const prefs = typeof navigator !== "undefined" ? navigator.languages || [navigator.language] : [];
  for (const p of prefs) {
    const code = String(p || "").toLowerCase().slice(0, 2);
    if (CODES.includes(code)) return code;
  }
  return FALLBACK;
}

export const LangContext = createContext({ lang: FALLBACK, setLang: () => {} });

export const useLang = () => useContext(LangContext);

// Picks the current language from a { uz, ru, en } content object.
export function useT(content) {
  const { lang } = useLang();
  return content[lang] ?? content.en;
}
