import { defineField, defineType } from 'sanity';

export const embedBlockSchema = defineType({
  name: 'embed',
  title: 'Embed',
  type: 'object',
  fields: [
    defineField({ name: 'internalTitle', title: 'Internal Title', type: 'string' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'embedType',
      title: 'Embed Type',
      type: 'string',
      options: {
        list: [
          { title: 'IFrame', value: 'iframe' },
          { title: 'Video', value: 'video' },
          { title: 'Map', value: 'map' },
          { title: 'Custom', value: 'custom' }
        ],
        layout: 'dropdown'
      },
      validation: (rule) => rule.required()
    }),
    defineField({ name: 'url', title: 'URL', type: 'url' }),
    defineField({ name: 'code', title: 'Code', type: 'text', rows: 6 })
  ]
});
