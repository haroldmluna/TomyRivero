
"use client";
import "./index.css";
import "./preloader.css";
import "@/components/JoinForm/JoinForm.css";
import { useState, useEffect } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import LabLogoWhite from "@/assets/SVG/tomy-rivero-beauty-lab-logo-white.svg";
import CafeLogoWhite from "@/assets/SVG/tomy-rivero-beauty-cafe-logo-white.svg";
import { useViewTransition } from "@/hooks/useViewTransition";
import MouseRevealMask from "@/components/MouseRevealMask/MouseRevealMask";

let isInitialLoad = true;
gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  const [loaderAnimating, setLoaderAnimating] = useState(false);
  const lenis = useLenis();
  const { navigateWithTransition } = useViewTransition();

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  useEffect(() => {
    if (lenis) {
      if (loaderAnimating) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, loaderAnimating]);

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 0.3,
      defaults: {
        ease: "hop",
      },
    });

    if (showPreloader) {
      setLoaderAnimating(true);

      const wordEls = document.querySelectorAll(".intro-words .word h1");

      gsap.set(".loader", { backgroundColor: "#ffffff" });
      gsap.set([".overlay .top", ".overlay .bottom"], { yPercent: 0 });
      gsap.set(".light-line", { opacity: 0, scaleY: 0.3, transformOrigin: "center center" });
      gsap.set(wordEls, { y: "120%" });
      gsap.set(".glow", { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });

      tl.to(".light-line", { opacity: 1, scaleY: 1, duration: 0.35, ease: "power3.out" }, 0);
      tl.to(
        ".light-line",
        { scaleY: 2, duration: 0.18, ease: "power3.inOut", yoyo: true, repeat: 1 },
        ">-0.05"
      );
      tl.to(
        ".overlay .top",
        { yPercent: -100, duration: 0.8, ease: "power3.inOut" },
        "<0.0"
      );
      tl.to(
        ".overlay .bottom",
        { yPercent: 100, duration: 0.8, ease: "power3.inOut" },
        "<"
      );
      tl.to(".light-line", { opacity: 0, duration: 0.25, ease: "power2.out" }, "<0.1");

      wordEls.forEach((el, index) => {
        tl.to(el, { y: "0%", duration: 0.45, ease: "power3.inOut" }, index === 0 ? ">0.02" : ">");
        if (index < wordEls.length - 1) {
          tl.to(el, { y: "-120%", duration: 0.45, ease: "power3.inOut" }, "+=0.6");
        }
      });

      tl.to(".glow", { opacity: 1, scale: 1.6, duration: 0.6, ease: "power2.out" }, "+=0.4");

      tl.to(
        ".loader",
        {
          opacity: 0,
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(".loader", { pointerEvents: "none" });
            setLoaderAnimating(false);
          },
        },
        ">-0.1"
      );
    }
  }, [showPreloader]);

  return (
    <>
      {showPreloader && (
        <div className="loader">
          <div className="overlay">
            <div className="block top"></div>
            <div className="block bottom"></div>
          </div>
          <div className="light-line" />
          <div className="intro-words" aria-hidden>
            <div className="word"><h1>BEAUTY</h1></div>
            <div className="word"><h1>GATHER</h1></div>
            <div className="word"><h1>GLOW</h1></div>
          </div>
          <div className="glow" />
        </div>
      )}
      <main>
        <section className="brand-gate">
          <div className="brand-gate-grid">
            <div
              className="gate gate-left"
              onClick={(e) => {
                e.preventDefault();
                navigateWithTransition("/lab");
              }}
            >
              <MouseRevealMask backgroundImage="/studio/about-hero.png" id="lab-mask">
                <a href="/lab">
                  <img src={LabLogoWhite.src} alt="Tomy Rivero Beauty Lab" />
                </a>
              </MouseRevealMask>
            </div>
            <div
              className="gate gate-right"
              onClick={(e) => {
                e.preventDefault();
                navigateWithTransition("/cafe");
              }}
            >
              <MouseRevealMask backgroundImage="/home/home-cta-window.jpg" id="cafe-mask">
                <a href="/cafe">
                  <img src={CafeLogoWhite.src} alt="Tomy Rivero Beauty Café" />
                </a>
              </MouseRevealMask>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
