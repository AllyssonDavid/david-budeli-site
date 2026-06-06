"use client";

import {
  motion,
  MotionValue,
  useTransform,
} from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function HeroHeadline({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  const titleY = useTransform(progress, [0, 1], [0, -46]);
  const titleScale = useTransform(progress, [0, 1], [1, 0.94]);
  const titleBlur = useTransform(progress, [0, 0.62, 1], [
    "blur(0px)",
    "blur(0px)",
    "blur(5px)",
  ]);
  const beyondY = useTransform(progress, [0, 1], [0, -20]);
  const standardY = useTransform(progress, [0, 1], [0, -8]);

  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        font-display
        font-extrabold
        text-[2.12rem]
        min-[375px]:text-[2.4rem]
        min-[430px]:text-[2.7rem]
        sm:text-[5rem]
        lg:text-[6rem]
        leading-[0.86]
        tracking-normal
        mb-7
        sm:mb-8
        select-none
        relative
        z-20
      "
      style={{
        fontFamily: "var(--font-syne, 'Syne', sans-serif)",
        y: reduced ? 0 : titleY,
        scale: reduced ? 1 : titleScale,
        filter: reduced ? "none" : titleBlur,
        willChange: "transform, filter",
      }}
    >
      <motion.span
        initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          delay: 0.2,
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          display: "block",
          color: "#FFFFFF",
          y: reduced ? 0 : beyondY,
        }}
      >
        <motion.span
          className="block"
          animate={reduced ? undefined : { y: [0, -3, 0] }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          BEYOND
        </motion.span>
      </motion.span>

      <motion.span
        initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          delay: 0.45,
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          display: "block",
          y: reduced ? 0 : standardY,
        }}
      >
        <motion.span
          className="block"
          animate={
            reduced
              ? undefined
              : {
                  y: [0, 3, 0],
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background:
              "linear-gradient(135deg, #60A5FA 0%, #818CF8 45%, #A78BFA 100%)",
            backgroundSize: "180% 180%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          STANDARD
        </motion.span>
      </motion.span>
    </motion.h1>
  );
}
