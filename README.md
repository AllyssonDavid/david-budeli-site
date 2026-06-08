# David Budeli

Experiencia digital premium para `davidbudeli.com`, construida com Next.js, TypeScript, Tailwind CSS, Framer Motion e motion system mobile-first.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP ScrollTrigger carregado sob demanda no desktop
- Lenis somente no desktop

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm start
```

Scripts de runtime:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```

## Desenvolvimento

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Validacao de producao

```bash
npm install
npm run lint
npm run build
npm start
```

## Deploy na Hostinger

O deploy de producao deve ser feito pela Hostinger Node.js Hosting usando a integracao com GitHub.

Guia completo: [`HOSTINGER_DEPLOY.md`](./HOSTINGER_DEPLOY.md)

Configuracao esperada:

- Repository: `https://github.com/DavidBudeli/david-budeli-site`
- Branch: `main`
- Install command: `npm install`
- Build command: `npm run build`
- Start command: `npm start`
- Domain: `davidbudeli.com`

## Variaveis de ambiente

Nenhuma variavel de ambiente e obrigatoria para a versao atual.

## Conteudo

Os dados principais de navegacao, ecossistema, projetos, stack e contatos ficam em `lib/constants.ts`.

Links oficiais configurados:

- GitHub: `https://github.com/DavidBudeli`
- Instagram: `https://www.instagram.com/davidbudeli/`
- Website: `https://davidbudeli.com`
- Email: `mailto:atendimento@davidbudeli.com`
- WhatsApp: `https://wa.me/5541999360874`
