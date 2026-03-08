import { defineField, defineType } from 'sanity';

export const postsTeaserBlockSchema = defineType({
  name: 'postsTeaserBlock',
  title: 'Posts Teaser Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Leave empty to show the latest posts across all categories.'
    }),
    defineField({
      name: 'limit',
      title: 'Limit',
      type: 'number',
      initialValue: 3,
      validation: (rule) => rule.min(1).max(12)
    }),
    defineField({
      name: 'showArchiveLink',
      title: 'Show Archive Link',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'archiveLinkLabel',
      title: 'Archive Link Label',
      type: 'string',
      description: 'Archive link points to the full news archive.'
    })
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      limit: 'limit'
    },
    prepare({ title, category, limit }) {
      return {
        title: title || 'Posts Teaser Block',
        subtitle: category
          ? `${category} · ${limit || 3} posts`
          : `Latest posts · ${limit || 3} posts`
      };
    }
  }
});
