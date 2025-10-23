"use client";
import "./contact.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import { useI18n } from "@/context/I18nContext";
import { track } from "@/lib/analytics";
import { useState } from "react";
import Copy from "@/components/Copy/Copy";

const page = () => {
  return (
    <>
      const { t } = useI18n();
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
                    <p>{t("connect.appointments", "Appointments")}</p>
                    <p>
                      <a href="https://booking.mangomint.com/tomyriverobeautylab" target="_blank" rel="noreferrer">
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
        <section className="contact-form-section">
          <div className="container">
            <div className="contact-col">
              <Copy delay={0.1}>
                <h2>Send us a message</h2>
              </Copy>
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState({ sending: false, ok: null, error: null });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, ok: null, error: null });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus({ sending: false, ok: true, error: null });
        setForm({ name: "", email: "", phone: "", message: "" });
        track("contact_submit", { method: "form", status: "success" });
      } else {
        track("contact_submit", { method: "form", status: "error" });
        throw new Error(json.error || "Failed to send");
      }
    } catch (err) {
      setStatus({ sending: false, ok: false, error: err.message });
    }
  };

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="form-row">
        <label>
          Name*
          <input name="name" value={form.name} onChange={onChange} required />
        </label>
        <label>
          Email*
          <input type="email" name="email" value={form.email} onChange={onChange} required />
        </label>
      </div>
      <div className="form-row">
        <label>
          Phone
          <input name="phone" value={form.phone} onChange={onChange} />
        </label>
      </div>
      <div className="form-row">
        <label>
          Message*
          <textarea name="message" rows={6} value={form.message} onChange={onChange} required />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit" disabled={status.sending} className="btn-primary">
          {status.sending ? "Sending…" : "Send message"}
        </button>
        {status.ok && <p className="form-success">Thanks! We'll get back to you shortly.</p>}
        {status.ok === false && <p className="form-error">{status.error || "Something went wrong"}</p>}
      </div>
    </form>
  );
}
