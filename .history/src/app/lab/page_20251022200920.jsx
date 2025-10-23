"use client";
import "./lab.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";

const page = () => {
  return (
    <>
      <Nav />
      <div className="page lab">
        <section className="lab-hero">
          <div className="container">
            <div className="lab-hero-col">
              <div className="lab-hero-img">
                <img src="/studio/about-hero.png" alt="Tomy Rivero Beauty Lab" />
              </div>
            </div>
            <div className="lab-hero-col">
              <Copy delay={0.85}>
                <p>Tomy Rivero Beauty</p>
              </Copy>
              <Copy delay={0.9}>
                <h1>Beauty Lab</h1>
              </Copy>
              <Copy delay={1}>
                <h3>
                  A calm, refined space for modern self‑care—expert nail care, rejuvenating skin treatments,
                  and spa rituals designed for clarity, comfort, and glow.
                </h3>
              </Copy>
              <div className="lab-hero-cta">
                <AnimatedButton label="Book now" route="/connect" animate={false} />
              </div>
            </div>
          </div>
        </section>

        <section className="lab-services">
          <div className="container">
            <div className="lab-services-grid">
              <div className="lab-service-card">
                <Copy delay={0.1}>
                  <h3>Nail Care</h3>
                </Copy>
                <Copy delay={0.15}>
                  <p className="md">
                    Meticulous prep, shaping, and long‑wear finishes. Choose from 1,000+ curated shades—
                    from milky sheers to classic reds and modern chromes.
                  </p>
                </Copy>
              </div>
              <div className="lab-service-card">
                <Copy delay={0.2}>
                  <h3>Skincare</h3>
                </Copy>
                <Copy delay={0.25}>
                  <p className="md">
                    Hydrating facials and targeted treatments—gentle exfoliation, replenishing serums,
                    and restorative massage for a soft, lasting radiance.
                  </p>
                </Copy>
              </div>
              <div className="lab-service-card">
                <Copy delay={0.3}>
                  <h3>Spa Rituals</h3>
                </Copy>
                <Copy delay={0.35}>
                  <p className="md">
                    Quiet, restorative pedicures and body care—clean techniques and attentive pacing to help
                    you unwind and reset.
                  </p>
                </Copy>
              </div>
            </div>
          </div>
        </section>

        <section className="lab-highlights">
          <div className="container">
            <div className="highlight">
              <Copy delay={0.1}><h2>1,000+</h2></Copy>
              <Copy delay={0.15}><p>Curated colors to choose from</p></Copy>
            </div>
            <div className="highlight">
              <Copy delay={0.2}><h2>98%</h2></Copy>
              <Copy delay={0.25}><p>Five‑star client satisfaction</p></Copy>
            </div>
            <div className="highlight">
              <Copy delay={0.3}><h2>Clean</h2></Copy>
              <Copy delay={0.35}><p>Techniques with nail health first</p></Copy>
            </div>
          </div>
        </section>

        <CTAWindow
          img="/home/home-cta-window.jpg"
          header="Reserve your visit"
          callout="Experience Tomy Rivero Beauty Lab"
          description="Book online and let our team take care of you with personalized beauty services—crafted for calm, clarity, and glow."
        />

        <section className="lab-info">
          <div className="container">
            <div className="lab-info-grid">
              <div className="info-block">
                <Copy delay={0.1}><p>Location</p></Copy>
                <Copy delay={0.15}><h3>Inwood, NYC</h3></Copy>
                <Copy delay={0.2}><p className="md">Beauty Lab open for appointments</p></Copy>
              </div>
              <div className="info-block">
                <Copy delay={0.25}><p>Hours</p></Copy>
                <Copy delay={0.3}><h3>Tue – Sun</h3></Copy>
                <Copy delay={0.35}><p className="md">By appointment</p></Copy>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;
