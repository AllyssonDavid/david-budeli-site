"use client";

import { motion } from "framer-motion";

export function HeroScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.6, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      aria-hidden="true"
    >
      {/* Animated line */}
      <div className="relative w-px h-14 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-blue-400 to-transparent"
          style={{ height: "200%" }}
          animate={{ y: ["-100%", "100%"] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 0.2,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(59,130,246,0.12)" }}
        />
      </div>

      {/* Label */}
      <span
        className="tracking-[0.22em] uppercase text-[0.58rem]"
        style={{
          fontFamily: "var(--font-jetbrains, 'JetBrains Mono', monospace)",
          color: "rgba(100,116,139,0.8)",
        }}
      >
        Scroll
      </span>
    </motion.div>
  );
}
