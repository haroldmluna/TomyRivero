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
                <p>{t("cafe.openTagline", "A place for espresso, matcha, and modern beauty culture. A warm, minimal space to pause, discover color, and connect — now open in Inwood, NYC.")}</p>
              </Copy>
            </div>
            <AnimatedButton label={t("cafe.viewMenu","View menu")} route="/cafe#menu" animateOnScroll={false} />
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
              <div className="stat-info"><Copy delay={0.25}><p>{t("cafe.colorsLibrary","Colors library")}</p></Copy></div>
            </div>
            <div className="stat">
              <div className="stat-count"><Copy delay={0.3}><h2>Events</h2></Copy></div>
              <div className="stat-divider"></div>
              <div className="stat-info"><Copy delay={0.35}><p>{t("cafe.events","Events & Workshops")}</p></Copy></div>
            </div>
            <div className="stat">
              <div className="stat-count"><Copy delay={0.4}><h2>{t("cafe.nowOpen","Now Open")}</h2></Copy></div>
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
            section: t("cafe.menu.espresso.title","Espresso"),
            items: [
              { name: t("cafe.menu.items.espresso.name","Espresso"), desc: t("cafe.menu.items.espresso.desc","Single / Double"), price: "$3.5 / $4.5" },
              { name: t("cafe.menu.items.americano.name","Americano"), desc: t("cafe.menu.items.americano.desc","Hot or iced"), price: "$4.5" },
              { name: t("cafe.menu.items.cappuccino.name","Cappuccino"), desc: t("cafe.menu.items.cappuccino.desc","Classic 6oz"), price: "$5.0" },
              { name: t("cafe.menu.items.latte.name","Latte"), desc: t("cafe.menu.items.latte.desc","Whole / Oat / Almond"), price: "$5.5" },
              { name: t("cafe.menu.items.mocha.name","Mocha"), desc: t("cafe.menu.items.mocha.desc","House chocolate"), price: "$6.0" },
            ],
          },
          {
            section: t("cafe.menu.matchaTea.title","Matcha & Tea"),
            items: [
              { name: t("cafe.menu.items.matchaLatte.name","Matcha Latte"), desc: t("cafe.menu.items.matchaLatte.desc","Ceremonial grade, hot or iced"), price: "$6.0" },
              { name: t("cafe.menu.items.hojichaLatte.name","Hojicha Latte"), desc: t("cafe.menu.items.hojichaLatte.desc","Roasted green tea"), price: "$6.0" },
              { name: t("cafe.menu.items.chaiLatte.name","Chai Latte"), desc: t("cafe.menu.items.chaiLatte.desc","Spiced black tea"), price: "$5.5" },
              { name: t("cafe.menu.items.herbalTea.name","Herbal Tea"), desc: t("cafe.menu.items.herbalTea.desc","Mint / Chamomile / Hibiscus"), price: "$4.0" },
            ],
          },
          {
            section: t("cafe.menu.cold.title","Cold"),
            items: [
              { name: t("cafe.menu.items.icedCoffee.name","Iced Coffee"), desc: t("cafe.menu.items.icedCoffee.desc","Brewed daily"), price: "$4.5" },
              { name: t("cafe.menu.items.icedLatte.name","Iced Latte"), desc: t("cafe.menu.items.icedLatte.desc","Espresso + milk of choice"), price: "$5.5" },
              { name: t("cafe.menu.items.sparklingYuzu.name","Sparkling Yuzu"), desc: t("cafe.menu.items.sparklingYuzu.desc","Citrus + soda"), price: "$5.0" },
            ],
          },
          {
            section: t("cafe.menu.bites.title","Small Bites"),
            items: [
              { name: t("cafe.menu.items.croissant.name","Butter Croissant"), desc: t("cafe.menu.items.croissant.desc","Fresh daily"), price: "$4.0" },
              { name: t("cafe.menu.items.almondCroissant.name","Almond Croissant"), desc: t("cafe.menu.items.almondCroissant.desc","Frangipane"), price: "$4.75" },
              { name: t("cafe.menu.items.bananaBread.name","Banana Bread"), desc: t("cafe.menu.items.bananaBread.desc","Gluten‑free"), price: "$4.5" },
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
