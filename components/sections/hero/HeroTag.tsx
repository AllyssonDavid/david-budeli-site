"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function HeroTag({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="inline-flex items-center gap-3 mb-8"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Pulsing dot */}
      <span className="relative flex h-[6px] w-[6px] flex-shrink-0">
        <span
          className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
          style={{ animation: "ping 1.8s cubic-bezier(0,0,0.2,1) infinite" }}
        />
        <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-blue-500" />
      </span>

      {/* Line */}
      <motion.span
        className="h-px bg-gradient-to-r from-blue-500/60 to-transparent"
        initial={{ width: 0 }}
        animate={{ width: 32 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      />

      {/* Text */}
      <span
        className="text-blue-400/80 tracking-[0.18em] uppercase"
        style={{
          fontFamily: "var(--font-jetbrains, 'JetBrains Mono', monospace)",
          fontSize: "0.68rem",
        }}
      >
        {children}
      </span>
    </motion.div>
  );
}
