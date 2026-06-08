# Deploy na Hostinger Node.js Hosting

Guia para publicar o site David Budeli em `davidbudeli.com` usando a integracao GitHub da Hostinger Node.js Hosting.

## Repositorio

- GitHub: `https://github.com/DavidBudeli/david-budeli-site`
- Branch: `main`
- Framework: Next.js
- Runtime: Node.js

## Compatibilidade

O projeto nao usa dependencias exclusivas da Vercel, nao possui `vercel.json` e nao depende de variaveis `process.env` para renderizar.

Scripts esperados:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```

O projeto tambem mantem `npm run lint` para validacao local/CI.

## Variaveis de ambiente

Nenhuma variavel de ambiente e obrigatoria para o deploy atual.

## Configuracao na Hostinger

Na area Node.js Hosting da Hostinger:

- Repository: `DavidBudeli/david-budeli-site`
- Branch: `main`
- Install command: `npm install`
- Build command: `npm run build`
- Start command: `npm start`
- Port: usar a porta exposta pela Hostinger via ambiente, quando disponivel

## Validacao antes de publicar

Execute localmente ou no ambiente de build:

```bash
npm install
npm run lint
npm run build
npm start
```

Depois de iniciar, valide:

- Hero carregando
- Primeira rolagem com motion
- Secao Sobre com retrato
- Projetos clicaveis
- Links oficiais
- Formulario de contato via email
- Layout mobile sem overflow horizontal

## Dominio

Publicar em:

```text
davidbudeli.com
```

Configuracoes esperadas:

- HTTPS/SSL ativo
- `http://davidbudeli.com` redirecionando para `https://davidbudeli.com`
- `www.davidbudeli.com` apontando corretamente para a aplicacao ou redirecionando para o dominio raiz
