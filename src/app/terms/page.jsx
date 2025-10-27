"use client";
import "../index.css";
import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";

export default function Page() {
  return (
    <>
      <Nav />
      <section className="policy-page" style={{ color: "var(--base-100)" }}>
        <div className="container">
          <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Copy delay={0.05}><h1>Terms of Service</h1></Copy>
            <Copy delay={0.1}><p className="md" style={{ color: "var(--base-300)" }}>Last updated: October 27, 2025</p></Copy>
            <Copy delay={0.15}><p>By using this website, you agree to these terms. Please read them carefully.</p></Copy>
            <Copy delay={0.2}><h3>Use of the site</h3></Copy>
            <Copy delay={0.25}><p>Content is provided for information and booking purposes. Don’t misuse the site or attempt to disrupt its operation.</p></Copy>
            <Copy delay={0.3}><h3>Intellectual property</h3></Copy>
            <Copy delay={0.35}><p>All trademarks, graphics, and content are owned by Tomy Rivero Beauty or its licensors and may not be copied without permission.</p></Copy>
            <Copy delay={0.4}><h3>Bookings and services</h3></Copy>
            <Copy delay={0.45}><p>Appointments are subject to our booking partner’s policies. Any confirmations, payments, or cancellations are handled there.</p></Copy>
            <Copy delay={0.5}><h3>Disclaimer</h3></Copy>
            <Copy delay={0.55}><p>The site is provided “as-is.” We make no warranties and are not liable for indirect or incidental damages.</p></Copy>
            <Copy delay={0.6}><h3>Contact</h3></Copy>
            <Copy delay={0.65}><p>Questions? Email us at info@tomyriverobeauty.com.</p></Copy>
          </div>
        </div>
      </section>
      <ConditionalFooter />
    </>
  );
}
