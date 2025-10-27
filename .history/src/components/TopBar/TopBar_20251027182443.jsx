"use client";
import "./TopBar.css";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useViewTransition } from "@/hooks/useViewTransition";
import AnimatedButton from "../AnimatedButton/AnimatedButton";
import { useI18n } from "@/context/I18nContext";
import { useTheme } from "@/context/ThemeContext";
import LogoWhite from "@/assets/SVG/tomy-rivero-beauty-logo-white.svg";
import LogoBlack from "@/assets/SVG/tomy-rivero-beauty-logo-black.svg";
import LabLogoWhite from "@/assets/SVG/tomy-rivero-beauty-lab-logo-white.svg";
import LabLogoBlack from "@/assets/SVG/tomy-rivero-beauty-lab-logo-black.svg";
import CafeLogoWhite from "@/assets/SVG/tomy-rivero-beauty-cafe-logo-white.svg";
import CafeLogoBlack from "@/assets/SVG/tomy-rivero-beauty-cafe-logo-black.svg";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const TopBar = () => {
  const topBarRef = useRef(null);
  const { navigateWithTransition } = useViewTransition();
  const { t, locale, setLocale } = useI18n();
  const { activeTheme } = useTheme();
  const pathname = usePathname();

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
          {(() => {
            const section = pathname?.startsWith("/lab")
              ? "lab"
              : pathname?.startsWith("/cafe")
              ? "cafe"
              : "default";
            const logoMap = {
              default: { light: LogoBlack, dark: LogoWhite },
              lab: { light: LabLogoBlack, dark: LabLogoWhite },
              cafe: { light: CafeLogoBlack, dark: CafeLogoWhite },
            };
            const src = (activeTheme === "dark"
              ? logoMap[section].dark
              : logoMap[section].light).src;
            const alt = section === "lab"
              ? "Tomy Rivero Beauty Lab"
              : section === "cafe"
              ? "Tomy Rivero Beauty Café"
              : "Tomy Rivero Beauty";
            return <img src={src} alt={alt} />;
          })()}
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
              <select
                aria-label="Language"
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                style={{
                  background: "var(--control-bg)",
                  color: "var(--control-text)",
                  border: "1px solid var(--control-border)",
                  borderRadius: "0.5rem",
                  padding: "0.25rem 0.5rem",
                  backdropFilter: "blur(6px)",
                }}
              >
                <option value="en">EN</option>
                <option value="es">ES</option>
              </select>
            </>
          ) : (
            <div aria-hidden="true" style={{ width: "2.5rem", height: "2.5rem" }} />
          )}
        </div>

        {(() => {
          const section = pathname?.startsWith("/lab")
            ? "lab"
            : pathname?.startsWith("/cafe")
            ? "cafe"
            : "default";
          const bookingUrl =
            section === "lab" || section === "cafe"
              ? "https://booking.mangomint.com/tomyriverobeautylab"
              : "/connect";
          return (
            <AnimatedButton
              label={mounted ? t("topbar.reserve", "Book now") : "Book now"}
              route={bookingUrl}
              animate={false}
            />
          );
        })()}
      </div>
    </div>
  );
};

export default TopBar;