"use client";
import "./TopBar.css";

import { useRef, useEffect, useState } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { useViewTransition } from "@/hooks/useViewTransition";
import AnimatedButton from "../AnimatedButton/AnimatedButton";
import { useI18n } from "@/context/I18nContext";
import { useTheme } from "@/context/ThemeContext";
import { IoSunnyOutline, IoMoonOutline, IoDesktopOutline } from "react-icons/io5";
import LogoWhite from "@/SVG/tomy-rivero-beauty-logo-white.svg";

gsap.registerPlugin(ScrollTrigger);

const TopBar = () => {
  const topBarRef = useRef(null);
  const { navigateWithTransition } = useViewTransition();
  const { t, locale, setLocale } = useI18n();
  const { theme, setTheme, activeTheme } = useTheme();
  let lastScrollY = 0;
  let isScrolling = false;
  const [mounted, setMounted] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const themeMenuRef = useRef(null);
  const resolvedTheme = activeTheme || theme;

  useEffect(() => {
    const topBar = topBarRef.current;
    if (!topBar) return;

    const topBarHeight = topBar.offsetHeight;

    gsap.set(topBar, { y: 0 });

    const handleScroll = () => {
      if (isScrolling) return;

      isScrolling = true;
      const currentScrollY = window.scrollY;
    const direction = currentScrollY > lastScrollY ? 1 : -1;

      if (direction === 1 && currentScrollY > 50) {
        gsap.to(topBar, {
          y: -topBarHeight,
          duration: 1,
          ease: "power4.out",
        });
      } else if (direction === -1) {
        gsap.to(topBar, {
          y: 0,
          duration: 1,
          ease: "power4.out",
        });
      }

      lastScrollY = currentScrollY;

      setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (topBarRef.current) {
      gsap.set(topBarRef.current, { y: 0 });
    }
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!themeOpen) return;

    const onDocClick = (e) => {
      if (!themeMenuRef.current) return;
      if (!themeMenuRef.current.contains(e.target)) setThemeOpen(false);
    };

    const onKey = (e) => {
      if (e.key === "Escape") setThemeOpen(false);
    };

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [themeOpen]);

  return (
    <div className="top-bar" ref={topBarRef}>
        <div className="top-bar-logo">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigateWithTransition("/");
          }}
        >
          <img src={LogoWhite.src} alt="Tomy Rivero Beauty" />
        </a>
      </div>
      <div className="top-bar-cta" suppressHydrationWarning style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div className="top-bar-controls" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {mounted ? (
            <>
              <div className="theme-dropdown" ref={themeMenuRef}>
                <button
                  type="button"
                  className="theme-btn"
                  aria-haspopup="menu"
                  aria-expanded={themeOpen}
                  aria-label={t("topbar.theme","Theme")}
                  onClick={() => setThemeOpen((v) => !v)}
                >
                  {resolvedTheme === "light" ? <IoSunnyOutline /> : resolvedTheme === "dark" ? <IoMoonOutline /> : <IoDesktopOutline />}
                </button>
                {themeOpen && (
                  <ul className="theme-menu" role="menu" aria-label={t("topbar.themeMenu","Theme menu")}>
                    <li role="none">
                      <button
                        role="menuitemradio"
                        aria-checked={resolvedTheme === "light"}
                        className={resolvedTheme === "light" ? "active" : ""}
                        onClick={() => {
                          setTheme("light");
                          setThemeOpen(false);
                        }}
                      >
                        <IoSunnyOutline /> {t("topbar.light","Light")}
                      </button>
                    </li>
                    <li role="none">
                      <button
                        role="menuitemradio"
                        aria-checked={resolvedTheme === "dark"}
                        className={resolvedTheme === "dark" ? "active" : ""}
                        onClick={() => {
                          setTheme("dark");
                          setThemeOpen(false);
                        }}
                      >
                        <IoMoonOutline /> {t("topbar.dark","Dark")}
                      </button>
                    </li>
                    <li role="none">
                      <button
                        role="menuitemradio"
                        aria-checked={resolvedTheme === "system"}
                        className={resolvedTheme === "system" ? "active" : ""}
                        onClick={() => {
                          setTheme("system");
                          setThemeOpen(false);
                        }}
                      >
                        <IoDesktopOutline /> {t("topbar.system","System")}
                      </button>
                    </li>
                  </ul>
                )}
              </div>
              <select
                aria-label={t("topbar.languageLabel","Language")}
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                style={{ background: "transparent", color: "var(--base-200)", border: "1px solid var(--base-400)", borderRadius: "0.5rem", padding: "0.25rem 0.5rem" }}
              >
                <option value="en">EN</option>
                <option value="es">ES</option>
              </select>
            </>
          ) : (
            <div className="theme-toggle" aria-hidden="true">
              <button type="button" disabled><IoSunnyOutline /></button>
              <button type="button" disabled><IoMoonOutline /></button>
              <button type="button" disabled><IoDesktopOutline /></button>
            </div>
          )}
        </div>
        <AnimatedButton label={t("topbar.reserve", "Book now")} route="/connect" animate={false} />
      </div>
    </div>
  );
};

export default TopBar;
