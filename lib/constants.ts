export const NAV_ITEMS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Ecossistema", href: "#ecossistema" },
  { label: "Especialidades", href: "#matriz" },
  { label: "Projetos", href: "#arquiteturas" },
  { label: "Contato", href: "#contato" },
];

export const ECOSSISTEMA_DATA = [
  {
    id: "001",
    name: "Hyper Galaxy",
    sub: "Centro de Comando",
    desc: "A holding tecnológica que orbita todas as operações. Infraestrutura estratégica, visão macro e controle operacional de todo o ecossistema digital.",
    color: "#3B82F6",
  },
  {
    id: "002",
    name: "HyperAG",
    sub: "Agência Digital Premium",
    desc: "Agência de desenvolvimento e design digital de alta performance. Criação de produtos, sistemas e experiências que posicionam marcas no topo.",
    color: "#8B5CF6",
  },
  {
    id: "003",
    name: "HyperPag",
    sub: "Fintech & Pagamentos",
    desc: "Plataforma fintech de próxima geração. Pagamentos inteligentes, automação financeira e infraestrutura de transações para o mercado digital.",
    color: "#60A5FA",
  },
];

export const MATRIZ_DATA = [
  {
    id: "01",
    title: "Engenharia de Software",
    desc: "Arquiteturas distribuídas orientadas à performance, escalabilidade e alta disponibilidade em ambientes críticos.",
    icon: "code",
  },
  {
    id: "02",
    title: "Design de Sistemas",
    desc: "Modelagem de sistemas complexos com foco em coesão, baixo acoplamento e evolução contínua sem degradação.",
    icon: "monitor",
  },
  {
    id: "03",
    title: "IA & Automação",
    desc: "Integração de inteligência artificial em fluxos produtivos. Automações que operam 24/7 com precisão cirúrgica.",
    icon: "layers",
  },
  {
    id: "04",
    title: "Fintech",
    desc: "Infraestrutura financeira digital de ponta. Sistemas de pagamento, compliance e fluxos transacionais seguros.",
    icon: "dollar-sign",
  },
  {
    id: "05",
    title: "Performance",
    desc: "Otimização de aplicações no limite de velocidade. Core Web Vitals, edge computing e latência mínima.",
    icon: "zap",
  },
  {
    id: "06",
    title: "Branding Digital",
    desc: "Construção de presença digital estratégica. Posicionamento de marca, identidade e narrativa que convertem.",
    icon: "globe",
  },
  {
    id: "07",
    title: "Arquitetura UX",
    desc: "Experiências de usuário projetadas com psicologia comportamental. Jornadas fluidas que convertem e retêm.",
    icon: "eye",
  },
  {
    id: "08",
    title: "Escalabilidade Enterprise",
    desc: "Sistemas preparados para crescimento exponencial. De MVP a milhões de usuários sem reescrever do zero.",
    icon: "package",
  },
];

export const PROJETOS_DATA = [
  {
    num: "001",
    name: "HyperPag Platform",
    tags: ["Fintech", "Next.js", "Node.js"],
    desc: "Gateway de pagamentos inteligente com orquestração de transações em tempo real e compliance automático.",
    year: "2024",
  },
  {
    num: "002",
    name: "Galaxy OS",
    tags: ["Dashboard", "React", "TypeScript"],
    desc: "Sistema operacional do ecossistema — controle centralizado de todas as operações e métricas em tempo real.",
    year: "2024",
  },
  {
    num: "003",
    name: "AutoFlow Engine",
    tags: ["IA", "Automação", "APIs"],
    desc: "Motor de automação com IA para orquestrar workflows complexos de negócios com execução assíncrona.",
    year: "2023",
  },
  {
    num: "004",
    name: "HyperAG Studio",
    tags: ["SaaS", "Design System", "Framer"],
    desc: "Plataforma de criação e gestão de experiências digitais premium para clientes enterprise.",
    year: "2023",
  },
  {
    num: "005",
    name: "InfraCore API",
    tags: ["Backend", "PostgreSQL", "Docker"],
    desc: "Infraestrutura de API distribuída com cache inteligente, failover automático e observabilidade total.",
    year: "2022",
  },
];

export const STACK_DATA = [
  { name: "Next.js", symbol: "▲", color: "#ffffff", bg: "#000000" },
  { name: "TypeScript", symbol: "TS", color: "#3B82F6", bg: "transparent" },
  { name: "React", symbol: "⚛", color: "#61DAFB", bg: "transparent" },
  { name: "Node.js", symbol: "⬡", color: "#68A063", bg: "transparent" },
  { name: "IA / LLMs", symbol: "🤖", color: "#ffffff", bg: "transparent" },
  { name: "REST / GraphQL", symbol: "API", color: "#FF6B6B", bg: "transparent" },
  { name: "PostgreSQL", symbol: "🐘", color: "#336791", bg: "transparent" },
  { name: "Docker", symbol: "🐳", color: "#2496ED", bg: "transparent" },
  { name: "Tailwind", symbol: "TW", color: "#38BDF8", bg: "transparent" },
  { name: "Framer Motion", symbol: "FM", color: "#FF0080", bg: "transparent" },
];

export const CONTACT_DATA = [
  {
    label: "WhatsApp",
    href: "https://wa.me/SEU_NUMERO",
    type: "whatsapp",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/SEU_USUARIO",
    type: "instagram",
  },
  {
    label: "Telegram",
    href: "https://t.me/SEU_USUARIO",
    type: "telegram",
  },
  {
    label: "Email",
    href: "mailto:david@hypergalaxy.com",
    type: "email",
  },
];
