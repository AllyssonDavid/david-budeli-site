"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealBlock } from "@/components/animations/RevealBlock";
import { Tag } from "@/components/ui/Tag";
import { PROJETOS_DATA } from "@/lib/constants";
import { ArrowUpRight, Plus } from "lucide-react";

export function ArquiteturasSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="arquiteturas" className="relative z-10 section-padding bg-bg-0">
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="max-w-[1200px] mx-auto">
        <RevealBlock>
          <Tag>Projetos</Tag>
        </RevealBlock>

        <RevealBlock delay={0.1}>
          <h2
            className="font-display font-extrabold leading-[1.05] tracking-[-0.03em] mb-16"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Arquiteturas
            <br />
            <span className="gradient-text">Digitais</span>
          </h2>
        </RevealBlock>

        <div className="flex flex-col">
          {PROJETOS_DATA.map((proj, i) => (
            <motion.div
              key={proj.num}
              className="relative border-b border-white/[0.05] overflow-hidden cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.23, 1, 0.32, 1],
              }}
              onHoverStart={() => setHoveredIdx(i)}
              onHoverEnd={() => setHoveredIdx(null)}
            >
              {/* Hover BG */}
              <AnimatePresence>
                {hoveredIdx === i && (
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

              <div
                className="grid items-center gap-4 sm:gap-8 py-8"
                style={{
                  gridTemplateColumns: "5rem 1fr auto",
                  paddingLeft: hoveredIdx === i ? "1rem" : "0",
                  transition: "padding 0.3s cubic-bezier(0.23,1,0.32,1)",
                }}
              >
                {/* Number */}
                <div className="font-mono-custom text-[0.68rem] text-accent/30 tracking-[0.18em]">
                  {proj.num}
                </div>

                {/* Info */}
                <div>
                  <motion.h3
                    className="font-display font-extrabold leading-none tracking-[-0.02em] mb-3"
                    style={{
                      fontSize: "clamp(1.3rem, 3vw, 1.9rem)",
                      color: hoveredIdx === i ? "#60A5FA" : "#E2E8F0",
                      transition: "color 0.3s",
                    }}
                  >
                    {proj.name}
                  </motion.h3>

                  <div className="flex flex-wrap items-center gap-2">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono-custom text-[0.62rem] text-accent-bright border border-accent/20 px-2 py-[0.18rem] tracking-[0.1em]"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="font-body text-[0.82rem] text-muted hidden sm:inline">
                      {proj.desc}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <motion.div
                  className="w-12 h-12 border border-white/[0.06] rounded-full flex items-center justify-center flex-shrink-0"
                  animate={
                    hoveredIdx === i
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
                        hoveredIdx === i ? "#60A5FA" : "#64748B",
                      transition: "stroke 0.3s",
                    }}
                  />
                </motion.div>
              </div>

              {/* Year tag */}
              <div className="absolute right-14 top-1/2 -translate-y-1/2 font-mono-custom text-[0.62rem] text-muted/40 hidden xl:block">
                {proj.year}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View more hint */}
        <RevealBlock delay={0.4}>
          <div className="mt-12 flex justify-center">
            <button className="flex items-center gap-3 font-mono-custom text-[0.72rem] text-muted hover:text-accent-bright tracking-[0.12em] uppercase transition-colors duration-300 group">
              <span className="w-6 h-6 border border-current rounded-full flex items-center justify-center group-hover:border-accent-bright transition-colors">
                <Plus size={12} />
              </span>
              Ver todos os projetos
            </button>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
