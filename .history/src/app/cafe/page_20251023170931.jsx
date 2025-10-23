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
                  A place for espresso, matcha, and modern beauty culture. A warm, minimal space to pause, discover
                  color, and connect — now open in Inwood, NYC.
                </p>
              </Copy>
            </div>
            <AnimatedButton label="View menu" route="/cafe#menu" animateOnScroll={false} />
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
              <div className="stat-count"><Copy delay={0.4}><h2>Now Open</h2></Copy></div>
              <div className="stat-divider"></div>
              <div className="stat-info"><Copy delay={0.45}><p>Inwood, NYC</p></Copy></div>
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
              <Copy delay={0.15}><p className="lg">Espresso & matcha drinks, small bites, and a curated color bar alongside our beauty lab.</p></Copy>
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

      {/* Menu */}
      {(() => {
        const menu = [
          {
            section: "Espresso",
            items: [
              { name: "Espresso", desc: "Single / Double", price: "$3.5 / $4.5" },
              { name: "Americano", desc: "Hot or iced", price: "$4.5" },
              { name: "Cappuccino", desc: "Classic 6oz", price: "$5.0" },
              { name: "Latte", desc: "Whole / Oat / Almond", price: "$5.5" },
              { name: "Mocha", desc: "House chocolate", price: "$6.0" },
            ],
          },
          {
            section: "Matcha & Tea",
            items: [
              { name: "Matcha Latte", desc: "Ceremonial grade, hot or iced", price: "$6.0" },
              { name: "Hojicha Latte", desc: "Roasted green tea", price: "$6.0" },
              { name: "Chai Latte", desc: "Spiced black tea", price: "$5.5" },
              { name: "Herbal Tea", desc: "Mint / Chamomile / Hibiscus", price: "$4.0" },
            ],
          },
          {
            section: "Cold",
            items: [
              { name: "Iced Coffee", desc: "Brewed daily", price: "$4.5" },
              { name: "Iced Latte", desc: "Espresso + milk of choice", price: "$5.5" },
              { name: "Sparkling Yuzu", desc: "Citrus + soda", price: "$5.0" },
            ],
          },
          {
            section: "Small Bites",
            items: [
              { name: "Butter Croissant", desc: "Fresh daily", price: "$4.0" },
              { name: "Almond Croissant", desc: "Frangipane", price: "$4.75" },
              { name: "Banana Bread", desc: "Gluten‑free", price: "$4.5" },
            ],
          },
        ];
        return (
          <section id="menu" className="cafe-menu">
            <div className="container">
              <div className="menu-grid">
                {menu.map((sec) => (
                  <div key={sec.section} className="menu-section">
                    <h3>{sec.section}</h3>
                    <div className="menu-items">
                      {sec.items.map((it) => (
                        <div key={it.name} className="menu-item">
                          <div className="menu-line">
                            <span className="menu-name">{it.name}</span>
                            <span className="menu-price">{it.price}</span>
                          </div>
                          {it.desc && <p className="menu-desc">{it.desc}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      <ConditionalFooter />
    </>
  );
}
