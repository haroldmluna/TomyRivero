"use client";
import "./TopBar.css";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const lastScrollY = useRef(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    const topBar = topBarRef.current;
    if (!topBar) return;

    const topBarHeight = topBar.offsetHeight;
    gsap.set(topBar, { y: 0 });

    const handleScroll = () => {
      if (isScrolling.current) return;
      isScrolling.current = true;

      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY.current ? 1 : -1;

      if (direction === 1 && currentScrollY > 50) {
        gsap.to(topBar, {
          y: -topBarHeight,
          duration: 0.6,
          ease: "power4.out",
        });
      } else if (direction === -1) {
        gsap.to(topBar, {
          y: 0,
          duration: 0.6,
          ease: "power4.out",
        });
      }

      lastScrollY.current = currentScrollY;
      setTimeout(() => (isScrolling.current = false), 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (topBarRef.current) {
      gsap.set(topBarRef.current, { y: 0 });
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

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

      <div
        className="top-bar-cta"
        suppressHydrationWarning
        style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
      >
        <div
          className="top-bar-controls"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          {mounted ? (
            <>
              <div className="theme-toggle" role="group" aria-label="Theme">
                <button
                  type="button"
                  title="Light"
                  aria-label="Light"
                  className={theme === "light" ? "active" : ""}
                  onClick={() => setTheme("light")}
                >
                  <IoSunnyOutline />
                </button>
                <button
                  type="button"
                  title="Dark"
                  aria-label="Dark"
                  className={theme === "dark" ? "active" : ""}
                  onClick={() => setTheme("dark")}
                >
                  <IoMoonOutline />
                </button>
                <button
                  type="button"
                  title="System"
                  aria-label="System"
                  className={theme === "system" ? "active" : ""}
                  onClick={() => setTheme("system")}
                >
                  <IoDesktopOutline />
                </button>
              </div>

              <select
                aria-label="Language"
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                style={{
                  background: "transparent",
                  color: "var(--base-200)",
                  border: "1px solid var(--base-400)",
                  borderRadius: "0.5rem",
                  padding: "0.25rem 0.5rem",
                }}
              >
                <option value="en">EN</option>
                <option value="es">ES</option>
              </select>
            </>
          ) : (
            <div className="theme-toggle" aria-hidden="true">
              <button type="button" disabled>
                <IoSunnyOutline />
              </button>
              <button type="button" disabled>
                <IoMoonOutline />
              </button>
              <button type="button" disabled>
                <IoDesktopOutline />
              </button>
            </div>
          )}
        </div>

        <AnimatedButton
          label={mounted ? t("topbar.reserve", "Book now") : "Book now"}
          route="/connect"
          animate={false}
        />
      </div>
    </div>
  );
};

export default TopBar;