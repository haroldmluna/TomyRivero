"use client";
import "./gift-cards.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import Copy from "@/components/Copy/Copy";
import { useI18n } from "@/context/I18nContext";

export default function GiftCardsPage() {
  const { t } = useI18n();
  return (
    <>
      <Nav />
      <div className="page gift-cards">
        <section className="gift-hero">
          <div className="container">
            <div className="gift-col">
              <Copy delay={0.85}><p>Tomy Rivero Beauty</p></Copy>
              <Copy delay={0.9}><h1>{t("gift.title", "Gift Cards")}</h1></Copy>
              <Copy delay={1}>
                <h3>{t("gift.hero.copy", "Give the gift of calm, color, and glow. Choose an amount and let them book the service they love—manicure, skincare, or a spa ritual at our Beauty Lab.")}</h3>
              </Copy>
              <AnimatedButton
                label={t("gift.cta", "Buy a gift card")}
                route="https://clients.mangomint.com/gift-cards/571748"
                animateOnScroll={false}
              />
            </div>
            <div className="gift-col">
              <div className="gift-hero-img">
                <img src="/gallery-callout/gallery-callout-3.jpg" alt="Gift Cards" />
              </div>
            </div>
          </div>
        </section>

        <section className="gift-details">
          <div className="container">
            <div className="gift-grid">
              <div className="gift-card">
                <h3>{t("gift.details.instant.title", "Instant delivery")}</h3>
                <p className="md">{t("gift.details.instant.body", "Digital gift card delivered by email with your personal message.")}</p>
              </div>
              <div className="gift-card">
                <h3>{t("gift.details.flexible.title", "Flexible amounts")}</h3>
                <p className="md">{t("gift.details.flexible.body", "Pick a preset or enter a custom value—redeemable for any service.")}</p>
              </div>
              <div className="gift-card">
                <h3>{t("gift.details.redeem.title", "Easy to redeem")}</h3>
                <p className="md">{t("gift.details.redeem.body", "Recipients can book online and apply the code at checkout.")}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ConditionalFooter />
    </>
  );
}
