import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Conteúdo',
      type: 'text',
      description: 'Escreva o conteúdo em Markdown ou HTML',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Tutorial', value: 'tutorial' },
          { title: 'Tips', value: 'tips' },
          { title: 'Development', value: 'development' },
          { title: 'Design', value: 'design' },
          { title: 'Geral', value: 'geral' },
        ],
      },
      initialValue: 'geral',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
      initialValue: 'I.C.L',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de Publicação',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL do Vídeo',
      type: 'url',
      description: 'URL do vídeo (YouTube, Vimeo, etc)',
    }),
    defineField({
      name: 'published',
      title: 'Publicado',
      type: 'boolean',
      initialValue: true,
      description: 'Controla se o post é visível no blog',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      image: 'image',
    },
  },
});
