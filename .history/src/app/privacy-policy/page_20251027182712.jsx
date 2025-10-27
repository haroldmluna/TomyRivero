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
            <Copy delay={0.05}><h1>Privacy Policy</h1></Copy>
            <Copy delay={0.1}><p className="md" style={{ color: "var(--base-300)" }}>Last updated: October 27, 2025</p></Copy>
            <Copy delay={0.15}><p>We respect your privacy. This policy explains what data we collect, how we use it, and your choices.</p></Copy>
            <Copy delay={0.2}><h3>Information we collect</h3></Copy>
            <Copy delay={0.25}><p>Contact details you provide (such as name and email), messages sent via forms, and basic analytics about site usage.</p></Copy>
            <Copy delay={0.3}><h3>How we use information</h3></Copy>
            <Copy delay={0.35}><p>To respond to inquiries, improve our services and website experience, and communicate updates you opt into.</p></Copy>
            <Copy delay={0.4}><h3>Sharing</h3></Copy>
            <Copy delay={0.45}><p>We do not sell personal information. We may share limited data with service providers to operate the site (e.g., analytics).</p></Copy>
            <Copy delay={0.5}><h3>Your choices</h3></Copy>
            <Copy delay={0.55}><p>You may request access, correction, or deletion of your information by contacting us at info@tomyriverobeauty.com.</p></Copy>
            <Copy delay={0.6}><h3>Contact</h3></Copy>
            <Copy delay={0.65}><p>Questions? Email us at info@tomyriverobeauty.com.</p></Copy>
          </div>
        </div>
      </section>
      <ConditionalFooter />
    </>
  );
}
