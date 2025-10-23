"use client";
import "./Footer.css";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LogoBlack from "@/assets/SVG/tomy-rivero-beauty-logo-black.svg";
import LogoWhite from "@/assets/SVG/tomy-rivero-beauty-logo-white.svg";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useViewTransition } from "@/hooks/useViewTransition";
import Copy from "../Copy/Copy";
import { useI18n } from "@/context/I18nContext";
import { useTheme } from "@/context/ThemeContext";

import { RiLinkedinBoxLine } from "react-icons/ri";
import { RiInstagramLine } from "react-icons/ri";
import { RiDribbbleLine } from "react-icons/ri";
import { RiYoutubeLine } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { navigateWithTransition } = useViewTransition();
  const socialIconsRef = useRef(null);
  const { t } = useI18n();
  const { activeTheme } = useTheme();

  useGSAP(
    () => {
      if (!socialIconsRef.current) return;

      const icons = socialIconsRef.current.querySelectorAll(".icon");
      gsap.set(icons, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: socialIconsRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(icons, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: -0.1,
          ease: "power3.out",
        }),
      });
    },
    { scope: socialIconsRef }
  );

  return (
    <div className="footer">
      <div className="footer-meta">
        <div className="container footer-meta-header">
          <div className="footer-meta-col">
            <div className="footer-meta-block">
              <div className="footer-meta-logo">
                <Copy delay={0.1}>
                  <h3 className="lg">Tomy Rivero Beauty</h3>
                </Copy>
              </div>
              <Copy delay={0.2}>
                <h2>{t("footer.tagline", "Elevate your self‑care experience.")}</h2>
              </Copy>
            </div>
          </div>
          <div className="footer-meta-col">
            <div className="footer-nav-links">
              <Copy delay={0.1}>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/");
                  }}
                >
                  <h3>Home</h3>
                </a>
                <a
                  href="/studio"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/studio");
                  }}
                >
                  <h3>Services</h3>
                </a>
                <a
                  href="/spaces"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/spaces");
                  }}
                >
                  <h3>Gallery</h3>
                </a>
                <a
                  href="/sample-space"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/sample-space");
                  }}
                >
                  <h3>By Look</h3>
                </a>
                <a
                  href="/gift-cards"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/gift-cards");
                  }}
                >
                  <h3>Gift Cards</h3>
                </a>
                <a
                  href="/connect"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition("/connect");
                  }}
                >
                  <h3>Connect</h3>
                </a>
              </Copy>
            </div>
          </div>
        </div>
        <div className="container footer-socials">
          <div className="footer-meta-col">
            <div className="footer-socials-wrapper" ref={socialIconsRef}>
              <div className="icon">
                <RiLinkedinBoxLine />
              </div>
              <div className="icon">
                <RiInstagramLine />
              </div>
              <div className="icon">
                <RiDribbbleLine />
              </div>
              <div className="icon">
                <RiYoutubeLine />
              </div>
            </div>
          </div>
          <div className="footer-meta-col">
            <Copy delay={0.1}>
              <p>
                We believe beauty is a form of self‑care—rooted in expertise,
                clean techniques, and a calm, welcoming touch.
              </p>
            </Copy>
          </div>
        </div>
      </div>
      <div className="footer-outro">
        <div className="container">
          <div className="footer-header">
            <img
              src={(activeTheme === "dark" ? LogoWhite : LogoBlack).src}
              alt="Tomy Rivero Beauty"
            />
          </div>
          <div className="footer-copyright">
            <p>This website is using cookies.</p>
            <p>All rights reserved &copy; 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
