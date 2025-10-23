"use client";
import "./sample-space.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";

const page = () => {
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
                <h1>Signature Gel Manicure</h1>
              </Copy>
            </div>
            <div className="sample-space-content">
              <div className="sample-space-col">
                <Copy delay={1.05} animateOnScroll={false}>
                  <p>Inwood, NYC</p>
                </Copy>
              </div>
              <div className="sample-space-col">
                <div className="sample-space-content-wrapper">
                  <Copy delay={1.1} animateOnScroll={false}>
                    <p>Beauty Lab</p>
                  </Copy>
                </div>
                <div className="sample-space-content-wrapper">
                  <Copy delay={1.15} animateOnScroll={false}>
                    <h3>
                      A meticulous prep, long‑wear finish, and over 1,000
                      curated shades to choose from. Clean, refined, and made
                      to last.
                    </h3>
                    <h3>
                      A quiet ritual that prioritizes nail health and polish
                      precision so your everyday feels a little more elevated.
                    </h3>
                  </Copy>
                </div>
                <div className="sample-space-content-wrapper sample-space-meta">
                  <div className="sample-space-hero-row">
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.2}>
                        <p>Duration</p>
                        <p>~60 min</p>
                      </Copy>
                    </div>
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.2}>
                        <p>Includes</p>
                        <p>Cuticle care, shaping</p>
                        <p>Gel polish application</p>
                      </Copy>
                    </div>
                  </div>
                </div>
                <div className="sample-space-content-wrapper sample-space-meta">
                  <div className="sample-space-hero-row">
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.35}>
                        <p>Finish</p>
                        <p>Glossy or soft matte</p>
                        <p>Optional nail art</p>
                      </Copy>
                    </div>
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.35}>
                        <p>Care</p>
                        <p>Daily cuticle oil</p>
                        <p>Gentle removal</p>
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
                <p>About the service</p>
              </Copy>
            </div>
            <div className="sample-space-col">
              <Copy delay={0.1}>
                <h3>
                  Clean techniques and careful shape work are the foundation of
                  this manicure. We prioritize nail health while achieving a
                  smooth, even finish with a longer wear time.
                </h3>

                <h3>
                  Choose a timeless neutral or a statement shade—our curated
                  palette makes it easy to find a look that fits your style and
                  mood.
                </h3>
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
                <p>Good to know</p>
              </Copy>
            </div>
            <div className="sample-space-col">
              <div className="sample-space-content-wrapper sample-space-meta">
                <div className="sample-space-hero-row">
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.1}>
                      <p>Atmosphere</p>
                      <p>Calm</p>
                      <p>Clean techniques</p>
                      <p>Gentle care</p>
                    </Copy>
                  </div>
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.1}>
                      <p>Finish</p>
                      <p>Long‑wear shine</p>
                      <p>Soft matte (optional)</p>
                      <p>Nail art (optional)</p>
                    </Copy>
                  </div>
                </div>
              </div>
              <div className="sample-space-content-wrapper sample-space-meta">
                <div className="sample-space-hero-row">
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.2}>
                      <p>Care</p>
                      <p>Cuticle oil daily</p>
                      <p>File as needed</p>
                      <p>Gentle removal</p>
                    </Copy>
                  </div>
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.2}>
                      <p>Next</p>
                      <p>Hydrating facial</p>
                      <p>Signature pedicure</p>
                      <p>Brow shaping</p>
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
          header="Book now"
          callout="Reserve your appointment"
          description="Enjoy a personalized experience with expert nail care and restorative treatments—crafted for calm, clarity, and glow."
        />
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;
