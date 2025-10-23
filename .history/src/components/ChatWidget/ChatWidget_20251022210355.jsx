"use client";
import { useEffect } from "react";

export default function ChatWidget() {
  useEffect(() => {
    const CRISP_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;
    if (!CRISP_ID) return;

    if (typeof window !== "undefined") {
      window.$crisp = window.$crisp || [];
      window.CRISP_WEBSITE_ID = CRISP_ID;
      (function () {
        const d = document;
        const s = d.createElement("script");
        s.src = "https://client.crisp.chat/l.js";
        s.async = 1;
        d.getElementsByTagName("head")[0].appendChild(s);
      })();
    }
  }, []);
  return null;
}
