"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  getExperienceSection,
  type ExperienceSectionId,
  type ExperienceTone,
} from "./config";
import { experienceTones } from "./motionPresets";
import { useElementExperiencePhase } from "./useElementExperiencePhase";

interface ExperienceSectionProps {
  id: ExperienceSectionId;
  children: ReactNode;
  className?: string;
  tone?: ExperienceTone;
}

export function ExperienceSection({
  id,
  children,
  className,
  tone,
}: ExperienceSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const sectionTone = tone ?? getExperienceSection(id)?.tone ?? "blue";
  const toneValues = experienceTones[sectionTone];
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 94%", "end 10%"],
  });
  const phase = useElementExperiencePhase(ref);

  const y = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [54, 0, 0, -30]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.26, 0.84, 1],
    [0.978, 1, 1, 0.99]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.86, 1],
    [0.18, 1, 1, 0.68]
  );
  const glowY = useTransform(scrollYProgress, [0, 1], ["-20%", "76%"]);
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.28, 0.72, 1],
    [0, 0.66, 0.34, 0]
  );
  const lineScale = useTransform(scrollYProgress, [0.05, 0.32], [0, 1]);
  const depthY = useTransform(scrollYProgress, [0, 1], [22, -24]);
  const depthOpacity = useTransform(
    scrollYProgress,
    [0, 0.32, 0.75, 1],
    [0, 0.28, 0.2, 0]
  );

  return (
    <motion.section
      ref={ref}
      id={id}
      data-experience-section={id}
      data-experience-tone={sectionTone}
      data-experience-phase={phase}
      className={cn("relative z-10 overflow-hidden", className)}
      style={{
        y: reduced ? 0 : y,
        scale: reduced ? 1 : scale,
        opacity,
        willChange: "transform, opacity",
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left"
        style={{
          scaleX: reduced ? 1 : lineScale,
          background: `linear-gradient(90deg, transparent, ${toneValues.line}, transparent)`,
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-x-[-12%] top-0 h-[56%]"
        style={{
          y: reduced ? 0 : glowY,
          opacity: glowOpacity,
          background: `linear-gradient(130deg, transparent 10%, ${toneValues.glow} 45%, transparent 78%)`,
          filter: "blur(24px)",
          willChange: "transform, opacity",
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-x-[-10%] top-[10%] h-[28%]"
        style={{
          y: reduced ? 0 : depthY,
          opacity: depthOpacity,
          background: `linear-gradient(100deg, transparent 12%, ${toneValues.glowSoft} 50%, transparent 82%)`,
          filter: "blur(18px)",
          willChange: "transform, opacity",
        }}
      />

      {children}
    </motion.section>
  );
}
