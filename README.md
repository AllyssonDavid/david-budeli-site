# David Budeli — Website Pessoal Premium

Website pessoal cinematográfico e ultra-premium construído com Next.js 15, Framer Motion, GSAP e arquitetura profissional.

---

## 🚀 Stack

- **Next.js 15** — Framework React com App Router
- **TypeScript** — Tipagem estática
- **TailwindCSS** — Utility-first CSS
- **Framer Motion** — Animações declarativas
- **GSAP + ScrollTrigger** — Animações avançadas e scroll
- **Lenis** — Smooth scroll premium
- **Lucide React** — Icons

---

## 📁 Estrutura do Projeto

```
david-budeli/
├── app/
│   ├── layout.tsx              # Root layout com fontes e providers
│   └── page.tsx                # Página principal
│
├── components/
│   ├── animations/
│   │   ├── RevealBlock.tsx     # Componente de reveal animado
│   │   └── SmoothScrollProvider.tsx  # Lenis + GSAP ScrollTrigger
│   │
│   ├── background/
│   │   └── ParticlesBackground.tsx   # Canvas com partículas
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx     # Hero cinematográfico
│   │   ├── SobreSection.tsx    # Sobre David Budeli
│   │   ├── EcossistemaSection.tsx    # Hyper Galaxy, HyperAG, HyperPag
│   │   ├── MatrizSection.tsx   # 8 especialidades
│   │   ├── ArquiteturasSection.tsx   # Projetos como arquiteturas digitais
│   │   ├── StackSection.tsx    # Stack tecnológica (terminal)
│   │   └── ContatoSection.tsx  # Contato premium
│   │
│   └── ui/
│       ├── CustomCursor.tsx    # Cursor personalizado premium
│       ├── Footer.tsx          # Footer minimalista
│       ├── Logo.tsx            # Logo geométrica "D"
│       ├── Navbar.tsx          # Navbar fixa glass
│       └── Tag.tsx             # Tag de seção
│
├── hooks/
│   ├── useMagneticEffect.ts    # Efeito magnético em botões
│   ├── useMousePosition.ts     # Posição do mouse
│   └── useReveal.ts            # Intersection observer reveal
│
├── lib/
│   ├── constants.ts            # Dados do site (conteúdo)
│   └── utils.ts                # Utilitários (cn, lerp, etc.)
│
├── styles/
│   └── globals.css             # Design system, variáveis CSS, animações
│
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
└── package.json
```

---

## ⚡ Instalação

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

### 3. Build de produção

```bash
npm run build
npm start
```

---

## 🌐 Deploy na Vercel

### Opção 1 — CLI (recomendado)

```bash
npm install -g vercel
vercel
```

### Opção 2 — Dashboard

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **Add New → Project**
3. Importe o repositório GitHub
4. Clique em **Deploy**

> A Vercel detecta automaticamente Next.js e configura tudo.

---

## ✏️ Personalização

### Conteúdo
Edite `lib/constants.ts` para atualizar:
- Links de contato (WhatsApp, Instagram, Telegram, Email)
- Projetos na seção Arquiteturas Digitais
- Dados do ecossistema

### Cores
Edite `styles/globals.css` nas variáveis `:root`

### Fontes
Edite `app/layout.tsx` nas importações do Google Fonts

---

## 📸 Foto de Perfil

Na seção **Sobre**, substitua o placeholder pelo seu arquivo de foto:

Em `components/sections/SobreSection.tsx`, dentro de `.sobre-inner`, adicione:

```tsx
import Image from "next/image";

// Substitua o div da avatar por:
<Image
  src="/foto-perfil.jpg"
  alt="David Budeli"
  fill
  className="object-cover"
  priority
/>
```

Coloque a foto em `/public/foto-perfil.jpg`

---

## 🔧 Variáveis de Ambiente

Crie `.env.local` se necessário:

```env
# Exemplo para analytics futuros
NEXT_PUBLIC_GA_ID=
```

---

## 📦 Dependências principais

| Pacote | Versão | Uso |
|--------|--------|-----|
| next | 15.1.0 | Framework |
| framer-motion | ^11 | Animações |
| gsap | ^3.12 | GSAP + ScrollTrigger |
| lenis | ^1.1 | Smooth scroll |
| @react-three/fiber | ^8 | Three.js React |
| lucide-react | ^0.468 | Icons |

---

**David Budeli © 2025 — Hyper Galaxy Ecosystem**
