"use client";

import { useContext } from "react";
import { LanguageContext, type Lang } from "./LanguageProvider";
import en from "./en.json";
import vi from "./vi.json";

const dictionaries: Record<Lang, Record<string, string>> = { en, vi };

export function useLang() {
  const { lang, setLang } = useContext(LanguageContext);

  function t(key: string): string {
    return dictionaries[lang][key] ?? dictionaries["en"][key] ?? key;
  }

  return { lang, setLang, t };
}
