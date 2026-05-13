"use client";

import { useEffect, useRef } from "react";

interface MouseParallaxOptions {
  strength?: number;
  ease?: number;
}

interface ParallaxLayer {
  el: HTMLElement;
  depth: number;
}

/**
 * Tracks mouse position and applies smooth parallax to elements
 * with [data-parallax-depth] attribute.
 *
 * Usage:
 *   const containerRef = useMouseParallax({ strength: 40, ease: 0.08 });
 *   <div ref={containerRef}>
 *     <div data-parallax-depth="1">fast</div>
 *     <div data-parallax-depth="3">slow</div>
 *   </div>
 */
export function useMouseParallax<T extends HTMLElement = HTMLDivElement>(
  options: MouseParallaxOptions = {}
) {
  const { strength = 40, ease = 0.08 } = options;
  const containerRef = useRef<T>(null);
  const rafRef = useRef<number>(0);

  const mouseRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const layersRef = useRef<ParallaxLayer[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Collect parallax layers
    const collect = () => {
      const els = container.querySelectorAll<HTMLElement>("[data-parallax-depth]");
      layersRef.current = Array.from(els).map((el) => ({
        el,
        depth: parseFloat(el.dataset.parallaxDepth ?? "1"),
      }));
    };
    collect();

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };

    const tick = () => {
      const cur = currentRef.current;
      const target = mouseRef.current;

      cur.x += (target.x - cur.x) * ease;
      cur.y += (target.y - cur.y) * ease;

      layersRef.current.forEach(({ el, depth }) => {
        const tx = cur.x * strength * (1 / depth);
        const ty = cur.y * strength * (1 / depth);
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: 0, y: 0 };
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    container.addEventListener("mouseleave", onMouseLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [strength, ease]);

  return containerRef;
}
