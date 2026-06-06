"use client";

import { motion } from "framer-motion";
import { RevealBlock } from "@/components/animations/RevealBlock";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { ExperienceTitle } from "@/components/experience/ExperienceTitle";
import { Tag } from "@/components/ui/Tag";
import { MATRIZ_DATA } from "@/lib/constants";
import { premiumEase, tactileFeedback } from "@/components/experience/motionPresets";
import {
  Code2,
  Monitor,
  Layers,
  DollarSign,
  Zap,
  Globe,
  Eye,
  Package,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  code: <Code2 size={20} />,
  monitor: <Monitor size={20} />,
  layers: <Layers size={20} />,
  "dollar-sign": <DollarSign size={20} />,
  zap: <Zap size={20} />,
  globe: <Globe size={20} />,
  eye: <Eye size={20} />,
  package: <Package size={20} />,
};

export function MatrizSection() {
  return (
    <ExperienceSection
      id="matriz"
      className="section-padding bg-bg-1/90"
      tone="green"
    >
      <div className="max-w-[1200px] mx-auto">
        <RevealBlock>
          <Tag>03 / Sistemas</Tag>
        </RevealBlock>

        <RevealBlock delay={0.1}>
          <ExperienceTitle>
            IA, segurança
            <br />
            <span className="gradient-text">e engenharia</span>
          </ExperienceTitle>
        </RevealBlock>

        {/* Grid with single-pixel gaps */}
        <RevealBlock delay={0.2}>
          <div
            className="grid grid-cols-1 gap-px border border-white/[0.04] bg-white/[0.04] min-[520px]:grid-cols-2 lg:grid-cols-4"
          >
            {MATRIZ_DATA.map((item, i) => (
              <motion.div
                key={item.id}
                className="group relative min-h-[190px] cursor-default overflow-hidden bg-bg-1 p-6 sm:p-7 lg:p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.6,
                  delay: (i % 4) * 0.07,
                  ease: premiumEase,
                }}
                whileHover={{ backgroundColor: "rgba(23,26,32,1)" }}
                whileTap={{
                  ...tactileFeedback.whileTap,
                  backgroundColor: "rgba(23,26,32,1)",
                }}
              >
                {/* Top accent line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-violet origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{
                    delay: (i % 4) * 0.05,
                    duration: 0.55,
                    ease: premiumEase,
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="mb-5 flex h-11 w-11 items-center justify-center border border-accent/20 text-accent-bright sm:h-10 sm:w-10"
                  whileHover={{
                    borderColor: "rgba(59,130,246,0.5)",
                    backgroundColor: "rgba(59,130,246,0.07)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {iconMap[item.icon]}
                </motion.div>

                {/* ID */}
                <div className="font-mono-custom mb-3 text-[0.62rem] tracking-[0.15em] text-accent/30">
                  {item.id}
                </div>

                {/* Title */}
                <h3 className="mb-3 font-display text-[1.02rem] font-bold leading-tight text-ice sm:text-[0.98rem]">
                  {item.title}
                </h3>

                {/* Desc */}
                <p className="font-body text-[0.82rem] leading-[1.62] text-muted sm:text-[0.78rem]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </RevealBlock>
      </div>
    </ExperienceSection>
  );
}
