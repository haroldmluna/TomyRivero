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
            <Copy delay={0.05}><h1>Cookies Policy</h1></Copy>
            <Copy delay={0.1}><p className="md" style={{ color: "var(--base-300)" }}>Last updated: October 27, 2025</p></Copy>
            <Copy delay={0.15}><p>We use cookies and similar technologies to improve the site, analyze traffic, and remember preferences.</p></Copy>
            <Copy delay={0.2}><h3>What are cookies?</h3></Copy>
            <Copy delay={0.25}><p>Small text files stored on your device that help the site function and provide analytics.</p></Copy>
            <Copy delay={0.3}><h3>How we use cookies</h3></Copy>
            <Copy delay={0.35}><p>Essential cookies for core functionality and analytics cookies to understand usage trends.</p></Copy>
            <Copy delay={0.4}><h3>Your choices</h3></Copy>
            <Copy delay={0.45}><p>You can control cookies in your browser settings. Blocking some cookies may impact the experience.</p></Copy>
            <Copy delay={0.5}><h3>Contact</h3></Copy>
            <Copy delay={0.55}><p>Questions? Email us at info@tomyriverobeauty.com.</p></Copy>
          </div>
        </div>
      </section>
      <ConditionalFooter />
    </>
  );
}
