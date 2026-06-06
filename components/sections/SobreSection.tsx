"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RevealBlock } from "@/components/animations/RevealBlock";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { Tag } from "@/components/ui/Tag";
import { premiumEase, tactileFeedback } from "@/components/experience/motionPresets";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const capabilitySignals = [
  "Software Engineering",
  "Cybersecurity",
  "AI Systems",
  "Automation",
  "Founder",
];

const operatingLayers = [
  {
    id: "01",
    title: "Pensamento sistêmico",
    desc: "Cada interface, automação e API existe dentro de uma arquitetura maior.",
  },
  {
    id: "02",
    title: "Produto antes de ferramenta",
    desc: "Tecnologia aplicada para criar clareza, retenção, operação e crescimento.",
  },
  {
    id: "03",
    title: "Execução com profundidade",
    desc: "Da estratégia ao deploy: engenharia, segurança, IA e experiência na mesma direção.",
  },
];

function PortraitSystem() {
  return (
    <RevealBlock direction="left" className="lg:sticky lg:top-28">
      <motion.div
        className="relative mx-auto w-full max-w-[360px] lg:mx-0 lg:max-w-[430px]"
        whileTap={tactileFeedback.whileTap}
      >
        <div
          className="absolute inset-[-1px] z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(96,165,250,0.72), transparent 42%, rgba(139,92,246,0.44))",
            clipPath:
              "polygon(9% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%, 0% 9%)",
          }}
        />

        <div
          className="relative aspect-[4/5] overflow-hidden bg-bg-2"
          style={{
            clipPath:
              "polygon(9% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%, 0% 9%)",
          }}
        >
          <Image
            src="/david-budeli-portrait.jpg"
            alt="Retrato de David Budeli"
            fill
            sizes="(min-width: 1024px) 430px, 90vw"
            className="absolute inset-0 h-full w-full object-cover object-[52%_32%]"
            style={{
              filter: "saturate(0.9) contrast(1.08) brightness(0.78)",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/5 to-bg-0/30" />
          <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(59,130,246,0.22),transparent_42%,rgba(139,92,246,0.2)_78%,transparent)] mix-blend-screen" />
          <div
            className="absolute inset-0 grid-bg-sm opacity-25"
            style={{
              maskImage:
                "radial-gradient(ellipse 82% 78% at 50% 46%, black, transparent)",
            }}
          />

          <motion.div
            className="absolute left-4 top-4 border border-accent/30 bg-bg-0/50 px-3 py-2 backdrop-blur-sm sm:left-6 sm:top-6"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.55, ease: premiumEase }}
          >
            <div className="font-mono-custom text-[0.58rem] uppercase tracking-[0.18em] text-accent-bright">
              DAVID BUDELI
            </div>
            <div className="mt-1 font-mono-custom text-[0.5rem] uppercase tracking-[0.16em] text-muted">
              Founder / Engineer
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-4 left-4 right-4 flex items-center gap-3 sm:bottom-6 sm:left-6 sm:right-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.36, duration: 0.55, ease: premiumEase }}
          >
            <div className="h-px flex-1 bg-gradient-to-r from-accent/80 to-transparent" />
            <span className="font-mono-custom text-[0.52rem] uppercase tracking-[0.18em] text-accent-bright/75">
              live system
            </span>
          </motion.div>

          <div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent"
            style={{ animation: "scanline 4s linear infinite" }}
          />
        </div>

        <motion.div
          className="absolute -bottom-6 right-3 z-20 border border-accent/35 bg-bg-0 px-5 py-4 shadow-[0_18px_55px_rgba(59,130,246,0.14)] sm:-right-8"
          initial={{ opacity: 0, scale: 0.88, y: 8 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.48, duration: 0.6, ease: premiumEase }}
        >
          <div className="font-display text-[2.45rem] font-extrabold leading-none text-accent-bright">
            8+
          </div>
          <div className="mt-1 font-mono-custom text-[0.62rem] uppercase tracking-[0.16em] text-muted">
            anos projetando
          </div>
        </motion.div>
      </motion.div>
    </RevealBlock>
  );
}

