"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { RevealBlock } from "@/components/animations/RevealBlock";
import {
  ExperienceSection,
} from "@/components/experience/ExperienceSection";
import { ExperienceTitle } from "@/components/experience/ExperienceTitle";
import { Tag } from "@/components/ui/Tag";
import { CONTACT_DATA } from "@/lib/constants";
import { premiumEase, tactileFeedback } from "@/components/experience/motionPresets";

const contactEmail =
  CONTACT_DATA.find((item) => item.type === "email")?.href.replace("mailto:", "") ??
  "atendimento@davidbudeli.com";

const ContactIcons: Record<string, React.ReactNode> = {
  whatsapp: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
    </svg>
  ),

  instagram: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
    </svg>
  ),

  github: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.4 7.86 10.92.58.1.8-.25.8-.56v-2.16c-3.2.7-3.88-1.36-3.88-1.36-.53-1.33-1.29-1.68-1.29-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .98-.31 3.18 1.18a10.9 10.9 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.79 1.07.79 2.16v3.14c0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  ),

  website: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" />
      <path d="M3.6 9h16.8M3.6 15h16.8M12 3c2.2 2.45 3.3 5.45 3.3 9s-1.1 6.55-3.3 9c-2.2-2.45-3.3-5.45-3.3-9S9.8 5.45 12 3Z" />
    </svg>
  ),

  email: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  ),
};

