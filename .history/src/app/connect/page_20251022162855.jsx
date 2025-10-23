"use client";
import "./contact.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";

const page = () => {
  return (
    <>
      <Nav />
      <div className="page contact">
        <section className="contact-hero">
          <div className="container">
            <div className="contact-col">
              <div className="contact-hero-header">
                <Copy delay={0.85}>
                  <h1>Book your appointment</h1>
                </Copy>
              </div>
              <div className="contact-copy-year">
                <Copy delay={0.1}>
                  <h1>&copy;25</h1>
                </Copy>
              </div>
            </div>
            <div className="contact-col">
              <div className="contact-info">
                <div className="contact-info-block">
                  <Copy delay={0.85}>
                    <p>Appointments</p>
                    <p>
                      <a href="https://booking.mangomint.com/tomyriverobeautylab" target="_blank" rel="noreferrer">
                        Book online — Mangomint
                      </a>
                    </p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1}>
                    <p>Beauty Lab</p>
                    <p>Inwood, NYC</p>
                    <p>Beauty Café — Fall ’25</p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1.15}>
                    <p>Questions</p>
                    <p>hello@tomyriverobeauty.com</p>
                    <p>IG: @tomyriverobeauty</p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1.3}>
                    <p>Hours</p>
                    <p>Tue – Sun</p>
                    <p>By appointment</p>
                  </Copy>
                </div>
              </div>
              <div className="contact-img">
                <img
                  src="/contact/contact-img.jpg"
                  alt="Tomy Rivero Beauty Lab"
                />
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
