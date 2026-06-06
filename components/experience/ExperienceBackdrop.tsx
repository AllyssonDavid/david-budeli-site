"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { experienceTones, premiumEase } from "./motionPresets";
import { useExperience } from "./ExperienceProvider";

export function ExperienceBackdrop() {
  const reduced = useReducedMotion();
  const { activeIndex, activeTone } = useExperience();
  const tone = experienceTones[activeTone];
  const { scrollYProgress } = useScroll();

  const washY = useTransform(scrollYProgress, [0, 1], ["0%", "-24%"]);
  const beamY = useTransform(scrollYProgress, [0, 1], ["-14%", "40%"]);
  const floorOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.32, 0.58, 1],
    [0.14, 0.34, 0.2, 0.36, 0.22]
  );
  const depthOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.52, 0.8, 1],
    [0.2, 0.42, 0.3, 0.45, 0.28]
  );
  const phaseY = `${Math.min(activeIndex * 9, 54)}%`;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-x-[-22%] top-[-18%] h-[150%]"
        animate={{
          background: `linear-gradient(160deg, ${tone.backdropA} 0%, transparent 30%, ${tone.glowSoft} 48%, transparent 65%, ${tone.backdropB} 100%)`,
        }}
        transition={{ duration: 0.85, ease: premiumEase }}
        style={{
          y: reduced ? 0 : washY,
          opacity: depthOpacity,
          filter: "blur(22px)",
          willChange: "transform, opacity",
        }}
      />

      <motion.div
        className="absolute left-1/2 top-0 h-[130%] w-[48vw] -translate-x-1/2"
        animate={{
          background: `linear-gradient(90deg, transparent 0%, ${tone.glowSoft} 40%, rgba(226,232,240,0.035) 50%, ${tone.glow} 60%, transparent 100%)`,
        }}
        transition={{ duration: 0.8, ease: premiumEase }}
        style={{
          y: reduced ? 0 : beamY,
          opacity: depthOpacity,
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 72%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 72%, transparent 100%)",
          willChange: "transform, opacity",
        }}
      />

      <motion.div
        className="absolute inset-x-0 bottom-0 h-[45vh]"
        animate={{
          background: `linear-gradient(to top, ${tone.glowSoft}, rgba(5,5,5,0))`,
        }}
        transition={{ duration: 0.8, ease: premiumEase }}
        style={{ opacity: floorOpacity }}
      />

      <motion.div
        className="absolute inset-x-[-16%] top-[12%] h-[36vh]"
        animate={{
          y: phaseY,
          background: `linear-gradient(112deg, transparent 8%, ${tone.glow} 42%, transparent 78%)`,
          opacity: 0.32,
        }}
        transition={{ duration: 0.9, ease: premiumEase }}
        style={{
          filter: "blur(26px)",
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
}
