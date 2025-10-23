"use client";
import "./ParallaxBanner.css";
import { useEffect, useRef } from "react";
import layersJson from "@/assets/image/location-layers.json";

import bg from "@/assets/image/Location/Background.png";
import layer1 from "@/assets/image/Location/Layer 1.png";
import layer2 from "@/assets/image/Location/Layer 2.png";
import layer3 from "@/assets/image/Location/Layer 3.png";
import layer4 from "@/assets/image/Location/Layer 4.png";
import layer5 from "@/assets/image/Location/Layer 5.png";

const imageMap = {
  "Background.png": bg,
  "Layer 1.png": layer1,
  "Layer 2.png": layer2,
  "Layer 3.png": layer3,
  "Layer 4.png": layer4,
  "Layer 5.png": layer5,
};

export default function ParallaxBanner({ className = "", style = {}, mouseFactor = 0.03, scrollFactor = 0.2 }) {
  const containerRef = useRef(null);
  const layersRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const layers = layersJson.layers.map((l, i) => ({
      el: layersRef.current[i],
      depth: typeof l.depth === "number" ? l.depth : i / Math.max(1, layersJson.layers.length - 1),
    }));

    let mouseX = 0;
    let mouseY = 0;
    let rAF = null;

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5);
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5);
      requestTick();
    };

    const onScroll = () => requestTick();

    const tick = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      layers.forEach((layer) => {
        if (!layer.el) return;
        const d = layer.depth;
        const translateX = -mouseX * 100 * d * mouseFactor;
        const translateY = -mouseY * 60 * d * mouseFactor - scrollY * d * scrollFactor * 0.001;
        layer.el.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
      });
      rAF = null;
    };

    const requestTick = () => {
      if (!rAF) rAF = requestAnimationFrame(tick);
    };

    container.addEventListener("pointermove", onPointerMove);
    window.addEventListener("scroll", onScroll, { passive: true });

    // initial position
    requestTick();

    return () => {
      container.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      if (rAF) cancelAnimationFrame(rAF);
    };
  }, [mouseFactor, scrollFactor]);

  return (
    <div ref={containerRef} className={`parallax-banner ${className}`} style={style}>
      {layersJson.layers.map((layer, i) => {
        const src = imageMap[layer.file];
        return (
          <div
            key={layer.file}
            ref={(el) => (layersRef.current[i] = el)}
            className={`parallax-layer layer-${i}`}
            aria-hidden="true"
            style={{ backgroundImage: `url(${src})` }}
          />
        );
      })}
    </div>
  );
}
