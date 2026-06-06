"use client";

import { useEffect, useState } from "react";
import { MotionValue } from "framer-motion";

export type ExperiencePhase = "entry" | "presence" | "exit";

export function useExperiencePhase(
  progress: MotionValue<number>,
  entryEnd = 0.24,
  exitStart = 0.78
) {
  const [phase, setPhase] = useState<ExperiencePhase>("entry");

  useEffect(() => {
    const updatePhase = (latest = progress.get()) => {
      const nextPhase =
        latest < entryEnd ? "entry" : latest > exitStart ? "exit" : "presence";

      setPhase((current) => (current === nextPhase ? current : nextPhase));
    };

    updatePhase();
    const frame = window.requestAnimationFrame(() => updatePhase());
    const unsubscribe = progress.on("change", updatePhase);
    const handleScroll = () => updatePhase();
    const handleResize = () => updatePhase();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(frame);
      unsubscribe();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [entryEnd, exitStart, progress]);

  return phase;
}
