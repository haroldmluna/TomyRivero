"use client";
import "./gift-cards.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import Copy from "@/components/Copy/Copy";

export default function GiftCardsPage() {
  return (
    <>
      <Nav />
      <div className="page gift-cards">
        <section className="gift-hero">
          <div className="container">
            <div className="gift-col">
              <Copy delay={0.85}><p>Tomy Rivero Beauty</p></Copy>
              <Copy delay={0.9}><h1>Gift Cards</h1></Copy>
              <Copy delay={1}>
                <h3>
                  Give the gift of calm, color, and glow. Choose an amount and let them book the service they love—
                  manicure, skincare, or a spa ritual at our Beauty Lab.
                </h3>
              </Copy>
              <AnimatedButton
                label="Buy a gift card"
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
                <h3>Instant delivery</h3>
                <p className="md">Digital gift card delivered by email with your personal message.</p>
              </div>
              <div className="gift-card">
                <h3>Flexible amounts</h3>
                <p className="md">Pick a preset or enter a custom value—redeemable for any service.</p>
              </div>
              <div className="gift-card">
                <h3>Easy to redeem</h3>
                <p className="md">Recipients can book online and apply the code at checkout.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ConditionalFooter />
    </>
  );
}
