"use client";

import { useEffect, useRef } from "react";

export function ScrollProgressRail() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const canUseDesktopMotion = window.matchMedia(
      "(pointer: fine) and (min-width: 1024px)"
    ).matches;

    if (!line || !canUseDesktopMotion) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, scrollTriggerModule]) => {
        if (cancelled) return;

        const gsap = gsapModule.gsap;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        const tween = gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              start: 0,
              end: "max",
              scrub: 0.45,
            },
          }
        );

        cleanup = () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      }
    );

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed right-5 top-1/2 z-30 hidden h-[34vh] w-px -translate-y-1/2 bg-white/[0.06] lg:block"
      aria-hidden="true"
    >
      <div
        ref={lineRef}
        className="h-full w-full origin-top bg-gradient-to-b from-accent via-violet to-transparent"
        style={{ transform: "scaleY(0)" }}
      />
    </div>
  );
}
