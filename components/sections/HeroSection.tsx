"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const fadeUpVariant = (delay: number) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] },
  },
});

export function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-[72px] overflow-hidden px-[5vw]"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 grid-bg-sm pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.07) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full">
        {/* Eyebrow */}
        <motion.p
          className="font-mono-custom text-[0.72rem] text-accent-bright tracking-[0.22em] uppercase mb-8 flex items-center gap-4"
          variants={fadeUpVariant(0.2)}
          initial="hidden"
          animate="visible"
        >
          <span className="inline-block w-10 h-px bg-accent opacity-70" />
          David Budeli — Engenheiro &amp; Fundador
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="font-display font-extrabold leading-[0.93] tracking-[-0.04em] mb-8"
          style={{ fontSize: "clamp(3.5rem, 9.5vw, 8.5rem)" }}
          variants={fadeUpVariant(0.4)}
          initial="hidden"
          animate="visible"
        >
          <span className="block text-white">ARQUITETANDO</span>
          <span
            className="block"
            style={{
              background:
                "linear-gradient(135deg, #60A5FA 0%, #8B5CF6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            O INFINITO.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="font-body text-[1.05rem] text-muted font-light leading-[1.75] max-w-[560px] mb-12"
          variants={fadeUpVariant(0.6)}
          initial="hidden"
          animate="visible"
        >
          David Budeli desenvolve ecossistemas digitais ultra-premium, unindo
          visão estratégica com engenharia de software de alta performance.
        </motion.p>

        {/* Actions */}
        <motion.div
          className="flex flex-wrap gap-4"
          variants={fadeUpVariant(0.8)}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            onClick={() => scrollTo("arquiteturas")}
            className="relative px-8 py-[0.85rem] bg-accent text-white font-body font-medium text-[0.9rem] tracking-[0.05em] rounded-[3px] overflow-hidden group"
            whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(59,130,246,0.35)" }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Ver Projetos</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          </motion.button>

          <motion.button
            onClick={() => scrollTo("contato")}
            className="px-8 py-[0.85rem] border border-white/10 text-ice font-body font-medium text-[0.9rem] tracking-[0.05em] rounded-[3px] hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Entrar em Contato
          </motion.button>
        </motion.div>
      </div>

      {/* Stats — desktop */}
      <motion.div
        className="absolute right-[5vw] top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
      >
        {[
          { num: "50+", label: "Projetos Entregues" },
          { num: "3", label: "Empresas Fundadas" },
          { num: "∞", label: "Escala" },
        ].map((s) => (
          <div
            key={s.label}
            className="text-right border-r border-accent/30 pr-6"
          >
            <div
              className="font-display font-extrabold text-[2rem] leading-none"
              style={{
                background: "linear-gradient(135deg, #fff, #60A5FA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {s.num}
            </div>
            <div className="font-mono-custom text-[0.62rem] text-muted tracking-[0.12em] uppercase mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <div
          className="w-px h-14 bg-gradient-to-b from-accent to-transparent animate-scroll-pulse"
          style={{ animation: "scrollPulse 2s ease-in-out infinite" }}
        />
        <span className="font-mono-custom text-[0.6rem] text-muted tracking-[0.18em] uppercase">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
