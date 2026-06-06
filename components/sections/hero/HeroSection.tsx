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
import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { HeroCanvas } from "./HeroCanvas";
import HeroHeadline from "./HeroHeadline";
import { HeroScrollIndicator } from "./HeroScrollIndicator";
import { HeroStats } from "./HeroStats";
import { HeroTag } from "./HeroTag";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { AnimatedNumber } from "@/components/animations/AnimatedNumber";
import { premiumEase, tactileFeedback } from "@/components/experience/motionPresets";
import { useExperiencePhase } from "@/components/experience/useExperiencePhase";
// ─── Animation variants ──────────────────────────────────────────────────────

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 22, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: {
    delay,
    duration: 0.85,
    ease: premiumEase,
  },
});

// ─── CTA Buttons ─────────────────────────────────────────────────────────────

function HeroCTA() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      className="mt-2 flex w-full max-w-[420px] flex-col gap-3 sm:max-w-none sm:flex-row sm:gap-4"
      {...fadeUp(1.7)}
    >
      {/* Primary */}
      <motion.button
        onClick={() => scrollTo("ecossistema")}
        className="group relative min-h-[3.25rem] w-full overflow-hidden rounded-[3px] bg-blue-600 px-7 py-[0.95rem] text-[0.88rem] font-medium tracking-[0.05em] text-white sm:w-auto sm:px-8 sm:py-[0.85rem]"
        style={{ fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 8px 32px rgba(59,130,246,0.38)",
        }}
        animate={{
          boxShadow: [
            "0 0 0 rgba(59,130,246,0)",
            "0 16px 46px rgba(59,130,246,0.24)",
            "0 0 0 rgba(59,130,246,0)",
          ],
        }}
        whileTap={tactileFeedback.whileTap}
        transition={{
          scale: { duration: 0.25 },
          boxShadow: { duration: 4.8, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {/* Shimmer */}
        <span
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
          }}
        />
        <span className="relative z-10">Entrar no Ecossistema</span>
      </motion.button>

      {/* Ghost */}
      <motion.button
        onClick={() => scrollTo("contato")}
        className="min-h-[3.25rem] w-full rounded-[3px] border px-7 py-[0.95rem] text-[0.88rem] font-medium tracking-[0.05em] text-[#e2e8f0] transition-all duration-300 sm:w-auto sm:px-8 sm:py-[0.85rem]"
        style={{
          fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
          borderColor: "rgba(255,255,255,0.1)",
        }}
        whileHover={{
          borderColor: "rgba(255,255,255,0.22)",
          backgroundColor: "rgba(255,255,255,0.03)",
          scale: 1.01,
        }}
        whileTap={tactileFeedback.whileTap}
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

function HeroPortal({ progress }: { progress: MotionValue<number> }) {
  const reduced = useReducedMotion();
  const opacity = useTransform(progress, [0.06, 0.28, 0.72], [0, 1, 0.4]);
  const scaleX = useTransform(progress, [0.08, 0.4], [0.18, 1]);
  const y = useTransform(progress, [0, 1], [36, -22]);

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[7] h-40 overflow-hidden"
      style={{ opacity, y: reduced ? 0 : y }}
      aria-hidden
    >
      <motion.div
        className="absolute left-1/2 top-10 h-px w-[78vw] -translate-x-1/2 origin-center bg-gradient-to-r from-transparent via-blue-300/70 to-transparent"
        style={{ scaleX: reduced ? 1 : scaleX }}
      />
      <motion.div
        className="absolute left-1/2 top-10 h-28 w-[82vw] -translate-x-1/2"
        style={{
          scaleX: reduced ? 1 : scaleX,
          background:
            "linear-gradient(to bottom, rgba(96,165,250,0.16), rgba(139,92,246,0.08) 34%, transparent 78%)",
          clipPath: "polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)",
          filter: "blur(0.3px)",
        }}
      />
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HeroSection() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const phase = useExperiencePhase(scrollYProgress, 0.1, 0.58);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 0.75, 0.2]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -84]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.975]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.76, 1], [1, 0.88, 0.35]);

  // Parallax container — tracks mouse position and applies transform
  // to children with [data-parallax-depth] attribute
  const parallaxRef = useMouseParallax<HTMLDivElement>({
    strength: reduced ? 0 : 32,
    ease: 0.06,
  });

  return (
    <motion.section
      ref={heroRef}
      id="hero"
      data-experience-section="hero"
      data-experience-tone="blue"
      data-experience-phase={phase}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* ── Layer 0: Procedural canvas (grid + particles + glow) ── */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: sceneOpacity,
          y: reduced ? 0 : sceneY,
          willChange: "transform, opacity",
        }}
      >
        <HeroCanvas />
      </motion.div>

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
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-[2] md:h-32"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.8) 0%, transparent 100%)",
        }}
        aria-hidden
      />

      {/* ── Layer 4: Bottom fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none z-[2] md:h-48"
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

        {/* Depth-3: ambient light field */}
        <div
          data-parallax-depth="3"
          className="absolute pointer-events-none"
          style={{
            top: "20%",
            left: "5%",
            width: "90vw",
            height: "500px",
            background:
              "linear-gradient(105deg, transparent 0%, rgba(59,130,246,0.07) 36%, rgba(139,92,246,0.035) 54%, transparent 78%)",
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
      <motion.div
        className="relative z-10 w-full px-4 pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-20 sm:px-6 sm:pb-24 sm:pt-24 md:px-[5vw] md:pb-0 md:pt-[72px]"
        style={{
          y: reduced ? 0 : contentY,
          scale: reduced ? 1 : contentScale,
          opacity: contentOpacity,
          willChange: "transform, opacity",
        }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[900px]">
            {/* Eyebrow tag */}
            <HeroTag>David Budeli</HeroTag>

            {/* Headline with split-word reveal */}
            <HeroHeadline progress={scrollYProgress} />

            {/* Subheadline */}
            <motion.p
              className="mb-8 max-w-[560px] text-[1rem] font-light leading-[1.72] sm:mb-10 sm:text-[1.02rem] sm:leading-[1.78]"
              style={{
                fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
                color: "rgba(100,116,139,0.9)",
              }}
              {...fadeUp(1.5)}
            >
              Arquitetando{" "}
              <span style={{ color: "rgba(148,163,184,0.9)" }}>
                sistemas digitais
              </span>{" "}
              com engenharia, IA, automação e{" "}
              <span style={{ color: "rgba(148,163,184,0.9)" }}>
                segurança
              </span>
              .
            </motion.p>

            {/* CTA buttons */}
            <HeroCTA />

            {/* Mobile stats (hidden on xl — xl shows HeroStats absolutely positioned) */}
            <motion.div
              className="mt-10 grid max-w-[440px] grid-cols-3 overflow-hidden border border-white/[0.06] bg-white/[0.02] xl:hidden"
              {...fadeUp(1.9)}
            >
              {[
                { value: 50, suffix: "+", label: "Sistemas" },
                { value: 3, suffix: "", label: "Produtos" },
                { value: 8, suffix: "+", label: "Anos" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={cn(
                    "px-3 py-4",
                    i < 2 && "border-r border-white/[0.06]"
                  )}
                >
                  <div
                    className="mb-1 text-center font-extrabold text-[1.35rem] leading-none min-[375px]:text-[1.5rem]"
                    style={{
                      fontFamily:
                        "var(--font-syne, 'Syne', sans-serif)",
                      background: "linear-gradient(135deg, #fff, #60A5FA)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    <AnimatedNumber value={s.value} suffix={s.suffix} />
                  </div>
                  <div
                    className="text-center uppercase tracking-[0.08em]"
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
      </motion.div>

      {/* ── Desktop floating stats ── */}
      <HeroStats />

      {/* ── Scroll indicator ── */}
      <HeroScrollIndicator />

      <HeroPortal progress={scrollYProgress} />
    </motion.section>
  );
}
