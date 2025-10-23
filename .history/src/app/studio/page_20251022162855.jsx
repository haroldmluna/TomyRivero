"use client";
import "./studio.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import HowWeWork from "@/components/HowWeWork/HowWeWork";
import Spotlight from "@/components/Spotlight/Spotlight";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";

const page = () => {
  return (
    <>
      <Nav />
      <div className="page studio">
        <section className="studio-hero">
          <div className="container">
            <div className="studio-hero-col">
              <Copy delay={0.85}>
                <p>
                  We see beauty as self‑care. From precise nail care to
                  rejuvenating skin treatments, every service is delivered with
                  expert technique and calm intention.
                </p>
              </Copy>
            </div>
            <div className="studio-hero-col">
              <Copy delay={0.85}>
                <h2>
                  Our beauty lab is designed for modern rituals—clean, refined,
                  and welcoming. Thoughtful services that help you relax, renew,
                  and leave with that unmistakable glow.
                </h2>
              </Copy>
              <div className="studio-hero-hero-img">
                <img src="/studio/about-hero.png" alt="" />
              </div>
            </div>
          </div>
        </section>
        <section className="more-facts">
          <div className="container">
            <div className="more-facts-items">
              <div className="fact">
                <Copy delay={0.1}>
                  <p>Colors available</p>
                  <h2>1,000+</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.2}>
                  <p>Client satisfaction</p>
                  <h2>98%</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.3}>
                  <p>Services offered</p>
                  <h2>25+</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.4}>
                  <p>Appointments completed</p>
                  <h2>5k+</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.5}>
                  <p>Beauty Café</p>
                  <h2>Fall ’25</h2>
                </Copy>
              </div>
            </div>
          </div>
        </section>
        <section className="how-we-work-container">
          <div className="container">
            <HowWeWork />
          </div>
        </section>
        <CTAWindow
          img="/studio/about-cta-window.jpg"
          header="Reserve your visit"
          callout="Experience Tomy Rivero Beauty Lab"
          description="Book online and let our team take care of you with personalized beauty services—manicure, skincare, and spa rituals designed for calm and clarity."
        />
        <Spotlight />
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;
