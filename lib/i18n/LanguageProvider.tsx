"use client";

import { createContext, useEffect, useState } from "react";

export type Lang = "en" | "vi";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

export const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "vi" || stored === "en") setLangState(stored);
  }, []);

  function setLang(next: Lang) {
    setLangState(next);
    localStorage.setItem("lang", next);
    document.documentElement.lang = next;
  }

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
