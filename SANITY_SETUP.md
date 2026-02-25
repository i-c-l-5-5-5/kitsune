# Integração Sanity CMS - Sistema de Posts

## ✅ Configuração Concluída

Seu projeto agora está configurado para usar **Sanity CMS** para gerenciar posts no blog, com suporte a:

- Posts criados no **Sanity Studio** (CMS)
- Posts em arquivo **MDX** (`content/posts/`)
- **Mesclagem automática** de ambas as fontes
- **Deduplicação** de posts por slug

## 🚀 Como Criar Posts

### Opção 1: Via Sanity Studio (Recomendado)

1. **Acesse o Studio**: <https://galeria-kitsune.sanity.studio/>

2. **Clique em "Post"** na barra lateral

3. **Preencha os campos:**
   - **Título**: Nome do post
   - **Slug**: URL-friendly (gerado automaticamente)
   - **Descrição**: Resumo do post
   - **Conteúdo**: Seu artigo (text/markdown)
   - **Categoria**: Selecione uma categoria
   - **Tags**: Adicione tags relevantes
   - **Autor**: Nome do autor (padrão: I.C.L)
   - **Data de Publicação**: Quando publicar
   - **Imagem**: Capa do post (opcional)
   - **URL do Vídeo**: Link do vídeo (opcional)
   - **Publicado**: Ativar/desativar visibilidade

4. **Salve** e o post aparecerá automaticamente no blog!

### Opção 2: Via Arquivo MDX

1. **Crie um arquivo** em `content/posts/seu-post.mdx`

2. **Adicione o frontmatter:**

```mdx
---
title: "Título do Post"
description: "Descrição breve"
date: "2026-02-24"
author: "Seu Nome"
category: "Tutorial"
tags: ["tag1", "tag2"]
published: true
image: "/url-imagem.jpg"
videoUrl: "https://youtube.com/watch?v=..."
---

# Seu conteúdo MDX aqui

Escreva com suporte a **markdown** e componentes React.
```

1. **Salve** e o post aparecerá no blog automaticamente!

## 🔄 Como Funciona a Integração

```
Blog Page (/blog)
    ↓
getAllPosts() [Função Unificada]
    ├→ Posts MDX (content/posts/*.mdx)
    └→ Posts Sanity (CMS)
    ↓
Mesclagem + Deduplicação
    ↓
Exibição no Blog
```

**Prioridade**: Se existir um post com a mesma slug em MDX e Sanity, o MDX é usado.

## 📝 Estrutura de tipos

Os posts suportam:

```typescript
interface Post {
  slug: string; // URL-friendly ID
  title: string; // Título
  description: string; // Resumo breve
  date: string; // Data de publicação
  author: string; // Autor
  category: string; // Categoria
  tags: string[]; // Tags
  image?: string; // URL da imagem
  videoUrl?: string; // URL do vídeo
  published: boolean; // Visibilidade
  content: string; // Conteúdo (markdown/HTML)
  readingTime?: string; // Tempo de leitura (auto-calculado)
}
```

## 🔗 URLs Úteis

- **Studio**: <https://galeria-kitsune.sanity.studio/>
- **Blog**: `/blog`
- **Posts por Categoria**: `/blog/category/[categoria]`
- **Posts por Tag**: `/blog/tag/[tag]`

## 🛠️ Desenvolvedor

Funções disponíveis em `lib/posts.ts`:

```typescript
// Buscar todos os posts (MDX + Sanity)
const posts = await getAllPosts();

// Buscar um post específico
const post = await getPostBySlug("meu-post");

// Filtrar por categoria
const categoryPosts = await getPostsByCategory("Tutorial");

// Filtrar por tag
const tagPosts = await getPostsByTag("javascript");

// Listar categorias
const categories = await getAllCategories();

// Listar tags
const tags = await getAllTags();
```

## ⚙️ Variáveis de Ambiente

Seu `.env.local` já contém:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="imclwpal"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2026-02-25"
```

## 🔄 Deploy do Studio

Para atualizar o Studio após mudanças:

```bash
npx sanity deploy
```
