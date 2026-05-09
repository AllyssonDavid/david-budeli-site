"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RevealBlock } from "@/components/animations/RevealBlock";
import { Tag } from "@/components/ui/Tag";
import { STACK_DATA } from "@/lib/constants";

export function StackSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="stack" className="relative z-10 section-padding bg-bg-1">
      <div className="max-w-[1200px] mx-auto">
        <RevealBlock>
          <Tag>Tecnologias</Tag>
        </RevealBlock>

        <RevealBlock delay={0.1}>
          <h2
            className="font-display font-extrabold leading-[1.05] tracking-[-0.03em] mb-16"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Stack
            <br />
            <span className="gradient-text">Tecnológica</span>
          </h2>
        </RevealBlock>

        {/* Terminal container */}
        <RevealBlock delay={0.2}>
          <div className="border border-white/[0.05] overflow-hidden bg-bg-0">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-5 py-3 bg-bg-2 border-b border-white/[0.05]">
              <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[#28CA41]" />
              <div className="flex-1" />
              <div className="font-mono-custom text-[0.68rem] text-muted tracking-[0.1em]">
                david@galaxy ~ /tech-stack
              </div>
            </div>

            {/* Stack grid */}
            <div
              className="grid gap-px bg-white/[0.03] p-0"
              style={{
                gridTemplateColumns: "repeat(5, 1fr)",
              }}
            >
              {STACK_DATA.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  className="relative bg-bg-0 flex flex-col items-center justify-center gap-3 py-7 px-4 group cursor-default overflow-hidden"
                  onHoverStart={() => setHoveredIdx(i)}
                  onHoverEnd={() => setHoveredIdx(null)}
                  whileHover={{ backgroundColor: "rgba(23,26,32,1)" }}
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
                    animate={{ width: hoveredIdx === i ? "55%" : 0 }}
                    transition={{ duration: 0.35 }}
                  />

                  {/* Symbol */}
                  <div
                    className="text-[1.4rem] leading-none transition-transform duration-300 group-hover:scale-110"
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
                    className="font-mono-custom text-[0.6rem] tracking-[0.1em] uppercase text-center transition-colors duration-300"
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
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/[0.04]" />
            <p className="font-mono-custom text-[0.65rem] text-muted/50 tracking-[0.12em] whitespace-nowrap">
              STACK EM PRODUÇÃO // HYPER GALAXY ECOSYSTEM
            </p>
            <div className="flex-1 h-px bg-white/[0.04]" />
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
