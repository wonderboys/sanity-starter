import { defineField, defineType } from 'sanity';

import { slugField } from '../fields/slugField';

export const pageSchema = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    { name: 'admin', title: 'Admin' },
    { name: 'header', title: 'Page Header' },
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' }
  ],
  fields: [
    defineField({
      name: 'internalTitle',
      title: 'Internal Title',
      type: 'string',
      group: 'admin',
      validation: (rule) => rule.required()
    }),
    slugField({ source: 'internalTitle', group: 'admin' }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      group: 'admin',
      initialValue: 'default',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Home', value: 'home' }
        ],
        layout: 'radio'
      },
      validation: (rule) =>
        rule.required().custom(async (value, context) => {
          if (value !== 'home') {
            return true;
          }

          const documentId = context.document?._id;

          if (!documentId) {
            return true;
          }

          const publishedId = documentId.replace(/^drafts\./, '');
          const draftId = `drafts.${publishedId}`;
          const client = context.getClient({ apiVersion: '2024-01-01' });

          const existingHome = await client.fetch<string | null>(
            `*[_type == "page" && pageType == "home" && !(_id in [$draftId, $publishedId])][0]._id`,
            { draftId, publishedId }
          );

          if (existingHome) {
            return 'Only one page can have pageType set to home.';
          }

          return true;
        })
    }),
    defineField({
      name: 'indexedDocumentType',
      title: 'Indexed Document Type',
      type: 'string',
      group: 'admin'
    }),
    defineField({
      name: 'showPageHeader',
      title: 'Show Page Header',
      type: 'boolean',
      group: 'header',
      initialValue: true
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'header'
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'header'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'header'
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'imageWithAlt',
      group: 'header'
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'richText',
      group: 'content'
    }),
    defineField({
      name: 'pageComponents',
      title: 'Page Components',
      type: 'array',
      group: 'content',
      of: [
        { type: 'hero' },
        { type: 'textSection' },
        { type: 'imageSection' },
        { type: 'callToAction' },
        { type: 'cardsSection' },
        { type: 'accordion' },
        { type: 'embed' },
        { type: 'contactBlock' },
        { type: 'postsTeaserBlock' }
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
      group: 'seo'
    })
  ],
  preview: {
    select: {
      internalTitle: 'internalTitle',
      title: 'title',
      slug: 'slug.current'
    },
    prepare({ internalTitle, title, slug }) {
      return {
        title: internalTitle || title || 'Untitled page',
        subtitle: slug ? `/${slug}` : undefined
      };
    }
  }
});
