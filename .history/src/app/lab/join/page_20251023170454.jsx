"use client";
import "../../index.css";
import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";
import JoinForm from "@/components/JoinForm/JoinForm";

export default function Page() {
  return (
    <>
      <Nav />
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-col">
            <Copy delay={0.1}><h2>Join our team — Beauty Lab</h2></Copy>
            <JoinForm location="Beauty Lab" />
          </div>
        </div>
      </section>
      <ConditionalFooter />
    </>
  );
}
