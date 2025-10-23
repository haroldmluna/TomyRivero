"use client";
import "../../index.css";
import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";
import { useI18n } from "@/context/I18nContext";
import JoinForm from "@/components/JoinForm/JoinForm";

export default function Page() {
  const { t } = useI18n();
  return (
    <>
      <Nav />
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-col">
            <Copy delay={0.1}><h2>{t("join.titleLab","Join our team — Beauty Lab")}</h2></Copy>
            <JoinForm location="Beauty Lab" />
          </div>
        </div>
      </section>
      <ConditionalFooter />
    </>
  );
}
