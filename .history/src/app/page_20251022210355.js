"use client";
import "./index.css";
import "./preloader.css";
import { useRef, useState, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import LocationImg from "@/assets/image/Location.png";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import FeaturedProjects from "@/components/FeaturedProjects/FeaturedProjects";
import ClientReviews from "@/components/ClientReviews/ClientReviews";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";

let isInitialLoad = true;
gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function Home() {
  const tagsRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  const [loaderAnimating, setLoaderAnimating] = useState(false);
  const lenis = useLenis();

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

      // Elements
      const wordEls = document.querySelectorAll(".intro-words .word h1");

      // Initial states
      gsap.set(".loader", { backgroundColor: "#ffffff" });
      gsap.set([".overlay .top", ".overlay .bottom"], { yPercent: 0 });
      gsap.set(".light-line", { opacity: 0, scaleY: 0.3, transformOrigin: "center center" });
      gsap.set(wordEls, { y: "120%" });
      gsap.set(".glow", { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });

      // Frame 1: Black split reveal with light flare
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

      // Frames 2-4: Words sequence on white
      wordEls.forEach((el, index) => {
        // Enter from bottom a bit faster
        tl.to(el, { y: "0%", duration: 0.45, ease: "power3.inOut" }, index === 0 ? ">0.02" : ">");

        // Shorter hold, faster exit upward
        if (index < wordEls.length - 1) {
          tl.to(el, { y: "-120%", duration: 0.45, ease: "power3.inOut" }, "+=0.6");
        }
      });

      // Frame 4 continuation: Glow transition while last word remains briefly
      tl.to(".glow", { opacity: 1, scale: 1.6, duration: 0.6, ease: "power2.out" }, "+=0.4");

      // Fade out loader to reveal site
      tl.to(
        ".loader",
        {
          opacity: 0,
          duration: 0.6,
          ease: "power3.inOut",
          onStart: () => {
            gsap.to(".hero-img", { scale: 1, duration: 2, ease: "hop" });
          },
          onComplete: () => {
            gsap.set(".loader", { pointerEvents: "none" });
            setLoaderAnimating(false);
          },
        },
        ">-0.1"
      );
    }
  }, [showPreloader]);

  useGSAP(
    () => {
      if (!tagsRef.current) return;

      const tags = tagsRef.current.querySelectorAll(".what-we-do-tag");
      gsap.set(tags, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: tagsRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(tags, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }),
      });
    },
    { scope: tagsRef }
  );

  // Hero parallax image
  useGSAP(() => {
    const img = document.querySelector(".hero-bg img");
    if (!img) return;
    gsap.fromTo(
      img,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });

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
      <Nav />
      <section className="hero">
        <div className="hero-bg">
          <img src={LocationImg.src} alt="Location" />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-gradient"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-header">
              <Copy animateOnScroll={false} delay={showPreloader ? 5.2 : 0.85}>
                <h1>Elevate your self‑care experience</h1>
              </Copy>
            </div>
            <div className="hero-tagline">
              <Copy animateOnScroll={false} delay={showPreloader ? 5.35 : 1}>
                <p>
                  Personalized nail care, rejuvenating skin treatments, and spa services—thoughtfully designed to help you relax, renew, and reveal your best self.
                </p>
              </Copy>
            </div>
            <AnimatedButton
              label="Book now"
              route="/connect"
              animateOnScroll={false}
              delay={showPreloader ? 5.5 : 1.15}
            />
          </div>
        </div>
        <div className="hero-stats">
          <div className="container">
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.1}>
                  <h2>1,000+</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.15}>
                  <p>Colors to choose from</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.2}>
                  <h2>98%</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.25}>
                  <p>Five‑star client satisfaction</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.3}>
                  <h2>5,000+</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.35}>
                  <p>Appointments completed</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.4}>
                  <h2>Fall ’25</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.45}>
                  <p>Beauty Café opens in Inwood</p>
                </Copy>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="what-we-do">
        <div className="container">
          <div className="what-we-do-header">
            <Copy delay={0.1}>
              <h1>
                <span className="spacer">&nbsp;</span>
                At Tomy Rivero Beauty, we elevate self‑care with expert nail care, skincare, and spa rituals—crafted for calm, clarity, and a lasting glow.
              </h1>
            </Copy>
          </div>
          <div className="what-we-do-content">
            <div className="what-we-do-col">
              <Copy delay={0.1}>
                <p>Our approach</p>
              </Copy>

              <Copy delay={0.15}>
                <p className="lg">
                  Every service begins with consultation and care. We combine clean techniques, curated products, and practiced hands to create results that feel refined, restorative, and uniquely yours.
                </p>
              </Copy>
            </div>
            <div className="what-we-do-col">
              <div className="what-we-do-tags" ref={tagsRef}>
                <div className="what-we-do-tag">
                  <h3>Nail Care</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Skincare</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Spa Rituals</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Clean Beauty</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Expert Care</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Beauty Café</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="featured-projects-container">
        <div className="container">
          <div className="featured-projects-header-callout">
            <Copy delay={0.1}>
              <p>Featured services</p>
            </Copy>
          </div>
          <div className="featured-projects-header">
            <Copy delay={0.15}>
              <h2>A selection of signature services and treatments</h2>
            </Copy>
          </div>
        </div>
        <FeaturedProjects />
      </section>
      <section className="client-reviews-container">
        <div className="container">
          <div className="client-reviews-header-callout">
            <p>Sweet reviews from our customers</p>
          </div>
          <ClientReviews />
        </div>
      </section>
      <section className="gallery-callout">
        <div className="container">
          <div className="gallery-callout-col">
            <div className="gallery-callout-row">
              <div className="gallery-callout-img gallery-callout-img-1">
                <img src="/gallery-callout/gallery-callout-1.jpg" alt="" />
              </div>
              <div className="gallery-callout-img gallery-callout-img-2">
                <img src="/gallery-callout/gallery-callout-2.jpg" alt="" />
                <div className="gallery-callout-img-content">
                  <h3>800+</h3>
                  <p>Client looks</p>
                </div>
              </div>
            </div>
            <div className="gallery-callout-row">
              <div className="gallery-callout-img gallery-callout-img-3">
                <img src="/gallery-callout/gallery-callout-3.jpg" alt="" />
              </div>
              <div className="gallery-callout-img gallery-callout-img-4">
                <img src="/gallery-callout/gallery-callout-4.jpg" alt="" />
              </div>
            </div>
          </div>
          <div className="gallery-callout-col">
            <div className="gallery-callout-copy">
              <Copy delay={0.1}>
                <h3>
                  Take a closer look at the looks and treatments our clients love. From clean, minimalist finishes to expressive nail art and restorative facials—find your next favorite.
                </h3>
              </Copy>
              <AnimatedButton label="Explore gallery" route="blueprints" />
            </div>
          </div>
        </div>
      </section>
      <CTAWindow
        img="/home/home-cta-window.jpg"
        header="Tomy Rivero Beauty"
        callout="Elevate your self‑care"
        description="Thoughtful services, expert techniques, and a welcoming space—crafted to help you relax, renew, and leave with that unmistakable glow."
      />
      <ConditionalFooter />
    </>
  );
}
