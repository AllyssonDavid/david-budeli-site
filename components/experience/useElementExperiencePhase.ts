"use client";

import { RefObject, useEffect, useState } from "react";
import type { ExperiencePhase } from "./useExperiencePhase";

export function useElementExperiencePhase(ref: RefObject<HTMLElement>) {
  const [phase, setPhase] = useState<ExperiencePhase>("entry");

  useEffect(() => {
    const updatePhase = () => {
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const height = window.innerHeight || 1;
      const nextPhase =
        rect.top > height * 0.72
          ? "entry"
          : rect.bottom < height * 0.28
            ? "exit"
            : "presence";

      setPhase((current) => (current === nextPhase ? current : nextPhase));
    };

    updatePhase();
    const frame = window.requestAnimationFrame(updatePhase);
    window.addEventListener("scroll", updatePhase, { passive: true });
    window.addEventListener("resize", updatePhase);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updatePhase);
      window.removeEventListener("resize", updatePhase);
    };
  }, [ref]);

  return phase;
}
