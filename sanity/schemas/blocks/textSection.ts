import { defineField, defineType } from 'sanity';

export const textSectionBlockSchema = defineType({
  name: 'textSection',
  title: 'Text Section',
  type: 'object',
  fields: [
    defineField({ name: 'internalTitle', title: 'Internal Title', type: 'string' }),
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'richText' }),
    defineField({ name: 'ctas', title: 'CTAs', type: 'array', of: [{ type: 'cta' }] })
  ]
});
