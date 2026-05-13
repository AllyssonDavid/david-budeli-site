"use client";

import { motion } from "framer-motion";

export default function HeroHeadline() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        font-display
        font-extrabold
        leading-[0.9]
        tracking-[-0.05em]
        mb-8
        select-none
        relative
        z-20
      "
      style={{
        fontSize: "clamp(1.9rem, 8vw, 6rem)",
        fontFamily: "var(--font-syne, 'Syne', sans-serif)",
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
        }}
      >
        BEYOND
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
          background:
            "linear-gradient(135deg, #60A5FA 0%, #818CF8 45%, #A78BFA 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        STANDARD
      </motion.span>
    </motion.h1>
  );
}