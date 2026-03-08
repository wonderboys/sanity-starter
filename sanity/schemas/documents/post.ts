import { defineArrayMember, defineField, defineType } from 'sanity';

import { slugField } from '../fields/slugField';

export const postSchema = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    slugField({ source: 'title' }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt'
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      description: 'Use simple values like news, press, updates, or events.',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string'
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'richText'
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields'
    })
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      categories: 'categories',
      media: 'image.image'
    },
    prepare({ title, publishedAt, categories, media }) {
      const dateLabel = publishedAt
        ? new Intl.DateTimeFormat('sv-SE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }).format(new Date(publishedAt))
        : undefined;
      const categoryLabel = Array.isArray(categories) && categories.length ? categories.join(', ') : undefined;

      return {
        title: title || 'Untitled post',
        subtitle: [dateLabel, categoryLabel].filter(Boolean).join(' - ') || undefined,
        media
      };
    }
  }
});
