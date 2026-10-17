import { useEffect } from "react";
import { LangContext, LANGS } from "./lang";

// The language comes from the URL (/en, /bg, …); LangRoute passes it in.
export default function LangProvider({ lang, children }) {
  useEffect(() => {
    document.documentElement.lang = LANGS.find((l) => l.code === lang)?.locale || lang;
  }, [lang]);

  return <LangContext.Provider value={{ lang }}>{children}</LangContext.Provider>;
}
