"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "@/i18n/en.json";
import es from "@/i18n/es.json";

const messages = { en, es };

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    // On the server we default to English. On the client prefer a stored locale
    // if present; otherwise default to English. Avoid reading `navigator.language`
    // here because that causes the client to pick a different locale on mount
    // and creates a hydration mismatch with the server-rendered HTML.
    if (typeof window === "undefined") return "en";
    return localStorage.getItem("locale") || "en";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const t = (key, fallback) => {
    const parts = key.split(".");
    let obj = messages[locale] || {};
    for (const p of parts) {
      obj = obj?.[p];
      if (obj == null) break;
    }
    if (typeof obj === "string") return obj;
    return fallback ?? key;
  };

  const value = useMemo(() => ({ locale, setLocale, t }), [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
