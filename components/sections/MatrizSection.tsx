"use client";

import { motion } from "framer-motion";
import { RevealBlock } from "@/components/animations/RevealBlock";
import { Tag } from "@/components/ui/Tag";
import { MATRIZ_DATA } from "@/lib/constants";
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
    <section id="matriz" className="relative z-10 section-padding bg-bg-1">
      <div className="max-w-[1200px] mx-auto">
        <RevealBlock>
          <Tag>Especialidades</Tag>
        </RevealBlock>

        <RevealBlock delay={0.1}>
          <h2
            className="font-display font-extrabold leading-[1.05] tracking-[-0.03em] mb-16"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Área 
            <br />
            <span className="gradient-text">de atuação</span>
          </h2>
        </RevealBlock>

        {/* Grid with single-pixel gaps */}
        <RevealBlock delay={0.2}>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] border border-white/[0.04]"
          >
            {MATRIZ_DATA.map((item, i) => (
              <motion.div
                key={item.id}
                className="relative bg-bg-1 p-8 overflow-hidden group cursor-default"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.6,
                  delay: (i % 4) * 0.07,
                  ease: [0.23, 1, 0.32, 1],
                }}
                whileHover={{ backgroundColor: "rgba(23,26,32,1)" }}
              >
                {/* Top accent line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-violet origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                />

                {/* Icon */}
                <motion.div
                  className="w-10 h-10 border border-accent/20 flex items-center justify-center text-accent-bright mb-5"
                  whileHover={{
                    borderColor: "rgba(59,130,246,0.5)",
                    backgroundColor: "rgba(59,130,246,0.07)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {iconMap[item.icon]}
                </motion.div>

                {/* ID */}
                <div className="font-mono-custom text-[0.62rem] text-accent/30 tracking-[0.15em] mb-3">
                  {item.id}
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-[0.98rem] text-ice mb-3 leading-tight">
                  {item.title}
                </h3>

                {/* Desc */}
                <p className="font-body text-[0.78rem] text-muted leading-[1.65]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