export function ContatoSection() {
  const [status, setStatus] = useState<"idle" | "missing" | "ready">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const replyTo = String(formData.get("replyTo") ?? "").trim();
    const project = String(formData.get("project") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !replyTo || message.length < 10) {
      setStatus("missing");
      return;
    }

    const subject = encodeURIComponent(`Novo contato davidbudeli.com - ${name}`);
    const body = encodeURIComponent(
      [
        `Nome: ${name}`,
        `Contato: ${replyTo}`,
        `Projeto: ${project || "Nao informado"}`,
        "",
        "Mensagem:",
        message,
      ].join("\n")
    );
    const mailtoHref = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

    form.dataset.submitted = "true";
    form.dataset.mailto = mailtoHref;
    setStatus("ready");
    window.setTimeout(() => {
      window.location.href = mailtoHref;
    }, 120);
  };

  return (
    <ExperienceSection
      id="contato"
      className="section-padding bg-bg-0/94"
      tone="blue"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Closing light band */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[400px] pointer-events-none overflow-hidden"
        style={{
          background:
            "linear-gradient(to top, rgba(59,130,246,0.08), transparent 68%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto w-full">
        <RevealBlock>
          <div className="flex justify-center mb-6">
            <Tag>07 / Contato</Tag>
          </div>
        </RevealBlock>

        {/* CTA headline */}
        <RevealBlock delay={0.1}>
          <ExperienceTitle
            className="mb-10 max-w-full break-words text-[2.8rem] leading-[0.95] min-[375px]:text-5xl sm:mb-14 sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            Vamos conectar
            <br />
            sistemas{" "}
            <span className="gradient-text">
              reais
            </span>
          </ExperienceTitle>
        </RevealBlock>

        <div className="mx-auto grid max-w-[980px] gap-4 text-left lg:grid-cols-[0.9fr_1.1fr]">
          <RevealBlock delay={0.2}>
            <motion.div
              className="relative overflow-hidden border border-white/[0.07] bg-bg-1/80 p-5 backdrop-blur-sm sm:p-6"
              whileHover={{
                y: -3,
                borderColor: "rgba(59,130,246,0.34)",
                boxShadow: "0 24px 70px rgba(59,130,246,0.09)",
                transition: { duration: 0.35, ease: premiumEase },
              }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <p className="font-mono-custom text-[0.62rem] uppercase tracking-[0.22em] text-accent-bright">
                canais oficiais
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                Escolha o canal ou envie um briefing direto. A resposta sai pelo
                caminho mais objetivo.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                {CONTACT_DATA.map((item, i) => (
                  <motion.a
                    key={item.type}
                    href={item.href}
                    target={item.type !== "email" ? "_blank" : undefined}
                    rel={item.type !== "email" ? "noopener noreferrer" : undefined}
                    className="
                      group
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-3
                      border
                      border-white/[0.06]
                      bg-bg-2/80
                      px-4
                      py-3.5
                      font-body
                      text-[0.92rem]
                      text-muted
                      transition-colors
                      duration-300
                      hover:text-ice
                    "
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ delay: 0.26 + i * 0.06, duration: 0.45, ease: premiumEase }}
                    whileTap={{
                      ...tactileFeedback.whileTap,
                      borderColor: "rgba(96,165,250,0.72)",
                    }}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-muted transition-colors duration-300 group-hover:text-accent-bright">
                        {ContactIcons[item.type]}
                      </span>
                      {item.label}
                    </span>
                    <span className="h-px w-8 origin-left scale-x-0 bg-accent/70 transition-transform duration-300 group-hover:scale-x-100" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </RevealBlock>

          <RevealBlock delay={0.28} direction="left" distance={14}>
            <motion.form
              className="relative overflow-hidden border border-white/[0.07] bg-bg-1/70 p-5 backdrop-blur-sm sm:p-6"
              onSubmit={handleSubmit}
              whileHover={{
                borderColor: "rgba(139,92,246,0.32)",
                boxShadow: "0 24px 80px rgba(139,92,246,0.08)",
                transition: { duration: 0.35, ease: premiumEase },
              }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="font-mono-custom text-[0.58rem] uppercase tracking-[0.2em] text-muted">
                    nome
                  </span>
                  <input
                    name="name"
                    autoComplete="name"
                    className="w-full border border-white/[0.07] bg-bg-2/85 px-4 py-3 text-sm text-ice outline-none transition-colors duration-300 placeholder:text-muted/45 focus:border-accent/60"
                    placeholder="David"
                  />
                </label>

                <label className="space-y-2">
                  <span className="font-mono-custom text-[0.58rem] uppercase tracking-[0.2em] text-muted">
                    email ou whatsapp
                  </span>
                  <input
                    name="replyTo"
                    autoComplete="email"
                    className="w-full border border-white/[0.07] bg-bg-2/85 px-4 py-3 text-sm text-ice outline-none transition-colors duration-300 placeholder:text-muted/45 focus:border-accent/60"
                    placeholder="contato@email.com"
                  />
                </label>
              </div>

              <label className="mt-4 block space-y-2">
                <span className="font-mono-custom text-[0.58rem] uppercase tracking-[0.2em] text-muted">
                  projeto
                </span>
                <input
                  name="project"
                  className="w-full border border-white/[0.07] bg-bg-2/85 px-4 py-3 text-sm text-ice outline-none transition-colors duration-300 placeholder:text-muted/45 focus:border-accent/60"
                  placeholder="IA, produto, automacao, seguranca..."
                />
              </label>

              <label className="mt-4 block space-y-2">
                <span className="font-mono-custom text-[0.58rem] uppercase tracking-[0.2em] text-muted">
                  mensagem
                </span>
                <textarea
                  name="message"
                  rows={5}
                  className="min-h-[150px] w-full resize-none border border-white/[0.07] bg-bg-2/85 px-4 py-3 text-sm leading-relaxed text-ice outline-none transition-colors duration-300 placeholder:text-muted/45 focus:border-accent/60"
                  placeholder="O que precisa ser construído?"
                />
              </label>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p
                  className="min-h-5 text-xs text-muted"
                  aria-live="polite"
                >
                  {status === "missing" && "Preencha nome, contato e mensagem."}
                  {status === "ready" && "Email preparado no seu app de email."}
                </p>

                <motion.button
                  type="submit"
                  className="group relative inline-flex min-h-12 items-center justify-center overflow-hidden border border-accent/45 bg-accent/10 px-6 py-3 font-mono-custom text-[0.72rem] uppercase tracking-[0.18em] text-ice"
                  whileTap={tactileFeedback.whileTap}
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative">Enviar briefing</span>
                </motion.button>
              </div>
            </motion.form>
          </RevealBlock>
        </div>

        {/* Decorative separator */}
        <RevealBlock delay={0.5}>
          <div className="mt-20 flex items-center gap-6 max-w-xs mx-auto px-4">
            <div className="flex-1 h-px bg-white/[0.05]" />

            <div className="font-mono-custom text-[0.6rem] text-muted/30 tracking-[0.2em]">
              DB
            </div>

            <div className="flex-1 h-px bg-white/[0.05]" />
          </div>
        </RevealBlock>
      </div>
    </ExperienceSection>
  );
}
