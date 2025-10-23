"use client";
import "./index.css";
import "./preloader.css";
import { useRef, useState, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

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
      tl.to(".light-line", { opacity: 1, scaleY: 1, duration: 0.6, ease: "power3.out" }, 0);
      tl.to(
        ".light-line",
        { scaleY: 2, duration: 0.28, ease: "power3.inOut", yoyo: true, repeat: 1 },
        ">-0.05"
      );
      tl.to(
        ".overlay .top",
        { yPercent: -100, duration: 1.4, ease: "power3.inOut" },
        "<0.0"
      );
      tl.to(
        ".overlay .bottom",
        { yPercent: 100, duration: 1.4, ease: "power3.inOut" },
        "<"
      );
      tl.to(".light-line", { opacity: 0, duration: 0.4, ease: "power2.out" }, "<0.2");

      // Frames 2-4: Words sequence on white
      wordEls.forEach((el, index) => {
        // Enter from bottom
        tl.to(
          el,
          { y: "0%", duration: 1, ease: "power3.inOut" },
          index === 0 ? ">0.1" : ">"
        );

        // Hold 2s, then exit upward (for last word we handle differently)
        if (index < wordEls.length - 1) {
          tl.to(el, { y: "-120%", duration: 0.9, ease: "power3.inOut" }, "+=2");
        }
      });

      // Frame 4 continuation: Glow transition while last word remains briefly
      tl.to(".glow", { opacity: 1, scale: 1.6, duration: 1.2, ease: "power2.out" }, "+=0.8");

      // Fade out loader to reveal site
      tl.to(
        ".loader",
        {
          opacity: 0,
          duration: 0.9,
          ease: "power3.inOut",
          onStart: () => {
            gsap.to(".hero-img", { scale: 1, duration: 2, ease: "hop" });
          },
          onComplete: () => {
            gsap.set(".loader", { pointerEvents: "none" });
            setLoaderAnimating(false);
          },
        },
        ">-0.2"
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
          <img src="/home/hero.jpg" alt="" />
        </div>
        <div className="hero-gradient"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-header">
              <Copy animateOnScroll={false} delay={showPreloader ? 13.5 : 0.85}>
                <h1>Spaces that feel rooted, human, and quietly bold</h1>
              </Copy>
            </div>
            <div className="hero-tagline">
              <Copy animateOnScroll={false} delay={showPreloader ? 13.65 : 1}>
                <p>
                  At Terrene, we shape environments that elevate daily life,
                  invite pause, and speak through texture and light.
                </p>
              </Copy>
            </div>
            <AnimatedButton
              label="Discover More"
              route="/studio"
              animateOnScroll={false}
              delay={showPreloader ? 13.8 : 1.15}
            />
          </div>
        </div>
        <div className="hero-stats">
          <div className="container">
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.1}>
                  <h2>225+</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.15}>
                  <p>Completed design studies</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.2}>
                  <h2>36</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.25}>
                  <p>Ongoing spatial explorations</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.3}>
                  <h2>12</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.35}>
                  <p>Cross-disciplinary collaborators</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.4}>
                  <h2>98%</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.45}>
                  <p>Return rate across commissions</p>
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
                At Terrene, we design with purpose and clarity, creating spaces
                that speak through light, scale, and the quiet confidence of
                lasting form.
              </h1>
            </Copy>
          </div>
          <div className="what-we-do-content">
            <div className="what-we-do-col">
              <Copy delay={0.1}>
                <p>How we work</p>
              </Copy>

              <Copy delay={0.15}>
                <p className="lg">
                  We approach each build with a clarity of intent. Every plan is
                  shaped through research, iteration, and conversation. What
                  remains is the essential, designed to last and built to feel
                  lived in.
                </p>
              </Copy>
            </div>
            <div className="what-we-do-col">
              <div className="what-we-do-tags" ref={tagsRef}>
                <div className="what-we-do-tag">
                  <h3>Quiet</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>View</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Tactile</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Light-forward</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Slow design</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Modular rhythm</h3>
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
              <p>Featured work</p>
            </Copy>
          </div>
          <div className="featured-projects-header">
            <Copy delay={0.15}>
              <h2>A selection of recent studies and completed spaces</h2>
            </Copy>
          </div>
        </div>
        <FeaturedProjects />
      </section>
      <section className="client-reviews-container">
        <div className="container">
          <div className="client-reviews-header-callout">
            <p>Voices from our spaces</p>
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
                  <p>Project Images</p>
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
                  Take a closer look at the projects that define our practice.
                  From intimate interiors to expansive landscapes, each image
                  highlights a unique perspective that might spark your next big
                  idea.
                </h3>
              </Copy>
              <AnimatedButton label="Explore Gallery" route="blueprints" />
            </div>
          </div>
        </div>
      </section>
      <CTAWindow
        img="/home/home-cta-window.jpg"
        header="Terrene"
        callout="Spaces that breathe with time"
        description="Our approach is guided by rhythm, proportion, and light, allowing every environment to grow more meaningful as it is lived in."
      />
      <ConditionalFooter />
    </>
  );
}
