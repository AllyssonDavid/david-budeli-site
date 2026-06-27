"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Bot,
  ChevronRight,
  Cpu,
  Gauge,
  Github,
  Globe,
  Instagram,
  Layers3,
  Mail,
  Menu,
  Network,
  Radio,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { CSSProperties, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  v2Capabilities,
  v2Cases,
  v2ContactLinks,
  v2NavItems,
  type V2Case,
} from "@/lib/v2-data";
import { DBIconTile, DBMonogram } from "@/components/v2/DBBrand";
import { cn } from "@/lib/utils";

type SectionId = "hero" | "positioning" | "cases" | "system" | "contact";

function scrollToTarget(href: string) {
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useMagnetic<T extends HTMLElement>(strength = 0.18) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) * strength;
      const y = (event.clientY - (rect.top + rect.height / 2)) * strength;

      gsap.to(el, { x, y, duration: 0.32, ease: "power3.out" });
    };

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.62, ease: "elastic.out(1, 0.45)" });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return ref;
}

function SplitWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");

  return (
    <span data-v2-split className={cn("v2-split", className)} aria-label={text}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="v2-word-clip" aria-hidden="true">
          <span data-v2-word className="v2-word">
            {word}
            {index < words.length - 1 ? "\u00a0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}

function MagneticAnchor({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const ref = useMagnetic<HTMLAnchorElement>();

  return (
    <a
      ref={ref}
      href={href}
      onClick={(event) => {
        if (href.startsWith("#")) {
          event.preventDefault();
          scrollToTarget(href);
        }
      }}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
      data-cursor-hover
    >
      {children}
    </a>
  );
}

function V2Navigation({
  activeSection,
  onNavigate,
}: {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (href: string) => {
    setOpen(false);
    const id = href.replace("#", "") as SectionId;
    onNavigate(id);
    scrollToTarget(href);
  };

  return (
    <>
      <header data-nav-shell className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
        <nav className="mx-auto flex h-14 max-w-[1180px] items-center justify-between border border-white/[0.08] bg-black/58 px-2.5 backdrop-blur-2xl sm:h-16 sm:px-3">
          <button
            type="button"
            onClick={() => handleNav("#hero")}
            className="group flex h-10 w-10 items-center justify-center text-left sm:h-11 sm:w-11"
            aria-label="Voltar para o topo"
          >
            <DBIconTile className="h-10 w-10 rounded-[10px] transition-colors group-hover:border-[var(--v2-accent)] sm:h-11 sm:w-11" />
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {v2NavItems.map((item) => {
              const id = item.href.replace("#", "") as SectionId;
              const isActive = activeSection === id;

              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleNav(item.href)}
                  className={cn(
                    "h-10 px-3 font-mono-custom text-[0.62rem] uppercase transition-colors",
                    isActive ? "text-white" : "text-white/42 hover:text-white/78"
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleNav("#contact")}
              className="hidden h-10 items-center gap-2 border border-white/[0.1] bg-white/[0.04] px-3 font-body text-[0.78rem] font-medium text-white transition-colors hover:border-[var(--v2-accent)] hover:bg-white/[0.07] sm:flex"
            >
              Conversar
              <ArrowUpRight size={14} />
            </button>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="grid h-10 w-10 place-items-center border border-white/[0.1] bg-white/[0.04] text-white md:hidden"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      <div className="pointer-events-none fixed inset-x-3 bottom-3 z-40 md:hidden">
        <div className="pointer-events-auto mx-auto grid max-w-[420px] grid-cols-3 border border-white/[0.08] bg-black/70 p-1 backdrop-blur-2xl">
          {[
            { label: "Cases", href: "#cases", icon: Layers3 },
            { label: "Sistema", href: "#system", icon: Cpu },
            { label: "Contato", href: "#contact", icon: Radio },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNav(item.href)}
                className="flex h-12 items-center justify-center gap-1.5 text-[0.7rem] font-medium text-white/72 transition-colors hover:text-white"
              >
                <Icon size={14} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-40 bg-black/96 px-5 pb-6 pt-24 backdrop-blur-2xl md:hidden">
          <div className="absolute inset-0 v2-ambient-surface opacity-70" aria-hidden="true" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="space-y-2">
              {v2NavItems.map((item, index) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleNav(item.href)}
                  className="flex w-full items-center justify-between border-b border-white/[0.08] py-5 text-left font-display text-[2rem] font-bold leading-none text-white"
                >
                  {item.label}
                  <span className="font-mono-custom text-[0.68rem] text-white/32">
                    0{index + 1}
                  </span>
                </button>
              ))}
            </div>
            <a
              href="https://wa.me/5541999360874"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-between border border-[var(--v2-accent)] bg-[var(--v2-accent)] px-4 text-sm font-semibold text-black"
            >
              Iniciar projeto
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}

function ResponsiveBackdrop() {
  return (
    <div
      data-responsive-backdrop
      className="v2-responsive-backdrop pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        data-backdrop-base
        className="absolute inset-x-[-18%] top-[-16%] h-[128svh]"
      />
      <div
        data-backdrop-light
        data-mouse-layer="0.018"
        className="absolute left-[-34%] top-[-8%] h-[76svh] w-[138vw] rotate-[-12deg]"
      />
      <div
        data-backdrop-field
        data-mouse-layer="0.012"
        className="absolute bottom-[-28%] right-[-32%] h-[82svh] w-[132vw] rotate-[9deg]"
      />
      <div
        data-backdrop-band
        data-mouse-layer="0.035"
        className="absolute inset-x-[-14%] top-[18%] h-[34svh] rotate-[-5deg]"
      />
      <div data-backdrop-veil className="absolute inset-0 opacity-0" />
      <div
        data-backdrop-depth
        className="absolute inset-x-0 bottom-0 h-[46svh]"
      />
      <div data-backdrop-texture className="absolute inset-0 opacity-[0.16]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.56),transparent_24%,transparent_70%,rgba(0,0,0,0.76))]" />
    </div>
  );
}

function V2LoadingScreen({ done }: { done: boolean }) {
  return (
    <div
      data-v2-loader
      className={cn(
        "fixed inset-0 z-[120] grid place-items-center bg-[#030303] transition-[visibility] duration-500",
        done ? "invisible pointer-events-none" : "pointer-events-auto"
      )}
      aria-hidden={done}
    >
      <div className="absolute inset-0 v2-ambient-surface opacity-55" />
      <div className="relative flex flex-col items-center gap-6">
        <div
          data-loader-mark
          className="grid h-24 w-24 place-items-center rounded-[24px] border border-white/[0.12] bg-white/[0.035] shadow-[0_24px_100px_rgba(0,0,0,0.46)]"
        >
          <DBMonogram className="w-[76%]" />
        </div>
        <div className="h-px w-36 overflow-hidden bg-white/[0.08]">
          <span data-loader-line className="block h-full w-full origin-left bg-[var(--v2-accent)]" />
        </div>
        <p className="font-mono-custom text-[0.62rem] uppercase text-white/42">
          Building systems that scale
        </p>
      </div>
    </div>
  );
}

function HeroSection() {
  const domains = ["Sites premium", "IA aplicada", "Automação", "Sistemas"];
  const signals = [
    ["Produto", "Sites, sistemas e jornadas com foco em conversão"],
    ["IA", "Automações e agentes conectados à operação"],
    ["Escala", "Performance, segurança e base para crescer"],
  ];

  return (
    <section
      id="hero"
      data-v2-section="hero"
      data-v2-theme="hyper-galaxy"
      className="relative z-10 flex min-h-[100svh] items-center overflow-hidden px-4 pb-[calc(5rem+env(safe-area-inset-bottom))] pt-24 sm:px-6 lg:px-[5vw]"
    >
      <div data-hero-band className="pointer-events-none absolute inset-x-[-8%] top-[26%] h-[26svh] -rotate-3 bg-white/[0.025] blur-xl" />
      <div className="relative mx-auto grid w-full max-w-[1180px] gap-10 lg:grid-cols-[minmax(0,0.74fr)_minmax(280px,0.26fr)] lg:items-end">
        <div>
          <div
            data-hero-eyebrow
            className="mb-7 inline-flex items-center gap-2 border border-white/[0.08] bg-white/[0.03] px-3 py-2 font-mono-custom text-[0.62rem] uppercase text-white/58 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 bg-[var(--v2-accent)]" />
            David Budeli / Produto, IA e Automação
          </div>

          <h1
            data-hero-title
            className="max-w-[760px] font-display text-[3.05rem] font-bold leading-[0.94] text-white min-[390px]:text-[3.35rem] sm:text-[5.25rem] sm:leading-[0.92] lg:text-[6.45rem]"
          >
            <SplitWords text="Produto. IA. Conversão." />
          </h1>

          <div className="mt-7 grid gap-6 lg:grid-cols-[0.76fr_0.24fr] lg:items-end">
            <p
              data-hero-copy
              className="max-w-[610px] text-[1rem] font-light leading-[1.58] text-white/66 sm:text-[1.14rem] sm:leading-[1.66]"
            >
              Crio sites, sistemas e automações com foco em performance, IA e conversão.
            </p>

            <div data-hero-note className="space-y-3 border-l border-white/[0.1] pl-4 lg:max-w-[260px]">
              <p className="font-mono-custom text-[0.62rem] uppercase text-white/35">
                Sites / Sistemas / IA / Automação
              </p>
              <p className="text-[0.95rem] leading-[1.65] text-white/50">
                Construção técnica para vender, operar e escalar.
              </p>
            </div>
          </div>

          <div data-hero-domains className="mt-7 flex flex-wrap gap-2">
            {domains.map((domain) => (
              <span
                key={domain}
                className="border border-white/[0.08] bg-white/[0.025] px-3 py-2 font-mono-custom text-[0.62rem] uppercase text-white/50"
              >
                {domain}
              </span>
            ))}
          </div>

          <div data-hero-actions className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticAnchor
              href="https://wa.me/5541999360874"
              external
              className="group relative z-20 flex h-14 items-center justify-center gap-2 border border-[var(--v2-accent)] bg-[var(--v2-accent)] px-5 text-sm font-semibold text-black transition-transform"
            >
              Iniciar conversa
              <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticAnchor>
            <button
              type="button"
              onClick={() => scrollToTarget("#cases")}
              className="group relative z-20 flex h-14 items-center justify-center gap-2 border border-white/[0.1] bg-white/[0.035] px-5 text-sm font-medium text-white transition-colors hover:border-white/[0.22] hover:bg-white/[0.06]"
              data-cursor-hover
            >
              Ver cases premium
              <ChevronRight size={17} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div
            data-hero-profile
            className="mt-8 overflow-hidden border border-white/[0.08] bg-black/24 p-2 backdrop-blur-xl lg:hidden"
          >
            <div className="relative h-[310px] overflow-hidden bg-black">
              <Image
                src="/david-budeli-profile.jpg"
                alt="Foto de perfil de David Budeli"
                fill
                priority
                sizes="(max-width: 1023px) 92vw, 360px"
                className="object-cover object-[50%_30%]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.66),transparent_50%,rgba(0,0,0,0.06))]" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono-custom text-[0.55rem] uppercase text-white/52">
                    Perfil
                  </p>
                  <p className="mt-1 font-display text-[1.35rem] font-bold leading-none text-white">
                    David Budeli
                  </p>
                </div>
                <span className="border border-white/[0.12] bg-black/42 px-2 py-1 font-mono-custom text-[0.52rem] uppercase text-white/62 backdrop-blur">
                  Product Engineer
                </span>
              </div>
            </div>
          </div>
        </div>

        <aside
          data-hero-panel
          className="hidden border border-white/[0.08] bg-black/24 p-4 backdrop-blur-xl lg:block"
        >
          <div data-hero-portrait className="relative mb-4 h-[340px] overflow-hidden border border-white/[0.08] bg-black">
            <Image
              src="/david-budeli-profile.jpg"
              alt="Foto de perfil de David Budeli"
              fill
              priority
              sizes="360px"
              className="object-cover object-[50%_28%]"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.66),transparent_52%,rgba(0,0,0,0.08))]" />
            <div className="absolute bottom-3 left-3 right-3">
              <p className="font-mono-custom text-[0.55rem] uppercase text-white/52">
                Perfil
              </p>
              <p className="mt-1 font-display text-[1.45rem] font-bold leading-none text-white">
                David Budeli
              </p>
            </div>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono-custom text-[0.6rem] uppercase text-[var(--v2-accent)]">
              Product layer
            </span>
            <span className="font-mono-custom text-[0.6rem] uppercase text-white/34">
              2026
            </span>
          </div>
          <div className="space-y-3">
            {signals.map(([label, body], index) => (
              <div key={label} className="border border-white/[0.07] bg-white/[0.03] p-3">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-px flex-1 bg-white/[0.1]" />
                  <span className="font-mono-custom text-[0.58rem] text-white/34">
                    0{index + 1}
                  </span>
                </div>
                <p className="font-display text-[1.2rem] font-bold leading-none text-white">
                  {label}
                </p>
                <p className="mt-2 text-[0.82rem] leading-[1.55] text-white/48">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function PositioningSection() {
  const frames = [
    {
      label: "01 / Reposicionamento",
      title: "De página para produto digital.",
      body: "A presença digital vira uma jornada clara para apresentar valor, gerar confiança e iniciar conversa.",
      icon: Network,
    },
    {
      label: "02 / IA aplicada",
      title: "IA aplicada à operação.",
      body: "Agentes, integrações e automações reduzem trabalho manual e conectam tecnologia ao dia a dia da empresa.",
      icon: Bot,
    },
    {
      label: "03 / Conversão",
      title: "Experiência que conduz demanda.",
      body: "Motion, hierarquia e conteúdo trabalham juntos para levar o visitante dos cases ao contato.",
      icon: Sparkles,
    },
  ];

  return (
    <section
      id="positioning"
      data-v2-section="positioning"
      data-v2-theme="hyperpag"
      className="relative z-10 min-h-0 px-4 pb-[calc(4rem+env(safe-area-inset-bottom))] pt-16 sm:px-6 sm:py-24 md:h-[240svh] md:py-0 lg:px-[5vw]"
    >
      <div data-positioning-pin className="flex min-h-0 items-start overflow-visible py-0 md:h-[100svh] md:items-center md:py-24">
        <div className="mx-auto grid w-full max-w-[1180px] gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-center">
          <div data-first-copy>
            <p data-v2-blur className="font-mono-custom text-[0.66rem] uppercase text-[var(--v2-accent)]">
              Primeira scrollada
            </p>
            <h2
              data-v2-mask
              className="mt-4 max-w-[720px] font-display text-[2.28rem] font-bold leading-[1.02] text-white min-[390px]:text-[2.55rem] sm:text-[4.3rem]"
            >
              Da presença digital à operação real.
            </h2>
            <p data-v2-blur className="mt-5 max-w-[520px] text-[0.98rem] leading-[1.65] text-white/60">
              Cada seção revela uma camada: produto, IA, automação e conversão trabalhando juntas.
            </p>
          </div>

          <div className="relative grid gap-3 md:block md:h-[500px]">
            {frames.map((frame, index) => {
              const Icon = frame.icon;
              return (
                <article
                  key={frame.title}
                  data-story-card
                  className="relative flex min-h-[268px] flex-col justify-between border border-white/[0.08] bg-black/38 p-5 backdrop-blur-2xl md:absolute md:inset-0 md:min-h-0 sm:p-8"
                  style={{ zIndex: frames.length - index }}
                >
                  <div>
                    <div className="mb-7 flex items-center justify-between sm:mb-10">
                      <span className="font-mono-custom text-[0.62rem] uppercase text-white/42">
                        {frame.label}
                      </span>
                      <span className="grid h-10 w-10 place-items-center border border-white/[0.1] bg-white/[0.035] text-[var(--v2-accent)]">
                        <Icon size={18} />
                      </span>
                    </div>
                    <h3 className="max-w-[620px] font-display text-[1.82rem] font-bold leading-[1.03] text-white min-[390px]:text-[2.05rem] sm:text-[3.2rem]">
                      {frame.title}
                    </h3>
                    <p className="mt-4 max-w-[520px] text-[0.94rem] leading-[1.62] text-white/60 sm:mt-5 sm:text-[0.98rem] sm:leading-[1.7]">
                      {frame.body}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {["Produto", "Infra", "Execução"].map((item, itemIndex) => (
                      <div
                        key={item}
                        className={cn(
                          "h-12 border border-white/[0.08] bg-white/[0.025] px-2 py-2",
                          itemIndex === index && "border-[var(--v2-accent)] bg-white/[0.06]"
                        )}
                      >
                        <div className="h-1 w-8 bg-[var(--v2-accent)]" />
                        <p className="mt-2 truncate font-mono-custom text-[0.55rem] uppercase text-white/48">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const caseImageLabels: Record<V2Case["imageMode"], string[]> = {
  command: ["Command", "Signals", "Orbit"],
  payments: ["Checkout", "Risk", "Ledger"],
  studio: ["Brand", "Agents", "Launch"],
  personal: ["Clients", "Habits", "Progress"],
  beauty: ["Studio", "Schedule", "Care"],
  fitness: ["Plans", "Proof", "Leads"],
  media: ["SEO", "Topics", "Traffic"],
};

function CaseArtwork({ project }: { project: V2Case }) {
  const labels = caseImageLabels[project.imageMode];

  return (
    <figure
      data-case-visual
      className="relative min-h-[330px] overflow-hidden border border-white/[0.08] bg-black/28 p-3 sm:min-h-[430px] sm:p-4"
      aria-label={`Visual do case ${project.name}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-95"
        style={{
          background: `linear-gradient(140deg, ${project.dark} 0%, transparent 46%, rgba(255,255,255,0.045) 70%, ${project.soft} 100%)`,
        }}
      />
      <div className="relative flex h-full min-h-[306px] flex-col justify-between sm:min-h-[398px]">
        <div className="flex items-center justify-between">
          <span className="border border-white/[0.1] bg-black/34 px-2 py-1 font-mono-custom text-[0.58rem] uppercase text-white/58">
            {project.category}
          </span>
          <span className="font-mono-custom text-[0.62rem] text-white/34">{project.year}</span>
        </div>

        <div className="relative mx-auto my-5 w-full max-w-[390px]">
          <div className="relative overflow-hidden border border-white/[0.11] bg-black/42 p-2 shadow-[0_30px_80px_rgba(0,0,0,0.36)]">
            <div className="mb-2 flex h-6 items-center gap-1.5 border border-white/[0.06] bg-white/[0.035] px-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/22" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/12" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/12" />
              <span className="ml-auto max-w-[155px] truncate font-mono-custom text-[0.48rem] uppercase text-white/32">
                {project.slug}
              </span>
            </div>

            {project.screenshot ? (
              <div
                data-progressive-image
                className="relative min-h-[235px] overflow-hidden border border-white/[0.07] bg-black sm:min-h-[292px]"
              >
                <Image
                  src={project.screenshot}
                  alt={`Screenshot do projeto ${project.name}`}
                  fill
                  priority={project.index === "01"}
                  sizes="(max-width: 768px) 88vw, 460px"
                  className="object-cover object-top transition-transform duration-700"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.48),transparent_58%,rgba(0,0,0,0.08))]" />
                <div data-image-mask className="pointer-events-none absolute inset-0 bg-[var(--case-accent)]" />
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-4">
                  <div>
                    <span className="font-mono-custom text-[0.52rem] uppercase text-white/50">
                      Live capture
                    </span>
                    <p className="mt-1 max-w-[240px] truncate font-display text-[1.18rem] font-bold text-white">
                      {project.name}
                    </p>
                  </div>
                  <span className="border border-white/[0.12] bg-black/42 px-2 py-1 font-mono-custom text-[0.5rem] uppercase text-white/62 backdrop-blur">
                    {project.metric}
                  </span>
                </div>
              </div>
            ) : (
              <div className="grid min-h-[235px] grid-cols-[1fr_0.74fr] gap-2 sm:min-h-[292px]">
                <div className="flex flex-col justify-between border border-white/[0.07] bg-white/[0.035] p-3">
                  <div>
                    <span className="block h-1.5 w-12 bg-[var(--case-accent)]" />
                    <p className="mt-5 font-display text-[2.35rem] font-bold leading-none text-white">
                      {project.metric}
                    </p>
                    <p className="mt-2 font-mono-custom text-[0.55rem] uppercase text-white/36">
                      {project.metricLabel}
                    </p>
                  </div>
                  <div className="space-y-2">
                    {project.systems.map((system) => (
                      <div key={system} className="flex items-center gap-2">
                        <span className="h-px flex-1 bg-white/[0.12]" />
                        <span className="max-w-[92px] truncate font-mono-custom text-[0.5rem] uppercase text-white/42">
                          {system}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  {labels.map((label, index) => (
                    <div key={label} className="border border-white/[0.07] bg-black/32 p-2">
                      <span
                        className="block h-1 bg-[var(--case-accent)]"
                        style={{ width: `${52 + index * 18}%` }}
                      />
                      <p className="mt-3 font-mono-custom text-[0.54rem] uppercase text-white/50">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {project.systems.map((system) => (
            <div key={system} className="border border-white/[0.07] bg-white/[0.025] p-2">
              <span className="block h-1 w-8 bg-[var(--case-accent)]" />
              <p className="mt-2 truncate font-mono-custom text-[0.52rem] uppercase text-white/42">
                {system}
              </p>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}

function CasePanel({ project }: { project: V2Case }) {
  const style = {
    "--case-accent": project.accent,
    "--case-accent-two": project.accent2,
    "--case-soft": project.soft,
    "--case-dark": project.dark,
  } as CSSProperties;

  return (
    <article
      data-case-panel
      data-v2-theme={project.slug}
      className="v2-case-panel group relative flex min-h-[82svh] w-full shrink-0 flex-col justify-between overflow-hidden border border-white/[0.08] bg-white/[0.035] p-4 backdrop-blur-xl sm:min-h-[78svh] sm:p-5 lg:w-[920px] lg:p-6"
      style={style}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-88"
        style={{
          background: `linear-gradient(135deg, ${project.dark} 0%, rgba(0,0,0,0.5) 48%, ${project.soft} 100%)`,
        }}
      />
      <div className="v2-hover-morph pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 grid gap-6 lg:grid-cols-[0.86fr_1fr] lg:items-stretch">
        <div className="flex flex-col justify-between">
          <div>
            <div className="mb-8 flex items-center justify-between">
              <span className="font-mono-custom text-[0.62rem] uppercase text-white/40">
                Case {project.index}
              </span>
              <span className="border border-white/[0.08] bg-black/22 px-2 py-1 font-mono-custom text-[0.58rem] uppercase text-white/48">
                {project.role}
              </span>
            </div>
            <p className="font-mono-custom text-[0.64rem] uppercase text-[var(--case-accent)]">
              {project.category}
            </p>
            <h3 className="mt-4 font-display text-[2.35rem] font-bold leading-[0.96] text-white min-[390px]:text-[2.75rem] sm:text-[4rem]">
              {project.name}
            </h3>
            <p className="mt-5 text-[1rem] leading-[1.72] text-white/62 sm:text-[1.08rem]">
              {project.premise}
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <p className="font-mono-custom text-[0.62rem] uppercase text-[var(--case-accent)]">
                Resultado
              </p>
              <p className="mt-2 text-[0.95rem] leading-[1.68] text-white/58">
                {project.result}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="border border-white/[0.09] bg-black/22 px-2.5 py-1.5 font-mono-custom text-[0.58rem] uppercase text-white/50"
                >
                  {item}
                </span>
              ))}
            </div>
            <MagneticAnchor
              href={project.href}
              external={!project.href.startsWith("#")}
              className="relative z-20 inline-flex h-12 items-center justify-center gap-2 border border-white/[0.1] bg-white/[0.04] px-4 text-sm font-semibold text-white transition-colors hover:border-[var(--case-accent)] hover:bg-white/[0.07]"
            >
              {project.buttonLabel}
              <ArrowUpRight size={16} />
            </MagneticAnchor>
          </div>
        </div>

        <CaseArtwork project={project} />
      </div>
    </article>
  );
}

function CasesSection() {
  return (
    <section
      id="cases"
      data-v2-section="cases"
      className="relative z-10 px-4 py-20 sm:px-6 sm:py-28 lg:px-[5vw]"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <div>
            <p data-v2-blur className="font-mono-custom text-[0.66rem] uppercase text-[var(--v2-accent)]">
              Premium case systems
            </p>
            <h2 className="mt-4 font-display text-[2.65rem] font-bold leading-[0.98] text-white min-[390px]:text-[3rem] sm:text-[4.7rem]">
              <SplitWords text="Sete identidades. Um padrão de engenharia." />
            </h2>
          </div>
          <p data-v2-blur className="max-w-[620px] text-[1rem] leading-[1.76] text-white/58">
            Cada projeto aparece como estudo de caso com visual próprio, stack, link e
            uma transição de scroll. Nada de grade estática: o usuário percorre um produto.
          </p>
        </div>
      </div>

      <div data-case-gallery className="relative -mx-4 overflow-hidden sm:-mx-6 lg:-mx-[5vw]">
        <div
          data-case-track
          className="flex flex-col gap-4 px-4 sm:gap-5 sm:px-6 lg:w-max lg:flex-row lg:gap-5 lg:px-[5vw]"
        >
          {v2Cases.map((project) => (
            <CasePanel key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SystemSection() {
  return (
    <section
      id="system"
      data-v2-section="system"
      data-v2-theme="hyperag"
      className="relative z-10 px-4 py-20 sm:px-6 sm:py-28 lg:px-[5vw]"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p data-v2-blur className="font-mono-custom text-[0.66rem] uppercase text-[var(--v2-accent)]">
              Operating model
            </p>
            <h2 className="mt-4 font-display text-[2.55rem] font-bold leading-[1] text-white min-[390px]:text-[3rem] sm:text-[4.6rem]">
              <SplitWords text="A marca pessoal vira um sistema operacional." />
            </h2>
            <p data-v2-blur className="mt-6 max-w-[560px] text-[1rem] leading-[1.76] text-white/58">
              A percepção premium nasce quando produto, engenharia, automação, dados e
              marca trabalham juntos. O site vira uma interface para autoridade e demanda.
            </p>
          </div>

          <div className="space-y-3">
            {v2Capabilities.map((item, index) => {
              const icons = [Layers3, Bot, ShieldCheck, Gauge];
              const Icon = icons[index] ?? Layers3;

              return (
                <article
                  key={item.label}
                  data-card-reveal
                  className="group border border-white/[0.08] bg-white/[0.035] p-4 backdrop-blur-xl sm:p-5"
                >
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center border border-white/[0.09] bg-black/24 text-[var(--v2-accent)] transition-colors group-hover:border-[var(--v2-accent)]">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="font-mono-custom text-[0.6rem] uppercase text-white/36">
                        {item.label}
                      </p>
                      <h3 className="mt-2 font-display text-[1.55rem] font-bold leading-[1.08] text-white sm:text-[2rem]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-[0.95rem] leading-[1.68] text-white/54">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const contactIcons = [Globe, Github, Instagram, Radio, Mail];

  return (
    <section
      id="contact"
      data-v2-section="contact"
      data-v2-theme="hyperag"
      className="relative z-10 px-4 pb-28 pt-16 sm:px-6 sm:pb-16 lg:px-[5vw]"
    >
      <div data-footer-reveal className="mx-auto max-w-[1180px] overflow-hidden border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-2xl sm:p-8 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.74fr] lg:items-end">
          <div>
            <p data-v2-blur className="font-mono-custom text-[0.66rem] uppercase text-[var(--v2-accent)]">
              Selective builds
            </p>
            <h2 className="mt-4 max-w-[860px] font-display text-[2.55rem] font-bold leading-[0.98] text-white min-[390px]:text-[3rem] sm:text-[4.8rem]">
              <SplitWords text="Para marcas que precisam de produto, IA e conversão." />
            </h2>
          </div>

          <div data-v2-mask className="space-y-4">
            <p className="text-[1rem] leading-[1.75] text-white/60">
              Projetos selecionados para criar presença digital premium, automações,
              infraestrutura de IA e sistemas que sustentam operação real.
            </p>
            <div className="grid gap-3">
              <MagneticAnchor
                href="https://wa.me/5541999360874"
                external
                className="group relative z-20 flex h-14 items-center justify-between border border-[var(--v2-accent)] bg-[var(--v2-accent)] px-4 text-sm font-semibold text-black"
              >
                Chamar no WhatsApp
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticAnchor>
              <MagneticAnchor
                href="mailto:consultoria@davidbudeli.com"
                className="group relative z-20 flex h-14 items-center justify-between border border-white/[0.1] bg-black/22 px-4 text-sm font-medium text-white transition-colors hover:border-white/[0.22]"
              >
                consultoria@davidbudeli.com
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticAnchor>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-2 sm:grid-cols-5">
          {v2ContactLinks.map((item, index) => {
            const Icon = contactIcons[index] ?? Globe;

            return (
              <a
                key={item.href}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex h-12 items-center justify-between border border-white/[0.08] bg-black/18 px-3 text-[0.8rem] text-white/58 transition-colors hover:border-[var(--v2-accent)] hover:text-white"
              >
                <span className="inline-flex items-center gap-2">
                  <Icon size={15} />
                  {item.label}
                </span>
                <ArrowUpRight size={14} className="opacity-45 transition-opacity group-hover:opacity-100" />
              </a>
            );
          })}
        </div>
      </div>

      <footer data-footer-small className="mx-auto mt-8 flex max-w-[1180px] justify-start border-t border-white/[0.06] pt-6 text-sm text-white/38 sm:justify-end">
        <a
          href="https://hyperag.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono-custom text-[0.62rem] uppercase text-white/52 transition-colors hover:text-white"
        >
          Designed & Developed by HyperAG
          <ArrowUpRight size={13} />
        </a>
      </footer>
    </section>
  );
}

export function V2Experience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [activeCaseSlug, setActiveCaseSlug] = useState(v2Cases[0].slug);
  const [loadingDone, setLoadingDone] = useState(false);

  const activeCase = useMemo(
    () => v2Cases.find((project) => project.slug === activeCaseSlug) ?? v2Cases[0],
    [activeCaseSlug]
  );

  const themeStyle = {
    "--v2-accent": activeCase.accent,
    "--v2-accent-two": activeCase.accent2,
    "--v2-dark": activeCase.dark,
    "--v2-soft": activeCase.soft,
  } as CSSProperties;

  useEffect(() => {
    const loader = document.querySelector<HTMLElement>("[data-v2-loader]");
    const mark = document.querySelector<HTMLElement>("[data-loader-mark]");
    const line = document.querySelector<HTMLElement>("[data-loader-line]");

    if (!loader || !mark || !line) {
      setLoadingDone(true);
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "power4.out" },
      onComplete: () => setLoadingDone(true),
    });

    timeline
      .set(line, { scaleX: 0 })
      .fromTo(mark, { y: 18, opacity: 0, filter: "blur(12px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.72 })
      .to(line, { scaleX: 1, duration: 0.72, ease: "power3.inOut" }, "-=0.25")
      .to(mark, { scale: 0.94, duration: 0.22, ease: "power2.inOut" })
      .to(loader, { opacity: 0, duration: 0.45, ease: "power2.inOut" });

    return () => {
      timeline.kill();
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const blurItems = Array.from(root.querySelectorAll<HTMLElement>("[data-v2-blur]"));
    const maskItems = Array.from(root.querySelectorAll<HTMLElement>("[data-v2-mask]"));
    const casePanels = Array.from(root.querySelectorAll<HTMLElement>("[data-case-panel]"));
    const caseVisuals = Array.from(root.querySelectorAll<HTMLElement>("[data-case-visual]"));
    const cardReveals = Array.from(root.querySelectorAll<HTMLElement>("[data-card-reveal]"));
    const footerReveal = root.querySelector<HTMLElement>("[data-footer-reveal]");
    const backdropShell = root.querySelector<HTMLElement>("[data-responsive-backdrop]");
    const backdropLight = root.querySelector<HTMLElement>("[data-backdrop-light]");
    const backdropField = root.querySelector<HTMLElement>("[data-backdrop-field]");
    const backdropBand = root.querySelector<HTMLElement>("[data-backdrop-band]");
    const backdropVeil = root.querySelector<HTMLElement>("[data-backdrop-veil]");
    const backdropDepth = root.querySelector<HTMLElement>("[data-backdrop-depth]");
    const backdropTexture = root.querySelector<HTMLElement>("[data-backdrop-texture]");

    const animateBackdropTheme = (slug: string) => {
      const project = v2Cases.find((item) => item.slug === slug);
      if (!project) return;

      setActiveCaseSlug(slug);

      if (backdropShell) {
        gsap.to(backdropShell, {
          "--v2-backdrop-dark": project.dark,
          "--v2-backdrop-soft": project.soft,
          "--v2-backdrop-accent": project.accent,
          "--v2-backdrop-accent-two": project.accent2,
          duration: 1.05,
          ease: "power2.out",
        });
      }

      if (backdropVeil) {
        gsap
          .timeline()
          .to(backdropVeil, { opacity: 0.32, yPercent: -4, duration: 0.22, ease: "power2.out" })
          .to(backdropVeil, { opacity: 0, yPercent: -10, duration: 0.82, ease: "power2.out" });
      }
    };

    const ctx = gsap.context(() => {
      const sectionEnvironments: Record<
        SectionId,
        { light: number; field: number; band: number; texture: number; depth: number; scale: number }
      > = {
        hero: { light: 0.34, field: 0.22, band: 0.24, texture: 0.12, depth: 0.92, scale: 0.98 },
        positioning: { light: 0.42, field: 0.28, band: 0.34, texture: 0.15, depth: 0.86, scale: 1.02 },
        cases: { light: 0.48, field: 0.36, band: 0.38, texture: 0.17, depth: 0.82, scale: 1.06 },
        system: { light: 0.38, field: 0.32, band: 0.28, texture: 0.13, depth: 0.9, scale: 1.02 },
        contact: { light: 0.24, field: 0.18, band: 0.16, texture: 0.09, depth: 0.96, scale: 0.96 },
      };

      const applyBackdropEnvironment = (id: SectionId) => {
        const env = sectionEnvironments[id];

        if (backdropLight) {
          gsap.to(backdropLight, {
            opacity: env.light,
            scale: env.scale,
            duration: 1.05,
            ease: "power2.out",
          });
        }
        if (backdropField) {
          gsap.to(backdropField, {
            opacity: env.field,
            scale: 1 + (env.scale - 1) * 0.72,
            duration: 1.05,
            ease: "power2.out",
          });
        }
        if (backdropBand) {
          gsap.to(backdropBand, {
            opacity: env.band,
            duration: 1.05,
            ease: "power2.out",
          });
        }
        if (backdropTexture) {
          gsap.to(backdropTexture, {
            opacity: env.texture,
            duration: 1.05,
            ease: "power2.out",
          });
        }
        if (backdropDepth) {
          gsap.to(backdropDepth, {
            opacity: env.depth,
            duration: 1.05,
            ease: "power2.out",
          });
        }
      };

      animateBackdropTheme(v2Cases[0].slug);
      applyBackdropEnvironment("hero");

      if (backdropLight) {
        gsap.to(backdropLight, {
          xPercent: 12,
          yPercent: 18,
          rotate: -5,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 1.25 },
        });
      }
      if (backdropField) {
        gsap.to(backdropField, {
          xPercent: -10,
          yPercent: -16,
          rotate: 4,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 1.45 },
        });
      }
      if (backdropBand) {
        gsap.to(backdropBand, {
          yPercent: -42,
          rotate: 1.5,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 1.05 },
        });
      }
      if (backdropDepth) {
        gsap.to(backdropDepth, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 1.7 },
        });
      }

      const hero = root.querySelector<HTMLElement>("#hero");
      const heroWords = Array.from(hero?.querySelectorAll<HTMLElement>("[data-v2-word]") ?? []);
      const heroEntrants = [
        root.querySelector<HTMLElement>("[data-hero-eyebrow]"),
        root.querySelector<HTMLElement>("[data-hero-copy]"),
        root.querySelector<HTMLElement>("[data-hero-note]"),
        root.querySelector<HTMLElement>("[data-hero-domains]"),
        root.querySelector<HTMLElement>("[data-hero-actions]"),
        root.querySelector<HTMLElement>("[data-hero-profile]"),
        root.querySelector<HTMLElement>("[data-hero-panel]"),
      ].filter(Boolean) as HTMLElement[];

      gsap.set(heroWords, { yPercent: 112, opacity: 0, filter: "blur(14px)" });
      gsap.set(heroEntrants, { y: 28, opacity: 0, filter: "blur(12px)" });
      gsap.set(blurItems, { y: 26, opacity: 0, filter: "blur(12px)" });
      gsap.set(maskItems, { clipPath: "inset(0 100% 0 0)", filter: "blur(10px)" });
      gsap.set(casePanels, { y: 72, opacity: 0, scale: 0.975, filter: "blur(8px)" });
      gsap.set(caseVisuals, { clipPath: "inset(0 0 12% 0)", y: 28 });
      gsap.set(cardReveals, { y: 64, opacity: 0, rotateX: 5, transformPerspective: 900 });
      if (footerReveal) {
        gsap.set(footerReveal, { y: 70, opacity: 0, filter: "blur(14px)" });
      }

      const heroIntro = gsap.timeline({ delay: 0.12, defaults: { ease: "power4.out" } });
      heroIntro
        .to(heroWords, {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.05,
          stagger: 0.035,
        })
        .to(
          heroEntrants,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.07,
          },
          "-=0.72"
        );

      const heroScroll = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.75,
        },
      });
      heroScroll
        .to("[data-hero-title]", { yPercent: -22, scale: 0.86, transformOrigin: "left top" }, 0)
        .to("[data-hero-copy], [data-hero-note]", { y: -54, opacity: 0, filter: "blur(3px)" }, 0)
        .to("[data-hero-domains], [data-hero-actions]", { y: -38, opacity: 0, filter: "blur(3px)" }, 0.04)
        .to("[data-hero-profile]", { y: -42, opacity: 0.22, scale: 0.97 }, 0)
        .to("[data-hero-panel]", { y: -76, opacity: 0.18, scale: 0.96 }, 0)
        .to("[data-hero-band]", { yPercent: -110, rotate: 1.5, opacity: 0.2 }, 0);

      Array.from(root.querySelectorAll<HTMLElement>("[data-v2-split]")).forEach((split) => {
        if (split.closest("#hero")) return;

        const words = Array.from(split.querySelectorAll<HTMLElement>("[data-v2-word]"));
        gsap.set(words, { yPercent: 108, opacity: 0, filter: "blur(12px)" });

        gsap.to(words, {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.05,
          ease: "power4.out",
          stagger: 0.026,
          scrollTrigger: {
            trigger: split,
            start: "top 84%",
            once: true,
          },
        });
      });

      blurItems.forEach((item) => {
        if (item.closest("#hero")) return;

        gsap.to(item, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 86%",
            once: true,
          },
        });
      });

      maskItems.forEach((item) => {
        gsap.to(item, {
          clipPath: "inset(0 0% 0 0)",
          filter: "blur(0px)",
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: item,
            start: "top 84%",
            once: true,
          },
        });
      });

      casePanels.forEach((panel) => {
        gsap.to(panel, {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.05,
          ease: "power4.out",
          onComplete: () => gsap.set(panel, { clearProps: "filter" }),
          scrollTrigger: {
            trigger: panel,
            start: "top 82%",
            once: true,
          },
        });
      });

      caseVisuals.forEach((visual) => {
        gsap.to(visual, {
          y: -18,
          clipPath: "inset(0 0 0% 0)",
          ease: "none",
          scrollTrigger: {
            trigger: visual,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.75,
          },
        });
      });

      Array.from(root.querySelectorAll<HTMLElement>("[data-progressive-image]")).forEach((imageShell) => {
        const image = imageShell.querySelector("img");
        const mask = imageShell.querySelector<HTMLElement>("[data-image-mask]");

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.08 },
            {
              scale: 1,
              duration: 0.72,
              ease: "power3.out",
              onStart: () => gsap.set(image, { filter: "blur(0px)", opacity: 1 }),
              onComplete: () => gsap.set(image, { clearProps: "filter" }),
              scrollTrigger: {
                trigger: imageShell,
                start: "top 92%",
                once: true,
              },
            }
          );
        }

        if (mask) {
          gsap.to(mask, {
            yPercent: -104,
            duration: 1.05,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: imageShell,
              start: "top 84%",
              once: true,
            },
          });
        }
      });

      cardReveals.forEach((card, index) => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.92,
          ease: "power4.out",
          delay: index * 0.035,
          scrollTrigger: {
            trigger: card,
            start: "top 86%",
            once: true,
          },
        });
      });

      if (footerReveal) {
        gsap.to(footerReveal, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: footerReveal,
            start: "top 84%",
            once: true,
          },
        });
      }

      Array.from(root.querySelectorAll<HTMLElement>("[data-v2-section]")).forEach((section) => {
        const id = section.dataset.v2Section as SectionId | undefined;
        if (!id) return;

        ScrollTrigger.create({
          trigger: section,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => {
            setActiveSection(id);
            applyBackdropEnvironment(id);
          },
          onEnterBack: () => {
            setActiveSection(id);
            applyBackdropEnvironment(id);
          },
        });
      });

      Array.from(root.querySelectorAll<HTMLElement>("[data-v2-theme]")).forEach((section) => {
        const slug = section.dataset.v2Theme;
        if (!slug) return;
        const isHorizontalCase = section.hasAttribute("data-case-panel");

        ScrollTrigger.create({
          trigger: section,
          start: "top 58%",
          end: "bottom 42%",
          onEnter: () => {
            if (isHorizontalCase && window.innerWidth >= 1024) return;
            animateBackdropTheme(slug);
          },
          onEnterBack: () => {
            if (isHorizontalCase && window.innerWidth >= 1024) return;
            animateBackdropTheme(slug);
          },
        });
      });

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          root.style.setProperty("--v2-page-progress", self.progress.toFixed(4));
        },
      });
    }, root);

    const mm = gsap.matchMedia();
    const storyCards = Array.from(root.querySelectorAll<HTMLElement>("[data-story-card]"));
    const positioningPin = root.querySelector<HTMLElement>("[data-positioning-pin]");

    if (storyCards.length) {
      mm.add("(max-width: 767px)", () => {
        const tweens = storyCards.map((card, index) => {
          gsap.set(card, { y: 34, opacity: 0, scale: 0.985, filter: "blur(8px)" });

          return gsap.to(card, {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.72,
            delay: index * 0.04,
            ease: "power3.out",
            onComplete: () => gsap.set(card, { clearProps: "filter" }),
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              once: true,
            },
          });
        });

        return () => {
          tweens.forEach((tween) => {
            tween.scrollTrigger?.kill();
            tween.kill();
          });
        };
      });

      mm.add("(min-width: 768px)", () => {
        gsap.set(storyCards, { yPercent: 105, opacity: 0, scale: 0.96, filter: "blur(8px)" });
        gsap.set(storyCards[0], { yPercent: 0, opacity: 1, scale: 1, filter: "blur(0px)" });

        const storyTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: "#positioning",
            start: "top top",
            end: "bottom bottom",
            pin: positioningPin ?? true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.85,
          },
        });

        storyTimeline
          .to("[data-first-copy]", { y: -28, scale: 0.96, opacity: 0.72, transformOrigin: "left top" }, 0)
          .to(storyCards[0], { yPercent: -30, opacity: 0, scale: 0.96, filter: "blur(6px)" }, 0.18)
          .to(storyCards[1], { yPercent: 0, opacity: 1, scale: 1, filter: "blur(0px)" }, 0.28)
          .to(storyCards[1], { yPercent: -30, opacity: 0, scale: 0.96, filter: "blur(6px)" }, 0.58)
          .to(storyCards[2], { yPercent: 0, opacity: 1, scale: 1, filter: "blur(0px)" }, 0.66);

        return () => {
          storyTimeline.scrollTrigger?.kill();
          storyTimeline.kill();
        };
      });
    }

    mm.add("(min-width: 1024px)", () => {
      const gallery = root.querySelector<HTMLElement>("[data-case-gallery]");
      const track = root.querySelector<HTMLElement>("[data-case-track]");
      if (!gallery || !track) return undefined;

      const tween = gsap.to(track, {
        x: () => {
          const distance = Math.max(0, track.scrollWidth - window.innerWidth + window.innerWidth * 0.1);
          return -distance;
        },
        ease: "none",
        scrollTrigger: {
          trigger: gallery,
          start: "top top",
          end: () => `+=${Math.max(1500, track.scrollWidth - window.innerWidth + 1050)}`,
          scrub: 0.75,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const themeTriggers = v2Cases
        .map((project) => {
          const panel = root.querySelector<HTMLElement>(
            `[data-case-panel][data-v2-theme="${project.slug}"]`
          );
          if (!panel) return null;

          return ScrollTrigger.create({
            trigger: panel,
            containerAnimation: tween,
            start: "left center",
            end: "right center",
            onEnter: () => animateBackdropTheme(project.slug),
            onEnterBack: () => animateBackdropTheme(project.slug),
          });
        })
        .filter(
          (trigger): trigger is ReturnType<typeof ScrollTrigger.create> => trigger !== null
        );

      return () => {
        themeTriggers.forEach((trigger) => trigger.kill());
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      window.clearTimeout(refreshTimer);
      mm.revert();
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(pointer: coarse), (max-width: 1023px)").matches) {
      return;
    }

    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-mouse-layer]"));
    if (!layers.length) return;

    const handleMove = (event: MouseEvent) => {
      const x = event.clientX - window.innerWidth / 2;
      const y = event.clientY - window.innerHeight / 2;

      layers.forEach((layer) => {
        const depth = Number(layer.dataset.mouseLayer ?? 0.03);
        gsap.to(layer, {
          x: x * depth,
          y: y * depth,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <div ref={rootRef} className="v2-page relative min-h-screen bg-[#030303] text-white" style={themeStyle}>
      <V2LoadingScreen done={loadingDone} />
      <ResponsiveBackdrop />
      <V2Navigation activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="relative z-10">
        <HeroSection />
        <PositioningSection />
        <CasesSection />
        <SystemSection />
        <ContactSection />
      </main>
    </div>
  );
}
