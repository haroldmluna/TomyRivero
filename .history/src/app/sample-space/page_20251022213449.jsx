"use client";
import "./sample-space.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";
import { useI18n } from "@/context/I18nContext";

const page = () => {
  const { t } = useI18n();

  return (
    <>
      <Nav />
      <div className="page sample-space">
        <section className="sample-space-hero">
          <div className="sample-space-hero-img">
            <img src="/sample-space/hero.jpg" alt="Signature Gel Manicure" />
          </div>
          <div className="sample-space-hero-overlay"></div>
          <div className="container">
            <div className="sample-space-hero-header">
              <Copy delay={1} animateOnScroll={false}>
                <h1>{t("sample.title", "Signature Gel Manicure")}</h1>
              </Copy>
            </div>
            <div className="sample-space-content">
              <div className="sample-space-col">
                <Copy delay={1.05} animateOnScroll={false}>
                  <p>{t("sample.location", "Inwood, NYC")}</p>
                </Copy>
              </div>
              <div className="sample-space-col">
                <div className="sample-space-content-wrapper">
                  <Copy delay={1.1} animateOnScroll={false}>
                    <p>{t("sample.lab","Beauty Lab")}</p>
                  </Copy>
                </div>
                <div className="sample-space-content-wrapper">
                  <Copy delay={1.15} animateOnScroll={false}>
                    <h3>{t(
                      "sample.description1",
                      "A meticulous prep, long-wear finish, and over 1,000 curated shades to choose from. Clean, refined, and made to last."
                    )}</h3>
                    <h3>{t(
                      "sample.description2",
                      "A quiet ritual that prioritizes nail health and polish precision so your everyday feels a little more elevated."
                    )}</h3>
                  </Copy>
                </div>
                <div className="sample-space-content-wrapper sample-space-meta">
                  <div className="sample-space-hero-row">
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.2}>
                        <p>{t("sample.duration","Duration")}</p>
                        <p>{t("sample.durationTime","~60 min")}</p>
                      </Copy>
                    </div>
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.2}>
                        <p>{t("sample.includes","Includes")}</p>
                        <p>{t("sample.includesItems","Cuticle care, shaping")}</p>
                        <p>{t("sample.includesItems2","Gel polish application")}</p>
                      </Copy>
                    </div>
                  </div>
                </div>
                <div className="sample-space-content-wrapper sample-space-meta">
                  <div className="sample-space-hero-row">
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.35}>
                        <p>{t("sample.finish","Finish")}</p>
                        <p>{t("sample.finishOptions","Glossy or soft matte")}</p>
                        <p>{t("sample.finishOptional","Optional nail art")}</p>
                      </Copy>
                    </div>
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.35}>
                        <p>{t("sample.care","Care")}</p>
                        <p>{t("sample.careDaily","Daily cuticle oil")}</p>
                        <p>{t("sample.careRemoval","Gentle removal")}</p>
                      </Copy>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="sample-space-details sample-space-details-1">
          <div className="container">
            <div className="sample-space-col">
              <Copy delay={0.1}>
                <p>{t("sample.about","About the service")}</p>
              </Copy>
            </div>
            <div className="sample-space-col">
              <Copy delay={0.1}>
                  <h3>{t("sample.aboutPara1","Clean techniques and careful shape work are the foundation of this manicure. We prioritize nail health while achieving a smooth, even finish with a longer wear time.")}</h3>

                  <h3>{t("sample.aboutPara2","Choose a timeless neutral or a statement shade—our curated palette makes it easy to find a look that fits your style and mood.")}</h3>
                </Copy>
              <div className="sample-space-details-img">
                <img src="/sample-space/sample-space-1.jpg" alt="" />
              </div>
            </div>
          </div>
        </section>
        <section className="sample-space-details sample-space-details-2">
          <div className="container">
            <div className="sample-space-col">
              <Copy delay={0.1}>
                <p>{t("sample.goodToKnow","Good to know")}</p>
              </Copy>
            </div>
            <div className="sample-space-col">
              <div className="sample-space-content-wrapper sample-space-meta">
                <div className="sample-space-hero-row">
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.1}>
                      <p>{t("sample.atmosphere","Atmosphere")}</p>
                      <p>{t("sample.atmosphereCalm","Calm")}</p>
                      <p>{t("sample.atmosphereClean","Clean techniques")}</p>
                      <p>{t("sample.atmosphereGentle","Gentle care")}</p>
                    </Copy>
                  </div>
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.1}>
                      <p>{t("sample.finish","Finish")}</p>
                      <p>{t("sample.longWear","Long‑wear shine")}</p>
                      <p>{t("sample.softMatte","Soft matte (optional)")}</p>
                      <p>{t("sample.nailArt","Nail art (optional)")}</p>
                    </Copy>
                  </div>
                </div>
              </div>
              <div className="sample-space-content-wrapper sample-space-meta">
                <div className="sample-space-hero-row">
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.2}>
                      <p>{t("sample.care","Care")}</p>
                      <p>{t("sample.careCuticle","Cuticle oil daily")}</p>
                      <p>{t("sample.careFile","File as needed")}</p>
                      <p>{t("sample.careGentle","Gentle removal")}</p>
                    </Copy>
                  </div>
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.2}>
                      <p>{t("sample.next","Next")}</p>
                      <p>{t("sample.next1","Hydrating facial")}</p>
                      <p>{t("sample.next2","Signature pedicure")}</p>
                      <p>{t("sample.next3","Brow shaping")}</p>
                    </Copy>
                  </div>
                </div>
              </div>
              <div className="sample-space-details-img">
                <img
                  src="/sample-space/sample-space-2.jpg"
                  alt="Signature Gel Manicure finish"
                />
              </div>
              <Copy delay={0.2}>
                <h3>
                  We’re here to make your routine feel special—calm service,
                  careful technique, and results that look and feel refined.
                </h3>
              </Copy>
            </div>
          </div>
        </section>
        <CTAWindow
          img="/sample-space/next-project.jpg"
          header={t("sample.cta.header", "Book now")}
          callout={t("sample.cta.callout", "Reserve your appointment")}
          description={t(
            "sample.cta.description",
            "Enjoy a personalized experience with expert nail care and restorative treatments—crafted for calm, clarity, and glow."
          )}
        />
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;
