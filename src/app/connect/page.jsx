"use client";
import "./contact.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import { useI18n } from "@/context/I18nContext";
import Copy from "@/components/Copy/Copy";

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
      </div>

      <ConditionalFooter />
    </>
  );
};

export default Page;