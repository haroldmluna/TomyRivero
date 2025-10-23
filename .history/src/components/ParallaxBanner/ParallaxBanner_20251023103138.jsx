"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Background from "@/assets/image/Location/Background.png";
import Layer1 from "@/assets/image/Location/Layer 1.png";
import Layer2 from "@/assets/image/Location/Layer 2.png";
import Layer3 from "@/assets/image/Location/Layer 3.png";
import Layer4 from "@/assets/image/Location/Layer 4.png";
import Layer5 from "@/assets/image/Location/Layer 5.png";

import "./ParallaxBanner.css";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxBanner() {
	const rootRef = useRef(null);

	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		const hero = document.querySelector(".hero");
		const layers = Array.from(root.querySelectorAll(".parallax-layer"));

		// Animate each layer at different speeds
		layers.forEach((layerEl) => {
			const depth = parseFloat(layerEl.getAttribute("data-depth") || "1");
			// Smaller depth => slower movement
			const range = 20 * depth; // total yPercent range
			const start = -range / 2;
			const end = range / 2;

			gsap.fromTo(
				layerEl,
				{ yPercent: start },
				{
					yPercent: end,
					ease: "none",
					scrollTrigger: {
						trigger: hero || root,
						start: "top top",
						end: "bottom top",
						scrub: true,
					},
				}
			);
		});

		return () => {
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	}, []);

	const layers = [
		{ src: Background, alt: "Background", depth: 0.4, z: 0 },
		{ src: Layer1, alt: "Layer 1", depth: 0.6, z: 1 },
		{ src: Layer2, alt: "Layer 2", depth: 0.8, z: 2 },
		{ src: Layer3, alt: "Layer 3", depth: 1.0, z: 3 },
		{ src: Layer4, alt: "Layer 4", depth: 1.2, z: 4 },
		{ src: Layer5, alt: "Layer 5", depth: 1.4, z: 5 },
	];

	return (
		<div className="parallax-banner" ref={rootRef} aria-hidden>
			{layers.map((l) => (
				<div
					className="parallax-layer"
					style={{ zIndex: l.z }}
					data-depth={l.depth}
					key={l.alt}
				>
					<Image
						src={l.src}
						alt={l.alt}
						fill
						priority={l.z <= 1}
						sizes="100vw"
						style={{ objectFit: "cover", pointerEvents: "none" }}
					/>
				</div>
			))}
		</div>
	);
}

