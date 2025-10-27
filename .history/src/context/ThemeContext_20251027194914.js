"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Default to dark mode on first visit
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("theme") || "dark";
  });

  const [systemDark, setSystemDark] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Listen to system theme changes for 'system' mode
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setSystemDark(e.matches);
    mq.addEventListener ? mq.addEventListener("change", handler) : mq.addListener(handler);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", handler) : mq.removeListener(handler);
    };
  }, []);

  const activeTheme = theme === "system" ? (systemDark ? "dark" : "light") : theme;

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.setAttribute("data-theme-mode", theme);
    root.classList.remove("theme-dark", "theme-light");
    root.classList.add(activeTheme === "dark" ? "theme-dark" : "theme-light");
  }, [theme, activeTheme]);

  const value = useMemo(() => ({ theme, setTheme, activeTheme }), [theme, activeTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
