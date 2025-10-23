"use client";
import "../index.css";
import "./cafe.css";

import ParallaxBanner from "@/components/ParallaxBanner/ParallaxBanner";
import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
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
                <h1>{t("cafe.title", "Beauty Caf\u00e9")}</h1>
              </Copy>
            </div>
            <div className="hero-tagline">
              <Copy delay={1} animateOnScroll={false}>
                <p>
                  {t(
                    "cafe.tagline",
                    "Opening in Inwood, Fall '25 — a place for espresso, matcha, and modern beauty culture. A warm, minimal space to pause, discover color, and connect."
                  )}
                </p>
              </Copy>
            </div>
            <AnimatedButton label={t("cafe.joinWaitlist", "Join the waitlist")} route="/connect" animateOnScroll={false} />
          </div>
        </div>
        <div className="hero-stats">
          <div className="container">
            <div className="stat">
              <div className="stat-count"><Copy delay={0.1}><h2>Signature</h2></Copy></div>
              <div className="stat-divider"></div>
              <div className="stat-info"><Copy delay={0.15}><p>{t("cafe.signatureDrinks","Signature Drinks")}</p></Copy></div>
            </div>
            <div className="stat">
              <div className="stat-count"><Copy delay={0.2}><h2>1,000+</h2></Copy></div>
              <div className="stat-divider"></div>
              <div className="stat-info"><Copy delay={0.25}><p>Colors library</p></Copy></div>
            </div>
            <div className="stat">
              <div className="stat-count"><Copy delay={0.3}><h2>Events</h2></Copy></div>
              <div className="stat-divider"></div>
              <div className="stat-info"><Copy delay={0.35}><p>{t("cafe.events","Events & Workshops")}</p></Copy></div>
            </div>
            <div className="stat">
              <div className="stat-count"><Copy delay={0.4}><h2>Fall ’25</h2></Copy></div>
              <div className="stat-divider"></div>
              <div className="stat-info"><Copy delay={0.45}><p>Opening in Inwood</p></Copy></div>
            </div>
          </div>
        </div>
      </section>

      <section className="what-we-do">
        <div className="container">
          <div className="what-we-do-header">
            <Copy delay={0.1}>
              <h1>{t("cafe.name","Tomy Rivero Beauty")}</h1>
            </Copy>
          </div>
          <div className="what-we-do-content">
            <div className="what-we-do-col">
              <Copy delay={0.1}><p>What to expect</p></Copy>
              <Copy delay={0.15}><p className="lg">{t("cafe.tagline")}</p></Copy>
            </div>
            <div className="what-we-do-col">
              <div className="what-we-do-tags">
                <div className="what-we-do-tag"><h3>{t("cafe.signatureDrinks","Signature Drinks")}</h3></div>
                <div className="what-we-do-tag"><h3>{t("cafe.colorRetail","Color & Retail")}</h3></div>
                <div className="what-we-do-tag"><h3>{t("cafe.events","Events & Workshops")}</h3></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTAWindow
        img="/studio/about-cta-window.jpg"
        header={t("cafe.cta.comingSoon", "Coming Soon")}
        callout={t("cafe.cta.callout", "Tomy Rivero Beauty Caf\u00e9")}
        description={t(
          "cafe.cta.description",
          "A new space for beauty and everyday ritual. Be the first to know about opening events and specials."
        )}
      />

      <ConditionalFooter />
    </>
  );
}
