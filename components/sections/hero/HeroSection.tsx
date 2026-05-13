"use client";

/**
 * HeroSection.tsx
 * ───────────────
 * Cinematic hero section inspired by Lusion / Active Theory aesthetic.
 *
 * Features:
 *   • Procedural canvas: live grid + particle system + atmospheric glow
 *   • Mouse-driven multi-layer parallax (4 depth levels)
 *   • Split-word headline reveal with spring physics
 *   • Framer Motion orchestrated entrance sequence
 *   • Noise overlay for film-grain atmosphere
 *   • Radial glow that follows cursor
 *   • Floating stat indicators (desktop)
 *   • Cinematic scroll indicator
 *   • prefers-reduced-motion aware
 *   • DPR-aware canvas for crisp rendering
 *   • Mobile-responsive with motion adapted
 *
 * Path: components/sections/HeroSection.tsx
 */

import { useRef } from "react";
import { motion } from "framer-motion";
import { HeroCanvas } from "./HeroCanvas";
import HeroHeadline from "./HeroHeadline";
import { HeroScrollIndicator } from "./HeroScrollIndicator";
import { HeroStats } from "./HeroStats";
import { HeroTag } from "./HeroTag";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { useReducedMotion } from "@/hooks/useReducedMotion";
// ─── Animation variants ──────────────────────────────────────────────────────

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 22, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: {
    delay,
    duration: 0.85,
    ease: [0.23, 1, 0.32, 1],
  },
});

// ─── CTA Buttons ─────────────────────────────────────────────────────────────

function HeroCTA() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      className="flex flex-wrap gap-4 mt-1"
      {...fadeUp(1.7)}
    >
      {/* Primary */}
      <motion.button
        onClick={() => scrollTo("projetos")}
        className="relative overflow-hidden px-8 py-[0.85rem] bg-blue-600 text-white text-[0.88rem] font-medium tracking-[0.05em] rounded-[3px] group"
        style={{ fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 8px 32px rgba(59,130,246,0.38)",
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.25 }}
      >
        {/* Shimmer */}
        <span
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
          }}
        />
        <span className="relative z-10">Ver Projetos</span>
      </motion.button>

      {/* Ghost */}
      <motion.button
        onClick={() => scrollTo("contato")}
        className="px-8 py-[0.85rem] text-[#e2e8f0] text-[0.88rem] font-medium tracking-[0.05em] rounded-[3px] border transition-all duration-300"
        style={{
          fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
          borderColor: "rgba(255,255,255,0.1)",
        }}
        whileHover={{
          borderColor: "rgba(255,255,255,0.22)",
          backgroundColor: "rgba(255,255,255,0.03)",
          scale: 1.01,
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.25 }}
      >
        Entrar em Contato
      </motion.button>
    </motion.div>
  );
}

// ─── HUD Corner Decorators ────────────────────────────────────────────────────