export function SobreSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 86%", "end 18%"],
  });
  const statementY = useTransform(scrollYProgress, [0, 1], [34, -34]);
  const railScale = useTransform(scrollYProgress, [0.08, 0.42], [0, 1]);

  return (
    <ExperienceSection
      id="sobre"
      className="section-padding bg-bg-1/90"
      tone="blue"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <motion.div
        className="pointer-events-none absolute left-0 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-accent/70 via-violet/30 to-transparent lg:block"
        style={{ scaleY: reduced ? 1 : railScale }}
      />

      <div ref={sectionRef} className="mx-auto max-w-[1220px]">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <PortraitSystem />

          <div className="relative z-10">
            <RevealBlock>
              <Tag>01 / Arquitetura pessoal</Tag>
            </RevealBlock>

            <motion.div
              style={{ y: reduced ? 0 : statementY }}
              className="mt-8"
            >
              <RevealBlock delay={0.08}>
                <p className="font-mono-custom mb-5 text-[0.66rem] uppercase tracking-[0.18em] text-accent-bright/80">
                  Software Engineer / Cybersecurity / AI Systems
                </p>
              </RevealBlock>

              <RevealBlock delay={0.12}>
                <h2 className="font-display max-w-[780px] text-[2rem] font-extrabold leading-[0.96] tracking-normal text-ice min-[375px]:text-[2.18rem] sm:text-[4.2rem] lg:text-[5.6rem]">
                  Arquitetando
                  <br />
                  <span className="gradient-text">
                    sistemas
                    <br />
                    digitais.
                  </span>
                </h2>
              </RevealBlock>

              <RevealBlock delay={0.2}>
                <p className="mt-7 max-w-[680px] font-body text-[1rem] font-light leading-[1.78] text-muted sm:text-[1.08rem]">
                  O trabalho não é apenas escrever código. É desenhar ambientes
                  onde produto, segurança, automação, IA e infraestrutura se
                  organizam como um sistema coerente.
                </p>
              </RevealBlock>
            </motion.div>

            <RevealBlock delay={0.26}>
              <div className="mt-8 flex flex-wrap gap-2">
                {capabilitySignals.map((signal, index) => (
                  <motion.span
                    key={signal}
                    className="border border-accent/20 bg-white/[0.025] px-3 py-2 font-mono-custom text-[0.58rem] uppercase tracking-[0.13em] text-accent-bright/85"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.05 * index,
                      duration: 0.42,
                      ease: premiumEase,
                    }}
                  >
                    {signal}
                  </motion.span>
                ))}
              </div>
            </RevealBlock>
          </div>
        </div>

        <RevealBlock delay={0.34}>
          <div className="grid border-y border-white/[0.06] lg:grid-cols-3">
            {operatingLayers.map((layer, index) => (
              <motion.div
                key={layer.id}
                className="relative min-h-[190px] border-white/[0.06] px-0 py-7 lg:border-r lg:px-8 lg:last:border-r-0"
                whileTap={tactileFeedback.whileTap}
              >
                <motion.div
                  className="absolute left-0 top-0 h-px w-full origin-left bg-gradient-to-r from-accent/70 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.72,
                    ease: premiumEase,
                  }}
                />
                <div className="font-mono-custom mb-5 text-[0.62rem] tracking-[0.18em] text-accent/50">
                  {layer.id}
                </div>
                <h3 className="mb-3 font-display text-[1.35rem] font-bold leading-tight text-ice">
                  {layer.title}
                </h3>
                <p className="max-w-[330px] font-body text-[0.88rem] leading-[1.68] text-muted">
                  {layer.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </RevealBlock>
      </div>
    </ExperienceSection>
  );
}
