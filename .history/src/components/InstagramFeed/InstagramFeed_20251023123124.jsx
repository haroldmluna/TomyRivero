"use client";
import "./InstagramFeed.css";
import { useEffect, useState } from "react";
import Copy from "@/components/Copy/Copy";

export default function InstagramFeed({ limit = 12 }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(`/api/instagram/oembed`, { cache: "no-store" });
        const json = await res.json();
        if (!cancelled) {
          if (res.ok && Array.isArray(json?.data)) {
            setItems(json.data.slice(0, limit));
          } else {
            setError(json?.error || "No se pudo cargar el feed.");
          }
        }
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [limit]);

  return (
    <section className="instagram-feed">
      <div className="container">
        <div className="header">
          <Copy delay={0.1}>
            <h3>En Instagram</h3>
          </Copy>
          <a href="https://www.instagram.com/tomyriverobeauty/" target="_blank" rel="noreferrer">
            Ver perfil →
          </a>
        </div>

        {loading && (
          <div className="grid" aria-busy="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <div className="item skeleton" key={i} />
            ))}
          </div>
        )}

        {!loading && error && (
          <p style={{ opacity: 0.8 }}>
            {error} {" "}
            <br />
            Configura INSTAGRAM_POST_URLS en el entorno con URLs de publicaciones públicas.
          </p>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="grid">
            {items.map((m) => (
              <div className="item" key={m.id}>
                <a href={m.permalink} target="_blank" rel="noreferrer" aria-label="Abrir en Instagram">
                  <img
                    src={m.media_url || m.thumbnail_url}
                    alt={m.caption || "Instagram"}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
