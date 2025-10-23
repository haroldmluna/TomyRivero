"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "@/i18n/en.json";
import es from "@/i18n/es.json";

const messages = { en, es };

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    // Start with server-safe default. We'll hydrate the real preferred locale
    // on the client inside useEffect so the first render matches the server.
    return "en";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // On mount, read any stored locale and update state. This avoids a
    // mismatch between the server-rendered HTML (which used 'en') and the
    // client render that might otherwise pick a different locale.
    const stored = localStorage.getItem("locale");
    if (stored && stored !== locale) {
      setLocale(stored);
      document.documentElement.lang = stored;
    } else {
      // ensure lang attribute is set
      document.documentElement.lang = locale;
    }

    // Persist subsequent changes
    localStorage.setItem("locale", locale);
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
