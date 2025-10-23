"use client";
import "./EventsGrid.css";
import Copy from "@/components/Copy/Copy";

const RESERVE_URL = "https://booking.mangomint.com/tomyriverobeautylab";

export default function EventsGrid() {
  return (
    <section className="events-grid">
      <div className="panel img">
        <img src="/studio/about-hero.png" alt="Studio space" />
      </div>
      <div className="panel content-dark">
        <div className="inner">
          <Copy delay={0.1}><h2>Events</h2></Copy>
          <div className="rule" />
          <Copy delay={0.15}>
            <p>
              From birthdays and bridal showers to wellness gatherings and private experiences, we offer a
              tailored space designed for memorable moments. Our expert team will help bring your vision to life,
              with customizable services, a serene atmosphere, and the option to reserve the full space just for
              your group.
            </p>
          </Copy>
          <div style={{ marginTop: "1rem" }}>
            <a className="cta" href={RESERVE_URL} target="_blank" rel="noreferrer">
              Reserve now
            </a>
          </div>
        </div>
      </div>
      <div className="panel content-light">
        <div className="inner">
          <Copy delay={0.1}><h2>Group bookings</h2></Copy>
          <div className="rule" />
          <Copy delay={0.15}>
            <p>
              Whether it’s a friends’ day out, a self‑care session with coworkers, or a bonding moment with your
              bridal party, our group services are designed to deliver a relaxing and personalized experience.
              Choose from manicures, pedicures, facials, and more — all in a cozy, welcoming environment.
            </p>
          </Copy>
          <div style={{ marginTop: "1rem" }}>
            <a className="cta" href={RESERVE_URL} target="_blank" rel="noreferrer">
              Reserve now
            </a>
          </div>
        </div>
      </div>
      <div className="panel img">
        <img src="/spotlight/spotlight-img-8.jpg" alt="Service in progress" />
      </div>
    </section>
  );
}
