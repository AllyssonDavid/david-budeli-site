"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide on mobile/touch
    if ("ontouchstart" in window) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "none",
      });
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animateRing = () => {
      ringX = lerp(ringX, mouseX, 0.1);
      ringY = lerp(ringY, mouseY, 0.1);
      gsap.set(ring, { x: ringX, y: ringY });
      requestAnimationFrame(animateRing);
    };
    animateRing();

    const onMouseEnterInteractive = () => {
      dot.classList.add("hovering");
      ring.classList.add("hovering");
    };

    const onMouseLeaveInteractive = () => {
      dot.classList.remove("hovering");
      ring.classList.remove("hovering");
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });

    const interactiveEls = document.querySelectorAll(
      "a, button, [data-cursor-hover]"
    );

    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
