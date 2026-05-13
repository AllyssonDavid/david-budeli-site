"use client";

import { motion } from "framer-motion";

const STATS = [
  { num: "50+", label: "Projetos Entregues" },
  { num: "3", label: "Empresas Fundadas" },
  { num: "∞", label: "Escala" },
];

export function HeroStats() {
  return (
    <motion.div
      className="hidden xl:flex flex-col gap-7 absolute right-[5vw] top-1/2 -translate-y-1/2 z-20"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.2, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
      aria-hidden="true"
    >
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          className="text-right pr-5 border-r"
          style={{ borderColor: "rgba(59,130,246,0.25)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3 + i * 0.1 }}
        >
          <div
            className="font-extrabold leading-none mb-1"
            style={{
              fontFamily: "var(--font-syne, 'Syne', sans-serif)",
              fontSize: "1.85rem",
              background: "linear-gradient(135deg, #fff, #60A5FA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {s.num}
          </div>
          <div
            className="tracking-[0.1em] uppercase"
            style={{
              fontFamily: "var(--font-jetbrains, 'JetBrains Mono', monospace)",
              fontSize: "0.6rem",
              color: "rgba(100,116,139,0.8)",
            }}
          >
            {s.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
