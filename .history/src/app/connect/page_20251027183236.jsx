"use client";
import "./contact.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import { useI18n } from "@/context/I18nContext";
import Copy from "@/components/Copy/Copy";
import Map from "@/components/Map/Map";
import { useState } from "react";

const Page = () => {
  const { t } = useI18n();

  return (
    <>
      <Nav />
      <div className="page contact">
        <section className="contact-hero">
          <div className="container">
            <div className="contact-col">
              <div className="contact-hero-header">
                <Copy delay={0.85}>
                  <h1>{t("connect.header", "Book your appointment")}</h1>
                </Copy>
              </div>
            </div>

            <div className="contact-col">
              <div className="contact-info">
                <div className="contact-info-block">
                  <Copy delay={0.85}>
                    <p>{t("connect.appointments", "Appointments")}</p>
                    <p>
                      <a
                        href="https://booking.mangomint.com/tomyriverobeautylab"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t("connect.bookOnline", "Book online — Mangomint")}
                      </a>
                    </p>
                  </Copy>
                </div>

                <div className="contact-info-block">
                  <Copy delay={1}>
                    <p>{t("connect.lab", "Beauty Lab")}</p>
                    <p>Inwood, NYC</p>
                    <p>{t("connect.cafeOpening", "Beauty Café — Fall ’25")}</p>
                  </Copy>
                </div>

                <div className="contact-info-block">
                  <Copy delay={1.15}>
                    <p>{t("connect.questions", "Questions")}</p>
                    <p>hello@tomyriverobeauty.com</p>
                    <p>IG: @tomyriverobeauty</p>
                  </Copy>
                </div>

                <div className="contact-info-block">
                  <Copy delay={1.3}>
                    <p>{t("connect.hours", "Hours")}</p>
                    <p>{t("connect.schedule", "Tue – Sun")}</p>
                    <p>{t("connect.byAppointment", "By appointment")}</p>
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

        {/* Map + Contact form */}
        <section className="contact-map-form">
          <div className="container" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "2rem" }}>
            <div>
              <Map />
            </div>

            <ContactForm />
          </div>
        </section>

        {/* Info cards */}
        <section className="contact-cards">
          <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            <div className="contact-card">
              <div className="contact-card-inner">
                <p className="xs mono">OPENING HOURS</p>
                <h3 className="md">Mon – Sat 10 AM – 7 PM<br/>Sun 10 AM – 6 PM</h3>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-card-inner">
                <p className="xs mono">CALL US</p>
                <h3 className="md">(212) 401‑0061</h3>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-card-inner">
                <p className="xs mono">EMAIL US</p>
                <h3 className="md">hello@tomyriverobeauty.com</h3>
              </div>
            </div>
          </div>
        </section>
      </div>

      <ConditionalFooter />
    </>
  );
};

export default Page;

function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = {
      name: `${form.firstName.value} ${form.lastName.value}`.trim(),
      email: form.email.value,
      phone: form.phone.value,
      message: form.message.value,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Send failed");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  };

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="form-row">
        <label>
          <span>First Name</span>
          <input type="text" name="firstName" placeholder="Your first name" required />
        </label>
        <label>
          <span>Last Name</span>
          <input type="text" name="lastName" placeholder="Your last name" />
        </label>
      </div>
      <div className="form-row">
        <label>
          <span>Email</span>
          <input type="email" name="email" placeholder="you@example.com" required />
        </label>
        <label>
          <span>Phone</span>
          <input type="tel" name="phone" placeholder="+1 (234) 567-9080" />
        </label>
      </div>
      <label>
        <span>Message</span>
        <textarea name="message" rows={6} placeholder="Your message here.." required></textarea>
      </label>
      <div className="form-actions">
        <button className="btn-primary" type="submit" disabled={status==="loading"}>
          {status === "loading" ? "Sending…" : "SEND"}
        </button>
        {status === "success" && <span className="form-success">Sent. We’ll be in touch.</span>}
        {status === "error" && <span className="form-error">{error}</span>}
      </div>
    </form>
  );
}