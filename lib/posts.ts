import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post, PostMetadata } from '@/tipos/blog';
import { getAllSanityPosts, getSanityPostBySlug } from './api/sanity-posts';

// Re-export para manter compatibilidade
export type { Post, PostMetadata };

const postsDirectory = path.join(process.cwd(), 'content/posts');

/**
 * Retorna a lista de arquivos .mdx no diretório de posts
 * @returns Array com nomes dos arquivos de posts
 */
function getPostFiles(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'));
}

/**
 * Faz o parsing de um arquivo de post MDX
 * @param filename - Nome do arquivo a ser parseado
 * @returns Objeto Post com metadados e conteúdo
 */
function parsePostFile(filename: string): Post {
  const slug = filename.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: (data['title'] as string) ?? '',
    description: (data['description'] as string) ?? '',
    date: (data['date'] as string) ?? '',
    author: (data['author'] as string) ?? 'I.C.L',
    category: (data['category'] as string) ?? 'Geral',
    tags: (data['tags'] as string[]) ?? [],
    image: data['image'] as string | undefined,
    videoUrl: data['videoUrl'] as string | undefined,
    published: data['published'] !== false,
    content,
    readingTime: calculateReadingTime(content),
  };
}

/**
 * Retorna todos os posts publicados (MDX + Sanity), ordenados por data (mais recentes primeiro)
 * @returns Array de metadados dos posts
 */
export async function getAllPosts(): Promise<PostMetadata[]> {
  try {
    // Obter posts do MDX
    const mdxFiles = getPostFiles();
    const mdxPosts = mdxFiles
      .map((filename) => parsePostFile(filename))
      .filter((post) => post.published === true);

    // Obter posts do Sanity
    const sanityPosts = await getAllSanityPosts();

    // Mesclar e desduplicar posts
    const allPosts = [...mdxPosts, ...sanityPosts];
    const uniquePosts = deduplicatePosts(allPosts);

    // Ordenar por data (mais recentes primeiro)
    uniquePosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    return uniquePosts.map(
      ({ content, readingTime, published, ...metadata }) => ({
        ...metadata,
        readingTime: readingTime || '1 min de leitura',
        published: published === true,
      }),
    );
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    // Fallback: retornar apenas posts MDX
    const mdxFiles = getPostFiles();
    const posts = mdxFiles
      .map((filename) => parsePostFile(filename))
      .filter((post) => post.published === true)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts.map(({ ...metadata }) => metadata);
  }
}

/**
 * Busca um post específico pelo slug (MDX ou Sanity)
 * @param slug - Identificador único do post (nome do arquivo sem extensão)
 * @returns Post completo com conteúdo, ou null se não encontrado
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Tentar buscar do MDX primeiro
  try {
    const filename = `${slug}.mdx`;
    const post = parsePostFile(filename);
    if (post.published === true) {
      return post;
    }
  } catch {
    // Arquivo MDX não encontrado, tenter Sanity
  }

  // Buscar do Sanity
  try {
    const sanityPost = await getSanityPostBySlug(slug);
    if (sanityPost && sanityPost.published === true) {
      return sanityPost;
    }
  } catch (error) {
    console.error('Erro ao buscar post do Sanity:', error);
  }

  return null;
}

/**
 * Retorna o conteúdo completo de um post (alias para getPostBySlug)
 * @param slug - Identificador único do post
 * @returns Post completo com conteúdo, ou null se não encontrado
 * @deprecated Use getPostBySlug diretamente
 */
export async function getPostContent(slug: string): Promise<Post | null> {
  return getPostBySlug(slug);
}

/**
 * Filtra posts por categoria
 * @param category - Nome da categoria
 * @returns Array de posts da categoria especificada
 */
export async function getPostsByCategory(
  category: string,
): Promise<PostMetadata[]> {
  try {
    const allPosts = await getAllPosts();
    return allPosts.filter((post) => post.category === category);
  } catch (error) {
    console.error('Erro ao filtrar posts por categoria:', error);
    return [];
  }
}

/**
 * Filtra posts por tag
 * @param tag - Nome da tag
 * @returns Array de posts que contêm a tag especificada
 */
export async function getPostsByTag(tag: string): Promise<PostMetadata[]> {
  try {
    const allPosts = await getAllPosts();
    return allPosts.filter((post) => post.tags.includes(tag));
  } catch (error) {
    console.error('Erro ao filtrar posts por tag:', error);
    return [];
  }
}

/**
 * Retorna lista única de todas as categorias usadas nos posts (MDX + Sanity)
 * @returns Array de categorias em ordem alfabética
 */
export async function getAllCategories(): Promise<string[]> {
  try {
    const allPosts = await getAllPosts();
    const categories = new Set(allPosts.map((post) => post.category));
    return Array.from(categories).sort();
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }
}

/**
 * Retorna lista única de todas as tags usadas nos posts (MDX + Sanity)
 * @returns Array de tags em ordem alfabética
 */
export async function getAllTags(): Promise<string[]> {
  try {
    const allPosts = await getAllPosts();
    const tags = new Set(allPosts.flatMap((post) => post.tags));
    return Array.from(tags).sort();
  } catch (error) {
    console.error('Erro ao buscar tags:', error);
    return [];
  }
}

/**
 * Remove posts duplicados pela slug
 * Prioriza posts do MDX sobre Sanity se tiverem a mesma slug
 */
function deduplicatePosts(posts: Post[]): Post[] {
  const seen = new Set<string>();
  return posts.filter((post) => {
    if (seen.has(post.slug)) {
      return false;
    }
    seen.add(post.slug);
    return true;
  });
}

/**
 * Calcula o tempo estimado de leitura baseado na contagem de palavras
 * @param content - Conteúdo do post em texto
 * @returns Texto formatado com tempo de leitura (ex: "5 min de leitura")
 */
function calculateReadingTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min de leitura`;
}
