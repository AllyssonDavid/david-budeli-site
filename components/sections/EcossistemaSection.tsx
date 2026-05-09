"use client";

import { motion } from "framer-motion";
import { RevealBlock } from "@/components/animations/RevealBlock";
import { Tag } from "@/components/ui/Tag";
import { ECOSSISTEMA_DATA } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

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
    <section id="ecossistema" className="relative z-10 section-padding bg-bg-0">
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="max-w-[1200px] mx-auto">
        <RevealBlock>
          <Tag>Ecossistema</Tag>
        </RevealBlock>

        <RevealBlock delay={0.1}>
          <h2
            className="font-display font-extrabold leading-[1.05] tracking-[-0.03em] mb-16"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Três pilares.
            <br />
            <span className="gradient-text">Um universo.</span>
          </h2>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ECOSSISTEMA_DATA.map((item, i) => {
            const Icon = EcoIcons[item.id as keyof typeof EcoIcons];

            return (
              <RevealBlock key={item.id} delay={i * 0.12}>
                <motion.div
                  className="relative p-10 bg-bg-1 border border-white/[0.05] overflow-hidden group cursor-pointer h-full"
                  whileHover={{
                    y: -4,
                    borderColor: "rgba(59,130,246,0.25)",
                    transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
                  }}
                >
                  {/* Top border glow */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
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
                  <div className="font-mono-custom text-[0.68rem] text-accent/40 tracking-[0.18em] mb-6">
                    {item.id}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 mb-6 relative z-10">
                    <Icon />
                  </div>

                  {/* Name */}
                  <h3 className="font-display font-extrabold text-[1.5rem] text-white mb-1 relative z-10">
                    {item.name}
                  </h3>

                  {/* Sub */}
                  <p className="font-mono-custom text-[0.68rem] text-accent-bright tracking-[0.12em] uppercase mb-4 relative z-10">
                    {item.sub}
                  </p>

                  {/* Desc */}
                  <p className="font-body font-light text-[0.88rem] text-muted leading-[1.72] relative z-10">
                    {item.desc}
                  </p>

                  {/* Arrow */}
                  <motion.div
                    className="absolute bottom-8 right-8 w-8 h-8 border border-accent/25 rounded-full flex items-center justify-center z-10"
                    initial={{ opacity: 0, x: -8 }}
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
    </section>
  );
}
