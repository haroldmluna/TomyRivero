"use client";
import React, { useEffect, useRef } from "react";
import "./Map.css";

// Lazy-load leaflet only on client
const loadLeaflet = async () => {
  const L = await import("leaflet");
  // Fix default icon paths
  // eslint-disable-next-line @next/next/no-img-element
  const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
  const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
  const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";
  // @ts-ignore
  L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });
  return L;
};

export default function Map({ className }) {
  const mapRef = useRef(null);

  useEffect(() => {
    let map;
    let L;
    let cleanup = () => {};

    (async () => {
      L = await loadLeaflet();
      if (!mapRef.current) return;
      map = L.map(mapRef.current, { scrollWheelZoom: false });

      const center = [40.856, -73.93]; // between both locations
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      map.setView(center, 13);

      const locations = [
        { pos: [40.8683, -73.9197], label: "Tomy Rivero Beauty & Café" },
        { pos: [40.8443, -73.9396], label: "Tomy Rivero Beauty Lab" },
      ];

      locations.forEach((loc) => {
        L.marker(loc.pos).addTo(map).bindPopup(`<strong>${loc.label}</strong>`);
      });

      cleanup = () => {
        if (map) map.remove();
      };
    })();

    return () => cleanup();
  }, []);

  return <div className={`map ${className || ""}`} ref={mapRef} aria-label="Map" />;
}
