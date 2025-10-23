"use client";
import "./EventsGrid.css";
import Copy from "@/components/Copy/Copy";
import { useI18n } from "@/context/I18nContext";

const RESERVE_URL = "https://booking.mangomint.com/tomyriverobeautylab";

export default function EventsGrid() {
  const { t } = useI18n();
  return (
    <section className="events-grid">
      <div className="panel img">
        <img src="/studio/about-hero.png" alt="Studio space" />
      </div>
      <div className="panel content-dark">
        <div className="inner">
          <Copy delay={0.1}><h2>{t("events.title","Events")}</h2></Copy>
          <div className="rule" />
          <Copy delay={0.15}><p>{t("events.desc")}</p></Copy>
          <div style={{ marginTop: "1rem" }}>
            <a className="cta" href={RESERVE_URL} target="_blank" rel="noreferrer">{t("events.reserve","Reserve now")}</a>
          </div>
        </div>
      </div>
      <div className="panel content-light">
        <div className="inner">
          <Copy delay={0.1}><h2>{t("groups.title","Group bookings")}</h2></Copy>
          <div className="rule" />
          <Copy delay={0.15}><p>{t("groups.desc")}</p></Copy>
          <div style={{ marginTop: "1rem" }}>
            <a className="cta" href={RESERVE_URL} target="_blank" rel="noreferrer">{t("events.reserve","Reserve now")}</a>
          </div>
        </div>
      </div>
      <div className="panel img">
        <img src="/spotlight/spotlight-img-8.jpg" alt="Service in progress" />
      </div>
    </section>
  );
}
