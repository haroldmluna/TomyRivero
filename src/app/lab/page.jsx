"use client";
import "../index.css";
import "./lab.css";

import ParallaxBanner from "@/components/ParallaxBanner/ParallaxBanner";
import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import FeaturedProjects from "@/components/FeaturedProjects/FeaturedProjects";
import Copy from "@/components/Copy/Copy";
import { useI18n } from "@/context/I18nContext";

export default function Page() {
  const { t } = useI18n();

  return (
    <>
      <Nav />
      <section className="hero">
        <div className="hero-bg">
          <ParallaxBanner />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-gradient"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-header">
              <Copy delay={0.85} animateOnScroll={false}>
                <h1>{t("lab.title", "Beauty Lab")}</h1>
              </Copy>
            </div>
            <div className="hero-tagline">
              <Copy delay={1} animateOnScroll={false}>
                <p>
                  {t(
                    "lab.tagline",
                    "A calm, refined space for modern self-care—expert nail care, rejuvenating skin treatments, and spa rituals designed for clarity, comfort, and glow."
                  )}
                </p>
              </Copy>
            </div>
            <AnimatedButton label={t("lab.reserve", "Book now")} route="/connect" animateOnScroll={false} />
          </div>
        </div>
        <div className="hero-stats">
          <div className="container">
          </div>
        </div>
      </section>

      <section className="what-we-do">
        <div className="container">
          <div className="what-we-do-header">
            <Copy delay={0.1}>
              <h1>{t("home.approach.header", "At Tomy Rivero Beauty, we elevate self‑care with expert nail care, skincare, and spa rituals—crafted for calm, clarity, and a lasting glow.")}</h1>
            </Copy>
          </div>
          <div className="what-we-do-content">
            <div className="what-we-do-col">
              <Copy delay={0.1}><p>Our approach</p></Copy>
              <Copy delay={0.15}><p className="lg">{t("home.approach.lead")}</p></Copy>
            </div>
            <div className="what-we-do-col">
              <div className="what-we-do-tags">
                <div className="what-we-do-tag"><h3>{t("lab.nailCare","Nail Care")}</h3></div>
                <div className="what-we-do-tag"><h3>{t("lab.skincare","Skincare")}</h3></div>
                <div className="what-we-do-tag"><h3>{t("lab.spa","Spa Rituals")}</h3></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-projects-container">
        <div className="container">
          <div className="featured-projects-header-callout"><Copy delay={0.1}><p>Featured services</p></Copy></div>
          <div className="featured-projects-header"><Copy delay={0.15}><h2>A selection of signature services and treatments</h2></Copy></div>
        </div>
        <FeaturedProjects />
      </section>

      <CTAWindow
        img="/home/home-cta-window.jpg"
        header={t("lab.cta.header", "Reserve your visit")}
        callout={t("lab.cta.callout", "Experience Tomy Rivero Beauty Lab")}
        description={t(
          "lab.cta.description",
          "Book online and let our team take care of you with personalized beauty services—crafted for calm, clarity, and glow."
        )}
      />
      <ConditionalFooter />
    </>
  );
}
