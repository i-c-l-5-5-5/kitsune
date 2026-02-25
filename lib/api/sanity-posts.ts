import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Post } from "@/tipos/blog";

interface SanityPost {
  _id: string;
  slug: { current: string };
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  image?: {
    asset: {
      _ref: string;
    };
    hotspot?: unknown;
  };
  videoUrl?: string;
  published: boolean;
}

/**
 * Busca todos os posts publicados do Sanity
 * @returns Array de posts do Sanity
 */
export async function getAllSanityPosts(): Promise<Post[]> {
  const sanityPosts = await client.fetch<SanityPost[]>(
    `*[_type == "post" && published == true] | order(publishedAt desc)`,
  );

  return sanityPosts.map((post) => convertSanityPostToPost(post));
}

/**
 * Busca um post específico do Sanity pelo slug
 * @param slug - Slug do post
 * @returns Post do Sanity ou null se não encontrado
 */
export async function getSanityPostBySlug(slug: string): Promise<Post | null> {
  const sanityPost = await client.fetch<SanityPost | null>(
    `*[_type == "post" && slug.current == $slug && published == true][0]`,
    { slug },
  );

  if (!sanityPost) {
    return null;
  }

  return convertSanityPostToPost(sanityPost);
}

/**
 * Busca posts por categoria do Sanity
 * @param category - Categoria
 * @returns Array de posts da categoria
 */
export async function getSanityPostsByCategory(
  category: string,
): Promise<Post[]> {
  const sanityPosts = await client.fetch<SanityPost[]>(
    `*[_type == "post" && category == $category && published == true] | order(publishedAt desc)`,
    { category },
  );

  return sanityPosts.map((post) => convertSanityPostToPost(post));
}

/**
 * Busca posts por tag do Sanity
 * @param tag - Tag
 * @returns Array de posts com a tag
 */
export async function getSanityPostsByTag(tag: string): Promise<Post[]> {
  const sanityPosts = await client.fetch<SanityPost[]>(
    `*[_type == "post" && tags[] == $tagName && published == true] | order(publishedAt desc)`,
    { tagName: tag },
  );

  return sanityPosts.map((post) => convertSanityPostToPost(post));
}

/**
 * Retorna todas as categorias únicas do Sanity
 */
export async function getAllSanityCategoriesDistinct(): Promise<string[]> {
  const categories = await client.fetch<string[]>(
    `array::unique(*[_type == "post" && published == true].category) | sort()`,
  );

  return categories;
}

/**
 * Retorna todas as tags únicas do Sanity
 */
export async function getAllSanityTagsDistinct(): Promise<string[]> {
  const tags = await client.fetch<string[]>(
    `array::unique(*[_type == "post" && published == true][].tags[]) | sort()`,
  );

  return tags;
}

/**
 * Converte um post do Sanity para o formato Post do projeto
 */
function convertSanityPostToPost(sanityPost: SanityPost): Post {
  const slug = sanityPost.slug.current;
  const content = sanityPost.content;
  const readingTime = calculateReadingTime(content);

  return {
    slug,
    title: sanityPost.title,
    description: sanityPost.description,
    date: sanityPost.publishedAt,
    author: sanityPost.author,
    category: sanityPost.category,
    tags: sanityPost.tags || [],
    image: sanityPost.image ? urlFor(sanityPost.image).url() : undefined,
    videoUrl: sanityPost.videoUrl,
    published: sanityPost.published,
    content,
    readingTime,
  };
}

/**
 * Calcula o tempo estimado de leitura baseado na contagem de palavras
 */
function calculateReadingTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min de leitura`;
}
