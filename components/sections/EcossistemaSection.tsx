"use client";

import { motion } from "framer-motion";
import { RevealBlock } from "@/components/animations/RevealBlock";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { ExperienceTitle } from "@/components/experience/ExperienceTitle";
import { Tag } from "@/components/ui/Tag";
import { ECOSSISTEMA_DATA } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";
import { premiumEase, tactileFeedback } from "@/components/experience/motionPresets";

const EcoIcons = {
  "001": () => (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <polygon
        points="24,4 44,14 44,34 24,44 4,34 4,14"
        stroke="#3B82F6"
        strokeWidth="1.5"
        fill="rgba(59,130,246,0.05)"
      />
      <polygon
        points="24,12 36,18 36,30 24,36 12,30 12,18"
        stroke="#8B5CF6"
        strokeWidth="1"
        fill="rgba(139,92,246,0.05)"
      />
      <circle cx="24" cy="24" r="4" fill="#3B82F6" opacity="0.8" />
    </svg>
  ),
  "002": () => (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect x="4" y="4" width="18" height="18" rx="2" stroke="#3B82F6" strokeWidth="1.5" fill="rgba(59,130,246,0.05)" />
      <rect x="26" y="4" width="18" height="18" rx="2" stroke="#8B5CF6" strokeWidth="1.5" fill="rgba(139,92,246,0.05)" />
      <rect x="4" y="26" width="18" height="18" rx="2" stroke="#8B5CF6" strokeWidth="1.5" fill="rgba(139,92,246,0.05)" />
      <rect x="26" y="26" width="18" height="18" rx="2" stroke="#3B82F6" strokeWidth="1.5" fill="rgba(59,130,246,0.05)" />
      <circle cx="24" cy="24" r="3" fill="#60A5FA" />
    </svg>
  ),
  "003": () => (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <circle cx="24" cy="24" r="18" stroke="#3B82F6" strokeWidth="1.5" fill="rgba(59,130,246,0.05)" />
      <path d="M16 24h16M24 16v16" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="24" r="6" stroke="#8B5CF6" strokeWidth="1" fill="rgba(139,92,246,0.08)" />
      <path d="M12 24 Q18 18 24 24 Q30 30 36 24" stroke="#8B5CF6" strokeWidth="1" fill="none" />
    </svg>
  ),
};

export function EcossistemaSection() {
  return (
    <ExperienceSection
      id="ecossistema"
      className="section-padding bg-bg-0/92"
      tone="violet"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="max-w-[1200px] mx-auto">
        <RevealBlock>
          <Tag>02 / Ecossistema</Tag>
        </RevealBlock>

        <RevealBlock delay={0.1}>
          <ExperienceTitle>
            Três produtos.
            <br />
            <span className="gradient-text">Um sistema.</span>
          </ExperienceTitle>
        </RevealBlock>

        <div
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3"
          data-lenis-prevent
        >
          {ECOSSISTEMA_DATA.map((item, i) => {
            const Icon = EcoIcons[item.id as keyof typeof EcoIcons];

            return (
              <RevealBlock
                key={item.id}
                delay={i * 0.12}
                className="min-w-[82vw] snap-start md:min-w-0"
              >
                <motion.div
                  className="group relative h-full cursor-default overflow-hidden border border-white/[0.05] bg-bg-1 p-6 sm:p-8 lg:p-10"
                  whileHover={{
                    y: -4,
                    borderColor: "rgba(59,130,246,0.25)",
                    transition: { duration: 0.3, ease: premiumEase },
                  }}
                  whileTap={{
                    ...tactileFeedback.whileTap,
                    borderColor: "rgba(96,165,250,0.42)",
                  }}
                >
                  {/* Top border glow */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    whileHover={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ delay: i * 0.08, duration: 0.8 }}
                  />

                  {/* Background glow */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 0%, rgba(59,130,246,0.07), transparent 60%)",
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Number */}
                  <div className="font-mono-custom mb-5 text-[0.68rem] tracking-[0.18em] text-accent/40 sm:mb-6">
                    {item.id}
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 mb-5 h-11 w-11 sm:mb-6 sm:h-12 sm:w-12">
                    <Icon />
                  </div>

                  {/* Name */}
                  <h3 className="relative z-10 mb-1 font-display text-[1.45rem] font-extrabold text-white sm:text-[1.5rem]">
                    {item.name}
                  </h3>

                  {/* Sub */}
                  <p className="font-mono-custom relative z-10 mb-4 text-[0.64rem] uppercase tracking-[0.12em] text-accent-bright sm:text-[0.68rem]">
                    {item.sub}
                  </p>

                  {/* Desc */}
                  <p className="relative z-10 font-body text-[0.88rem] font-light leading-[1.7] text-muted">
                    {item.desc}
                  </p>

                  {/* Arrow */}
                  <motion.div
                    className="absolute bottom-6 right-6 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-accent/25 opacity-70 sm:bottom-8 sm:right-8"
                    initial={{ opacity: 0.7, x: 0 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ArrowUpRight size={13} className="text-accent-bright" />
                  </motion.div>
                </motion.div>
              </RevealBlock>
            );
          })}
        </div>
      </div>
    </ExperienceSection>
  );
}
