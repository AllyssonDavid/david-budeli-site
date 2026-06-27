export type V2Case = {
  slug: string;
  index: string;
  name: string;
  category: string;
  role: string;
  premise: string;
  result: string;
  metric: string;
  metricLabel: string;
  year: string;
  accent: string;
  accent2: string;
  dark: string;
  soft: string;
  stack: string[];
  systems: string[];
  imageMode: "command" | "payments" | "studio" | "personal" | "beauty" | "fitness" | "media";
  screenshot?: string;
  href: string;
  buttonLabel: string;
};

export const v2NavItems = [
  { label: "Posicionamento", href: "#positioning" },
  { label: "Cases", href: "#cases" },
  { label: "Sistema", href: "#system" },
  { label: "Contato", href: "#contact" },
];

export const v2ContactLinks = [
  { label: "Website", href: "https://davidbudeli.com" },
  { label: "GitHub", href: "https://github.com/DavidBudeli" },
  { label: "Instagram", href: "https://www.instagram.com/davidbudeli/" },
  { label: "WhatsApp", href: "https://wa.me/5541999360874" },
  { label: "Email", href: "mailto:consultoria@davidbudeli.com" },
];

export const v2Cases: V2Case[] = [
  {
    slug: "hyper-galaxy",
    index: "01",
    name: "Hyper Galaxy",
    category: "Command system",
    role: "Ecossistema operacional",
    premise:
      "Centro de comando para conectar produtos, métricas, automações e decisões em uma camada única de controle.",
    result:
      "Arquitetura modular para operar múltiplos produtos digitais como um sistema vivo, com leitura estratégica e expansão contínua.",
    metric: "OS",
    metricLabel: "Ecosystem layer",
    year: "2026",
    accent: "#7dd3fc",
    accent2: "#a78bfa",
    dark: "#07121d",
    soft: "rgba(125, 211, 252, 0.14)",
    stack: ["Product OS", "AI Ops", "Signal UI", "Automation"],
    systems: ["Command graph", "Signal layer", "Execution loops"],
    imageMode: "command",
    screenshot: "/cases/hyper-galaxy.png",
    href: "https://hypergalaxy.cloud",
    buttonLabel: "Abrir projeto",
  },
  {
    slug: "hyperag",
    index: "02",
    name: "HyperAG",
    category: "AI product studio",
    role: "Studio de produto",
    premise:
      "Marca que transforma estratégia, engenharia, IA e design em produtos digitais premium.",
    result:
      "Motor de criação para lançar sistemas com experiência sofisticada, base técnica sólida e conversão real.",
    metric: "AI",
    metricLabel: "Product engine",
    year: "2026",
    accent: "#a78bfa",
    accent2: "#f0abfc",
    dark: "#13091d",
    soft: "rgba(167, 139, 250, 0.16)",
    stack: ["Next.js", "Agents", "Design systems", "Motion"],
    systems: ["Brand system", "Agent flows", "Launch stack"],
    imageMode: "studio",
    screenshot: "/cases/hyperag.png",
    href: "https://hyperag.com.br",
    buttonLabel: "Abrir projeto",
  },
  {
    slug: "hyperpag",
    index: "03",
    name: "HyperPag",
    category: "Payments infrastructure",
    role: "Fintech e orquestração",
    premise:
      "Infraestrutura para pagamentos, cobrança inteligente, antifraude operacional e automação financeira.",
    result:
      "Fluxos transacionais desenhados para reduzir fricção, aumentar previsibilidade e preparar a operação para escala.",
    metric: "24/7",
    metricLabel: "Payment flows",
    year: "2026",
    accent: "#34d399",
    accent2: "#38bdf8",
    dark: "#06140f",
    soft: "rgba(52, 211, 153, 0.14)",
    stack: ["Payments", "Risk logic", "Webhooks", "Ops flows"],
    systems: ["Checkout routes", "Billing engine", "Risk events"],
    imageMode: "payments",
    screenshot: "/cases/hyperpag.png",
    href: "https://hyperpag.com/",
    buttonLabel: "Abrir projeto",
  },
  {
    slug: "everpersonal",
    index: "04",
    name: "EverPersonal",
    category: "Personal platform",
    role: "Produto de relacionamento",
    premise:
      "Experiência digital para personalização, recorrência e gestão de relacionamento em torno de performance humana.",
    result:
      "Interface, dados e automações combinados para sustentar uma jornada premium de acompanhamento e retenção.",
    metric: "CRM",
    metricLabel: "Retention system",
    year: "2025",
    accent: "#5eead4",
    accent2: "#facc15",
    dark: "#061716",
    soft: "rgba(94, 234, 212, 0.13)",
    stack: ["CRM", "Member journeys", "Automation", "Analytics"],
    systems: ["Client states", "Habit loops", "Progress records"],
    imageMode: "personal",
    screenshot: "/cases/everpersonal.png",
    href: "https://everpersonal.com.br",
    buttonLabel: "Abrir projeto",
  },
  {
    slug: "daniela-moura-studio",
    index: "05",
    name: "Daniela Moura Studio",
    category: "Premium service brand",
    role: "Experiência de marca",
    premise:
      "Presença digital sofisticada para transformar percepção de valor, agenda e relacionamento com clientes.",
    result:
      "Experiência de marca que comunica cuidado, autoridade e conversão sem parecer uma página genérica de serviços.",
    metric: "CX",
    metricLabel: "Premium journey",
    year: "2025",
    accent: "#fb7185",
    accent2: "#fbbf24",
    dark: "#1d0b11",
    soft: "rgba(251, 113, 133, 0.15)",
    stack: ["Brand UX", "Booking flow", "Content", "Conversion"],
    systems: ["Service map", "Trust cues", "Lead capture"],
    imageMode: "beauty",
    screenshot: "/cases/daniela-moura-studio.png",
    href: "https://danielamourastudio.com.br",
    buttonLabel: "Abrir projeto",
  },
  {
    slug: "sabrina-pires-personal",
    index: "06",
    name: "Sabrina Pires Personal",
    category: "Performance brand",
    role: "Sistema de aquisição",
    premise:
      "Produto digital para posicionar uma operação de personal training com clareza, prova e captação qualificada.",
    result:
      "Jornada direta, responsiva e orientada a ação para converter interesse em conversa, diagnóstico e contratação.",
    metric: "FIT",
    metricLabel: "Lead motion",
    year: "2025",
    accent: "#bef264",
    accent2: "#22d3ee",
    dark: "#101606",
    soft: "rgba(190, 242, 100, 0.13)",
    stack: ["Mobile UX", "Funnels", "WhatsApp", "Performance"],
    systems: ["Offer framing", "Proof stack", "Contact flow"],
    imageMode: "fitness",
    screenshot: "/cases/sabrina-pires-personal.png",
    href: "https://sabrinapirespersonal.com.br",
    buttonLabel: "Abrir projeto",
  },
  {
    slug: "cristiano-ronaldo-blog",
    index: "07",
    name: "Cristiano Ronaldo Blog",
    category: "Editorial engine",
    role: "Mídia de alta performance",
    premise:
      "Arquitetura editorial para tráfego orgânico, velocidade de publicação e consumo mobile em escala.",
    result:
      "Base otimizada para conteúdo, busca, leitura rápida e crescimento contínuo de audiência.",
    metric: "SEO",
    metricLabel: "Media system",
    year: "2025",
    accent: "#f59e0b",
    accent2: "#ef4444",
    dark: "#1a0e05",
    soft: "rgba(245, 158, 11, 0.14)",
    stack: ["Editorial CMS", "SEO", "Performance", "Analytics"],
    systems: ["Content model", "Indexing layer", "Reading flow"],
    imageMode: "media",
    screenshot: "/cases/cristiano-ronaldo-blog.png",
    href: "https://cristianoronaldo.blog",
    buttonLabel: "Abrir projeto",
  },
];

export const v2Capabilities = [
  {
    label: "Produto",
    title: "Interfaces que funcionam como sistemas",
    desc: "Cada tela carrega intenção, hierarquia, estados, microinterações e caminhos de conversão.",
  },
  {
    label: "IA",
    title: "Infraestrutura para agentes e automações",
    desc: "Workflows, integrações, prompts, filas e supervisão para reduzir operação manual.",
  },
  {
    label: "Engenharia",
    title: "Bases preparadas para escala",
    desc: "Next.js, APIs, dados, observabilidade, segurança e deploy com visão de produto real.",
  },
  {
    label: "Marca",
    title: "Presença digital com autoridade",
    desc: "Narrativa, ritmo visual e experiência premium para elevar percepção e gerar demanda.",
  },
];
