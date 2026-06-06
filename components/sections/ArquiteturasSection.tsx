"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealBlock } from "@/components/animations/RevealBlock";
import {
  ExperienceSection,
} from "@/components/experience/ExperienceSection";
import { ExperienceTitle } from "@/components/experience/ExperienceTitle";
import { Tag } from "@/components/ui/Tag";
import { PROJETOS_DATA } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Plus } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { premiumEase, tactileFeedback } from "@/components/experience/motionPresets";

const previewAccents = [
  "rgba(59,130,246,0.74)",
  "rgba(139,92,246,0.72)",
  "rgba(34,197,94,0.58)",
  "rgba(96,165,250,0.7)",
  "rgba(245,158,11,0.58)",
];

function ProjectPreview({
  index,
  name,
  year,
  tags,
  desc,
}: {
  index: number;
  name: string;
  year: string;
  tags: string[];
  desc: string;
}) {
  const reduced = useReducedMotion();
  const accent = previewAccents[index % previewAccents.length];

  return (
    <motion.div
      className="relative grid gap-5 pb-7 pl-[3.6rem] pr-0 sm:grid-cols-[minmax(260px,0.85fr)_1fr] sm:gap-8 sm:pb-8 sm:pl-[5rem]"
      initial={{ height: 0, opacity: 0, y: -10 }}
      animate={{ height: "auto", opacity: 1, y: 0 }}
      exit={{ height: 0, opacity: 0, y: -8 }}
      transition={{ duration: 0.46, ease: premiumEase }}
    >
      <motion.div
        className="relative min-h-[150px] overflow-hidden border border-white/[0.07] bg-bg-1"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 0.62, ease: premiumEase }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.035), transparent 34%, rgba(59,130,246,0.06))",
          }}
        />
        <motion.div
          className="absolute inset-y-0 w-24"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            opacity: 0.2,
          }}
          animate={reduced ? undefined : { x: ["-45%", "245%"] }}
          transition={{
            duration: 4.6,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.8,
          }}
        />
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
          <span className="font-mono-custom text-[0.58rem] tracking-[0.16em] text-accent-bright/70">
            CASE / {year}
          </span>
          <span className="h-2 w-2 rounded-full bg-accent-bright/70 shadow-[0_0_18px_rgba(96,165,250,0.45)]" />
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="mb-3 h-px w-full bg-white/[0.08]" />
          <div className="grid grid-cols-3 gap-2">
            {tags.map((tag, tagIndex) => (
              <motion.div
                key={tag}
                className="h-9 border border-white/[0.06] bg-white/[0.025] px-2 py-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * tagIndex, duration: 0.35 }}
              >
                <div className="h-1 w-8 bg-accent/45" />
                <div className="mt-2 h-1 w-full bg-white/[0.08]" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="min-w-0 self-center">
        <p className="font-mono-custom mb-2 text-[0.6rem] uppercase tracking-[0.14em] text-accent-bright/70">
          Preview interativo
        </p>
        <h4 className="mb-2 font-display text-[1.25rem] font-bold leading-tight text-ice">
          {name}
        </h4>
        <p className="font-body text-[0.86rem] leading-[1.65] text-muted">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

export function ArquiteturasSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  return (
    <ExperienceSection
      id="arquiteturas"
      className="section-padding bg-bg-0/93"
      tone="blue"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="max-w-[1200px] mx-auto">
        <RevealBlock>
          <Tag>06 / Projetos</Tag>
        </RevealBlock>

        <RevealBlock delay={0.1}>
          <ExperienceTitle>
            Produtos
            <br />
            <span className="gradient-text">em órbita</span>
          </ExperienceTitle>
        </RevealBlock>

        <div className="flex flex-col">
          {PROJETOS_DATA.map((proj, i) => {
            const isOpen = activeIdx === i || hoveredIdx === i;

            return (
              <motion.article
                key={proj.num}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                className={cn(
                  "group relative cursor-pointer overflow-hidden border-b border-white/[0.05] outline-none",
                  isOpen && "border-accent/20"
                )}
                initial={{ opacity: 0, y: 34, scale: 0.985 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: premiumEase,
                }}
                whileTap={tactileFeedback.whileTap}
                onClick={() => setActiveIdx((current) => (current === i ? null : i))}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveIdx((current) => (current === i ? null : i));
                  }
                }}
                onHoverStart={() => setHoveredIdx(i)}
                onHoverEnd={() => setHoveredIdx(null)}
              >
              {/* Hover BG */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(59,130,246,0.03), transparent)",
                    }}
                  />
                )}
              </AnimatePresence>

              <motion.div
                className="absolute left-0 top-0 h-px w-full origin-left bg-gradient-to-r from-accent/70 via-violet/50 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isOpen ? 1 : 0.18 }}
                transition={{ duration: 0.45, ease: premiumEase }}
              />

              <div className="relative grid grid-cols-[2.6rem_1fr] gap-4 py-6 transition-[padding] duration-300 sm:grid-cols-[5rem_1fr_auto] sm:items-center sm:gap-8 sm:py-8 sm:group-hover:pl-4">
                {/* Number */}
                <div className="font-mono-custom pt-1 text-[0.68rem] tracking-[0.18em] text-accent/30 sm:pt-0">
                  {proj.num}
                </div>

                {/* Info */}
                <div className="min-w-0 pr-12 sm:pr-0">
                  <motion.h3
                    className="mb-3 font-display text-[1.34rem] font-extrabold leading-[1.02] tracking-normal sm:text-[1.55rem] lg:text-[1.9rem]"
                    style={{
                      color: isOpen ? "#60A5FA" : "#E2E8F0",
                      transition: "color 0.3s",
                    }}
                  >
                    {proj.name}
                  </motion.h3>

                  <div className="flex flex-wrap items-center gap-2">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono-custom border border-accent/20 px-2 py-[0.18rem] text-[0.6rem] tracking-[0.08em] text-accent-bright sm:text-[0.62rem] sm:tracking-[0.1em]"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="font-body hidden max-w-[460px] text-[0.82rem] text-muted sm:inline">
                      {proj.desc}
                    </span>
                  </div>

                  <p className="mt-3 font-body text-[0.82rem] leading-[1.58] text-muted sm:hidden">
                    {proj.desc}
                  </p>
                </div>

                {/* Arrow */}
                <motion.div
                  className="absolute right-0 top-6 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/[0.06] sm:static sm:h-12 sm:w-12"
                  animate={
                    isOpen
                      ? {
                          borderColor: "rgba(59,130,246,0.4)",
                          backgroundColor: "rgba(59,130,246,0.07)",
                          rotate: 45,
                        }
                      : { borderColor: "rgba(255,255,255,0.06)", rotate: 0 }
                  }
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight
                    size={16}
                    style={{
                      stroke:
                        isOpen ? "#60A5FA" : "#64748B",
                      transition: "stroke 0.3s",
                    }}
                  />
                </motion.div>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <ProjectPreview
                    index={i}
                    name={proj.name}
                    year={proj.year}
                    tags={proj.tags}
                    desc={proj.desc}
                  />
                )}
              </AnimatePresence>

              {/* Year tag */}
              <div className="absolute right-14 top-1/2 -translate-y-1/2 font-mono-custom text-[0.62rem] text-muted/40 hidden xl:block">
                {proj.year}
              </div>
              </motion.article>
            );
          })}
        </div>

        {/* View more hint */}
        <RevealBlock delay={0.4}>
          <div className="mt-12 flex justify-center">
            <motion.button
              className="group flex items-center gap-3 font-mono-custom text-[0.72rem] uppercase tracking-[0.12em] text-muted transition-colors duration-300 hover:text-accent-bright"
              whileTap={tactileFeedback.whileTap}
              whileHover={{ y: -2 }}
            >
              <span className="w-6 h-6 border border-current rounded-full flex items-center justify-center group-hover:border-accent-bright transition-colors">
                <Plus size={12} />
              </span>
              Ver todos os projetos
            </motion.button>
          </div>
        </RevealBlock>
      </div>
    </ExperienceSection>
  );
}
