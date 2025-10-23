"use client";
import "./cafe.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";

const page = () => {
  return (
    <>
      <Nav />
      <div className="page cafe">
        <section className="cafe-hero">
          <div className="container">
            <div className="cafe-hero-col">
              <Copy delay={0.85}><p>Tomy Rivero Beauty</p></Copy>
              <Copy delay={0.9}><h1>Beauty Café</h1></Copy>
              <Copy delay={1}>
                <h3>
                  Opening in Inwood, Fall ’25 — a place for espresso, matcha, and modern beauty culture. 
                  A warm, minimal space to pause, discover color, and connect.
                </h3>
              </Copy>
              <div className="cafe-hero-cta">
                <AnimatedButton label="Join the waitlist" route="/connect" animate={false} />
              </div>
            </div>
            <div className="cafe-hero-col">
              <div className="cafe-hero-img">
                <img src="/gallery-callout/gallery-callout-2.jpg" alt="Tomy Rivero Beauty Café" />
              </div>
            </div>
          </div>
        </section>

        <section className="cafe-expect">
          <div className="container">
            <div className="expect-grid">
              <div className="expect-card">
                <Copy delay={0.1}><h3>Signature Drinks</h3></Copy>
                <Copy delay={0.15}><p className="md">Seasonal espresso, matcha, and herbal blends—crafted with the same care we bring to every service.</p></Copy>
              </div>
              <div className="expect-card">
                <Copy delay={0.2}><h3>Color & Retail</h3></Copy>
                <Copy delay={0.25}><p className="md">A curated beauty bar and 1,000+ color library. Try, learn, and find your next favorite finish.</p></Copy>
              </div>
              <div className="expect-card">
                <Copy delay={0.3}><h3>Events & Workshops</h3></Copy>
                <Copy delay={0.35}><p className="md">Talks, demos, and small gatherings—beauty, wellness, and culture in conversation.</p></Copy>
              </div>
            </div>
          </div>
        </section>

        <section className="cafe-gallery">
          <div className="container">
            <div className="cafe-gallery-row">
              <div className="cafe-img"><img src="/gallery-callout/gallery-callout-1.jpg" alt="Signature drinks" /></div>
              <div className="cafe-img"><img src="/gallery-callout/gallery-callout-3.jpg" alt="Beauty bar" /></div>
            </div>
            <div className="cafe-gallery-row">
              <div className="cafe-img"><img src="/gallery-callout/gallery-callout-4.jpg" alt="Gatherings" /></div>
              <div className="cafe-img"><img src="/spotlight/spotlight-img-8.jpg" alt="Warm textures" /></div>
            </div>
          </div>
        </section>

        <CTAWindow
          img="/studio/about-cta-window.jpg"
          header="Coming Soon"
          callout="Tomy Rivero Beauty Café"
          description="A new space for beauty and everyday ritual. Be the first to know about opening events and specials."
        />
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;