function HUDCorners() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-10 hidden md:block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.8, duration: 1 }}
      aria-hidden
    >
      {/* Top-left corner */}
      <div className="absolute top-8 left-8">
        <div
          className="w-4 h-4 border-t border-l"
          style={{ borderColor: "rgba(59,130,246,0.3)" }}
        />
      </div>
      {/* Top-right corner */}
      <div className="absolute top-8 right-8">
        <div
          className="w-4 h-4 border-t border-r"
          style={{ borderColor: "rgba(59,130,246,0.3)" }}
        />
      </div>
      {/* Bottom-left corner */}
      <div className="absolute bottom-8 left-8">
        <div
          className="w-4 h-4 border-b border-l"
          style={{ borderColor: "rgba(59,130,246,0.3)" }}
        />
      </div>

      {/* Coordinate readout */}
      <div
        className="absolute bottom-8 right-8 tracking-[0.12em]"
        style={{
          fontFamily: "var(--font-jetbrains, 'JetBrains Mono', monospace)",
          fontSize: "0.58rem",
          color: "rgba(59,130,246,0.25)",
        }}
      >
        DB // 2025
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HeroSection() {
  const reduced = useReducedMotion();

  // Parallax container — tracks mouse position and applies transform
  // to children with [data-parallax-depth] attribute
  const parallaxRef = useMouseParallax<HTMLDivElement>({
    strength: reduced ? 0 : 32,
    ease: 0.06,
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* ── Layer 0: Procedural canvas (grid + particles + glow) ── */}
      <HeroCanvas />

      {/* ── Layer 1: Noise film grain overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
          opacity: 0.5,
        }}
        aria-hidden
      />

      {/* ── Layer 2: Atmospheric radial vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 40%, transparent 0%, rgba(5,5,5,0.5) 100%)",
        }}
        aria-hidden
      />

      {/* ── Layer 3: Top fade ── */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-[2]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.8) 0%, transparent 100%)",
        }}
        aria-hidden
      />

      {/* ── Layer 4: Bottom fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-[2]"
        style={{
          background:
            "linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 100%)",
        }}
        aria-hidden
      />

      {/* ── Layer 5: HUD corner decorators ── */}
      <HUDCorners />

      {/* ── Layer 6: Parallax container ── */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 pointer-events-none z-[3]"
        aria-hidden
      >
        {/* Depth-1: fastest (foreground feel) */}
        <div
          data-parallax-depth="1"
          className="absolute"
          style={{ top: "15%", left: "8%" }}
        >
          <div
            className="w-[1px] h-16 opacity-20"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(59,130,246,0.8), transparent)",
            }}
          />
        </div>

        {/* Depth-2 */}
        <div
          data-parallax-depth="2"
          className="absolute"
          style={{ top: "28%", right: "12%" }}
        >
          <div
            className="w-[120px] h-[1px] opacity-15"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(139,92,246,0.7), transparent)",
            }}
          />
        </div>

        {/* Depth-3: ambient glow orb */}
        <div
          data-parallax-depth="3"
          className="absolute pointer-events-none"
          style={{
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "500px",
            background:
              "radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, rgba(139,92,246,0.03) 45%, transparent 70%)",
            filter: "blur(1px)",
          }}
        />

        {/* Depth-4: slowest (background feel) */}
        <div
          data-parallax-depth="4"
          className="absolute"
          style={{ bottom: "25%", right: "18%" }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            className="opacity-10"
          >
            <polygon
              points="24,4 44,14 44,34 24,44 4,34 4,14"
              stroke="rgba(59,130,246,0.6)"
              strokeWidth="0.8"
            />
            <polygon
              points="24,12 36,18 36,30 24,36 12,30 12,18"
              stroke="rgba(139,92,246,0.5)"
              strokeWidth="0.6"
            />
          </svg>
        </div>
      </div>

      {/* ── Layer 7: Main content ── */}
      <div className="relative z-10 w-full px-[5vw] pt-[72px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[900px]">
            {/* Eyebrow tag */}
            <HeroTag>David Budeli — </HeroTag>

            {/* Headline with split-word reveal */}
            <HeroHeadline />

            {/* Subheadline */}
            <motion.p
              className="text-[1.02rem] font-light leading-[1.78] max-w-[540px] mb-10"
              style={{
                fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
                color: "rgba(100,116,139,0.9)",
              }}
              {...fadeUp(1.5)}
            >
              Design e {" "}
              <span style={{ color: "rgba(148,163,184,0.9)" }}>
                tecnologia
              </span>{" "}
              com{" "}
              <span style={{ color: "rgba(148,163,184,0.9)" }}>
              alto nível.
              </span>
              .
            </motion.p>

            {/* CTA buttons */}
            <HeroCTA />

            {/* Mobile stats (hidden on xl — xl shows HeroStats absolutely positioned) */}
            <motion.div
              className="flex xl:hidden gap-8 mt-14 pt-8"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              {...fadeUp(1.9)}
            >
              {[
                { num: "550+", label: "Projetos" },
                { num: "16", label: "Empresas" },
                { num: "8+", label: "Anos" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="font-extrabold text-[1.5rem] leading-none mb-1"
                    style={{
                      fontFamily:
                        "var(--font-syne, 'Syne', sans-serif)",
                      background: "linear-gradient(135deg, #fff, #60A5FA)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.num}
                  </div>
                  <div
                    className="uppercase tracking-[0.1em]"
                    style={{
                      fontFamily:
                        "var(--font-jetbrains, 'JetBrains Mono', monospace)",
                      fontSize: "0.58rem",
                      color: "rgba(100,116,139,0.7)",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Desktop floating stats ── */}
      <HeroStats />

      {/* ── Scroll indicator ── */}
      <HeroScrollIndicator />
    </section>
  );
}
