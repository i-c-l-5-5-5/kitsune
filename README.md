Proveniência e Autoria: Este documento integra o projeto Galeria I.C.L (licença MIT).
  Nada aqui implica cessão de direitos morais/autorais.
  Conteúdos de terceiros não licenciados de forma compatível não devem ser incluídos.
  Referências a materiais externos devem ser linkadas e reescritas com palavras próprias.

<div align="center">

# 🎨 Galeria I.C.L

**Plataforma open-source de badges, SVGs e banners para perfis GitHub**

[![CI](https://github.com/icl/galeria/actions/workflows/ci.yml/badge.svg)](https://github.com/icl/galeria/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Node](https://img.shields.io/badge/Node-24.x-green.svg)](https://nodejs.org)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black.svg)](https://vercel.com)
[![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)](./package.json)
[![GitHub stars](https://img.shields.io/github/stars/icl/galeria?style=social)](https://github.com/icl/galeria)

[Demo](https://galeria-tau-ten.vercel.app) · [Galeria](https://galeria-tau-ten.vercel.app/galeria) · [Blog](https://galeria-tau-ten.vercel.app/blog) · [Documentação](./docs/)

</div>

---

## Sumário

- [Sobre](#sobre)
- [Recursos Principais](#recursos-principais)
- [Início Rápido](#início-rápido)
- [Uso](#uso)
- [Configuração](#configuração)
- [Desenvolvimento](#desenvolvimento)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Licença](#licença)
- [Contato](#contato)

---

## Sobre

Galeria I.C.L oferece uma coleção completa de SVGs, badges e banners prontos para personalizar perfis GitHub. Com APIs dinâmicas para estatísticas e uma galeria interativa, o projeto combina performance, acessibilidade e código aberto.

---

## Recursos Principais

- **Galeria de SVGs** — badges, banners e ícones por categoria
- **APIs dinâmicas** — GitHub Stats, Top Languages, Visitor Counter
- **Blog em MDX** — conteúdo educativo com SEO otimizado
- **Temas personalizáveis** — dark, light, neon, sunset, ocean, forest
- **100% Open Source** — MIT License, código transparente

---

## Início Rápido

### Pré-requisitos

- Node.js 24.x
- npm ou yarn

### Instalação

```bash
git clone https://github.com/icl/galeria.git
cd galeria
npm install
cp .env.example .env.local  # opcional
npm run dev
```

Acesse: http://localhost:3000

---

## Uso

### Exemplos rápidos

**Badge SVG:**

```md
![Badge](https://galeria-tau-ten.vercel.app/api/svg/badges/skills/langs/badge-typescript.svg)
```

**Banner:**

```md
![Banner](https://galeria-tau-ten.vercel.app/api/svg/banner/capa-1.svg?width=100%)
```

**Contador de visitantes:**

```md
![Visitors](https://galeria-tau-ten.vercel.app/api/visitors/icl/badge.svg)
```

**Estatísticas GitHub:**

```md
![GitHub Stats](https://galeria-tau-ten.vercel.app/api/github-stats/icl?theme=dark&width=600)
```

### Parâmetros comuns

| Parâmetro | Exemplo        | Descrição           |
| --------- | -------------- | ------------------- |
| `width`   | `300` ou `80%` | Largura em px ou %  |
| `height`  | `120`          | Altura em px        |
| `theme`   | `dark`, `neon` | Tema visual do card |

**Temas disponíveis:** dark · light · neon · sunset · ocean · forest

> Documentação completa: [docs/](./docs)

---

## Configuração

### Variáveis de ambiente

**Recomendadas para produção:**

- `GITHUB_TOKEN` — aumenta limites de requisição da API GitHub (evita erro 429)
- `UPSTASH_REDIS_REST_URL` — URL do Redis para contador de visitantes
- `UPSTASH_REDIS_REST_TOKEN` — token de autenticação do Redis

**Para desenvolvimento:** coloque em `.env.local`  
**Para produção:** configure no Vercel > Settings > Environment Variables

---

## Desenvolvimento

### Scripts principais

| Comando            | Descrição                         |
| ------------------ | --------------------------------- |
| `npm run dev`      | Servidor local (port 3000)        |
| `npm run build`    | Build de produção                 |
| `npm run start`    | Serve o build                     |
| `npm run lint`     | Verifica código (ESLint)          |
| `npm run lint:css` | Verifica CSS (Stylelint)          |
| `npm run fix:all`  | Formata e corrige automaticamente |

> Veja todos os scripts em [package.json](./package.json)

---

## Estrutura do Projeto

```
galeria/
├── app/               # Next.js App Router
│   ├── api/          # Endpoints (SVG, Stats, Visitors)
│   ├── blog/         # Páginas do blog
│   ├── galeria/      # Galeria interativa
│   └── components/   # Componentes React
├── content/posts/     # Posts em MDX
├── docs/              # Documentação
├── lib/               # Utilitários e geração de SVGs
├── public/            # Assets (SVGs, ícones, imagens)
└── scripts/           # Automações
```

---

## Contribuição

Contribuições são bem-vindas! Siga o guia em [CONTRIBUTING.md](./CONTRIBUTING.md).

### Fluxo básico

1. **Fork** o repositório
2. **Crie uma branch** para sua feature: `git checkout -b feature/descricao`
3. **Faça commits** com Conventional Commits: `git commit -m "feat: descrição"`
4. **Valide** o código: `npm run fix:all && npm run lint`
5. **Abra um Pull Request** com descrição clara

---

## Troubleshooting

### HTTP 429 — Rate Limit do GitHub

**Problema:** Sem `GITHUB_TOKEN`, o limite é apenas 60 requisições/hora.

**Solução:**

1. Crie um [Personal Access Token](https://github.com/settings/tokens) com escopo `public_repo`
2. Configure no Vercel: **Settings → Environment Variables**
3. Redeploy a aplicação

### Outros Problemas

Consulte a [documentação de debugging](./docs) ou [abra uma issue](https://github.com/icl/galeria/issues).

---

## Roadmap

- Integrações com GitLab e Bitbucket
- Temas customizáveis via API
- Sistema de templates para badges
- Analytics integrado
- Suporte a múltiplos idiomas
- App mobile

---

## Licença

MIT — veja [LICENSE](./LICENSE)

Auditoria de dependências: [docs/AUDITORIA-LICENCAS.md](./docs/AUDITORIA-LICENCAS.md)

---

## Contato

- **Site:** https://galeria-tau-ten.vercel.app
- **GitHub:** https://github.com/icl
- **Issues:** https://github.com/icl/galeria/issues

---

# icl
