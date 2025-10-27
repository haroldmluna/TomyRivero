'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const MouseRevealMask = ({ children, backgroundImage, id }) => {
  const containerRef = useRef(null);
  const circlesRef = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const delayedMouse = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;
    if (containerRef.current) {
      const { left, top } = containerRef.current.getBoundingClientRect();
      mouse.current = {
        x: clientX - left,
        y: clientY - top,
      };
    }
  };

  const lerp = (x, y, a) => x * (1 - a) + y * a;

  const animate = () => {
    const { x, y } = mouse.current;
    const { x: delayedX, y: delayedY } = delayedMouse.current;

    const dx = x - delayedX;
    const dy = y - delayedY;
    const speed = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.01, 0.8);
    const scale = 1 + speed;

    delayedMouse.current = {
      x: lerp(delayedX, x, 0.075),
      y: lerp(delayedY, y, 0.075),
    };

    if (circlesRef.current.length > 0) {
        const mainCircle = circlesRef.current[0];
        const trailCircles = circlesRef.current.slice(1);

        gsap.to(mainCircle, { attr: { cx: delayedMouse.current.x, cy: delayedMouse.current.y }, scale: scale, duration: 0.3 });

        trailCircles.forEach((circle, i) => {
            const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90 * i;
            const xOffset = Math.cos(angle * (Math.PI / 180)) * speed * 80;
            const yOffset = Math.sin(angle * (Math.PI / 180)) * speed * 80;

            gsap.to(circle, {
                attr: {
                    cx: delayedMouse.current.x + xOffset,
                    cy: delayedMouse.current.y + yOffset,
                },
                scale: scale * 0.5,
                duration: 0.5,
                ease: 'power3.out',
            });
        });
    }

    rafId.current = requestAnimationFrame(animate);
  };

  useGSAP(() => {
    gsap.set(circlesRef.current, { attr: { cx: -150, cy: -150 }});
    if (containerRef.current) {
        containerRef.current.addEventListener('mousemove', manageMouseMove);
        animate();
    }
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', manageMouseMove);
      }
    };
  }, { scope: containerRef });

  return (
    <div className="mask-container" ref={containerRef}>
      <div
        className="mask-reveal-image"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          mask: `url(#${id})`,
          WebkitMask: `url(#${id})`,
        }}
      />

      <svg className="mask-svg">
        <defs>
          <filter id={`${id}-filter`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="25" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
        <mask id={id}>
          <g style={{ filter: `url(#${id}-filter)` }}>
            {[...Array(3)].map((_, i) => (
              <circle
                key={i}
                ref={(el) => (circlesRef.current[i] = el)}
                r={i === 0 ? 80 : 40}
                fill="white"
                style={{transformOrigin: 'center', transformBox: 'fill-box'}}
              />
            ))}
          </g>
        </mask>
      </svg>
      
      <div className="mask-content-unmasked">
        {children}
      </div>
    </div>
  );
};

export default MouseRevealMask;
