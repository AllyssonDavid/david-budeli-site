"use client";

import { motion } from "framer-motion";
import { RevealBlock } from "@/components/animations/RevealBlock";
import { Tag } from "@/components/ui/Tag";

const pillars = [
  { title: "Visão Sistêmica", desc: "Arquiteturas que pensam à frente" },
  { title: "Alta Performance", desc: "Código que escala sem limites" },
  { title: "IA & Automação", desc: "Sistemas que aprendem e evoluem" },
  { title: "Ecossistemas", desc: "Produtos que se retroalimentam" },
];

export function SobreSection() {
  return (
    <section
      id="sobre"
      className="relative z-10 section-padding bg-bg-1"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Visual */}
          <RevealBlock direction="left" className="hidden lg:block">
            <div className="relative max-w-[420px]">
              {/* Outer border gradient */}
              <div
                className="absolute inset-[-1px] z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(59,130,246,0.5), transparent 50%, rgba(139,92,246,0.3))",
                  clipPath:
                    "polygon(8% 0%, 100% 0%, 100% 92%, 92% 100%, 0% 100%, 0% 8%)",
                }}
              />

              {/* Inner box */}
              <div
                className="relative aspect-square bg-bg-2 overflow-hidden"
                style={{
                  clipPath:
                    "polygon(8% 0%, 100% 0%, 100% 92%, 92% 100%, 0% 100%, 0% 8%)",
                }}
              >
                {/* Avatar placeholder / grid art */}
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(139,92,246,0.1))",
                  }}
                >
                  <div
                    className="absolute inset-0 grid-bg-sm opacity-40"
                    style={{
                      maskImage:
                        "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
                    }}
                  />
                  <span
                    className="font-display font-extrabold text-[8rem] leading-none text-white/[0.04] select-none"
                    aria-hidden
                  >
                    DB
                  </span>
                </div>

                {/* Scanline effect */}
                <div
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent pointer-events-none"
                  style={{ animation: "scanline 4s linear infinite" }}
                />
              </div>

              {/* Badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-bg-1 border border-accent/30 px-5 py-4 z-20"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              >
                <div
                  className="font-display font-extrabold text-[2.4rem] leading-none"
                  style={{
                    background: "linear-gradient(135deg, #60A5FA, #8B5CF6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  8+
                </div>
                <div className="font-mono-custom text-[0.68rem] text-muted uppercase tracking-[0.1em] mt-1">
                  Anos de Engenharia
                </div>
              </motion.div>
            </div>
          </RevealBlock>

          {/* Text content */}
          <div>
            <RevealBlock delay={0}>
              <Tag>Perfil</Tag>
            </RevealBlock>

            <RevealBlock delay={0.1}>
              <h2
                className="font-display font-extrabold leading-[1.05] tracking-[-0.03em] mb-6"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                Construindo o
                <br />
                <span className="gradient-text">futuro digital</span>
              </h2>
            </RevealBlock>

            <RevealBlock delay={0.2}>
              <p className="font-body font-light text-[1.02rem] text-muted leading-[1.82] mb-5">
                David Budeli é engenheiro de software, fundador e estrategista
                digital com foco em criar ecossistemas tecnológicos de impacto
                global. Sua atuação vai além do código — ele arquiteta soluções
                que transformam visões em realidade operacional.
              </p>
            </RevealBlock>

            <RevealBlock delay={0.3}>
              <p className="font-body font-light text-[1.02rem] text-muted leading-[1.82] mb-8">
                Com mentalidade de fundador e execução de engenheiro, David
                constrói sistemas distribuídos, plataformas inteligentes e
                produtos digitais que escalam. Da concepção à produção, cada
                linha de código carrega intenção estratégica.
              </p>
            </RevealBlock>

            {/* Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {pillars.map((p, i) => (
                <RevealBlock key={p.title} delay={0.35 + i * 0.08}>
                  <motion.div
                    className="px-5 py-4 border border-white/[0.05] border-l-2 border-l-accent/50 bg-white/[0.02] group cursor-default"
                    whileHover={{
                      borderLeftColor: "rgba(59,130,246,0.9)",
                      backgroundColor: "rgba(59,130,246,0.04)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="font-display font-bold text-[0.88rem] text-ice mb-1">
                      {p.title}
                    </div>
                    <div className="font-body text-[0.78rem] text-muted">
                      {p.desc}
                    </div>
                  </motion.div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
