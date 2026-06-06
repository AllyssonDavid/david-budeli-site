"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RevealBlock } from "@/components/animations/RevealBlock";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { ExperienceTitle } from "@/components/experience/ExperienceTitle";
import { Tag } from "@/components/ui/Tag";
import { STACK_DATA } from "@/lib/constants";
import { tactileFeedback } from "@/components/experience/motionPresets";

export function StackSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <ExperienceSection
      id="stack"
      className="section-padding bg-bg-1/90"
      tone="violet"
    >
      <div className="max-w-[1200px] mx-auto">
        <RevealBlock>
          <Tag>05 / Stack</Tag>
        </RevealBlock>

        <RevealBlock delay={0.1}>
          <ExperienceTitle>
            Base
            <br />
            <span className="gradient-text">tecnológica</span>
          </ExperienceTitle>
        </RevealBlock>

        {/* Terminal container */}
        <RevealBlock delay={0.2}>
          <div className="border border-white/[0.05] overflow-hidden bg-bg-0">
            {/* Terminal header */}
            <div className="flex items-center gap-2 border-b border-white/[0.05] bg-bg-2 px-4 py-3 sm:px-5">
              <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[#28CA41]" />
              <div className="flex-1" />
              <div className="font-mono-custom min-w-0 truncate text-[0.58rem] tracking-[0.08em] text-muted sm:text-[0.68rem] sm:tracking-[0.1em]">
                david@galaxy ~ /tech-stack
              </div>
            </div>

            {/* Stack grid */}
            <div
              className="grid grid-cols-2 gap-px bg-white/[0.03] p-0 min-[420px]:grid-cols-3 md:grid-cols-5"
            >
              {STACK_DATA.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  className="group relative flex aspect-[1.12/1] cursor-default flex-col items-center justify-center gap-3 overflow-hidden bg-bg-0 px-3 py-5 sm:aspect-auto sm:px-4 sm:py-7"
                  onHoverStart={() => setHoveredIdx(i)}
                  onHoverEnd={() => setHoveredIdx(null)}
                  whileHover={{ backgroundColor: "rgba(23,26,32,1)" }}
                  whileTap={{
                    ...tactileFeedback.whileTap,
                    backgroundColor: "rgba(23,26,32,1)",
                  }}
                  transition={{ duration: 0.25 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  style={{ transitionDelay: `${i * 0.04}s` }}
                >
                  {/* Bottom accent */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: hoveredIdx === i ? "55%" : "18%" }}
                    transition={{ duration: 0.35 }}
                  />

                  {/* Symbol */}
                  <div
                    className="text-[1.35rem] leading-none transition-transform duration-300 group-hover:scale-110 sm:text-[1.4rem]"
                    style={{
                      color: tech.color,
                      ...(tech.bg !== "transparent"
                        ? {
                            background: tech.bg,
                            width: "32px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "4px",
                            fontSize: "0.7rem",
                            fontFamily: "var(--font-jetbrains)",
                            fontWeight: "700",
                          }
                        : {
                            fontFamily:
                              tech.name === "TypeScript" ||
                              tech.name === "REST / GraphQL" ||
                              tech.name === "Framer Motion"
                                ? "var(--font-jetbrains)"
                                : "inherit",
                            fontWeight: "700",
                            fontSize:
                              tech.name === "TypeScript" ? "1rem" : undefined,
                          }),
                    }}
                  >
                    {tech.symbol}
                  </div>

                  {/* Name */}
                  <span
                    className="font-mono-custom max-w-full text-center text-[0.58rem] uppercase tracking-[0.08em] transition-colors duration-300 sm:text-[0.6rem] sm:tracking-[0.1em]"
                    style={{
                      color: hoveredIdx === i ? "#60A5FA" : "#64748B",
                    }}
                  >
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </RevealBlock>

        {/* Extra info line */}
        <RevealBlock delay={0.3}>
          <div className="mt-6 flex items-center gap-3 sm:gap-4">
            <div className="flex-1 h-px bg-white/[0.04]" />
            <p className="font-mono-custom max-w-[68vw] text-center text-[0.58rem] tracking-[0.1em] text-muted/50 sm:max-w-none sm:whitespace-nowrap sm:text-[0.65rem] sm:tracking-[0.12em]">
              STACK EM PRODUÇÃO // HYPER GALAXY
            </p>
            <div className="flex-1 h-px bg-white/[0.04]" />
          </div>
        </RevealBlock>
      </div>
    </ExperienceSection>
  );
}
