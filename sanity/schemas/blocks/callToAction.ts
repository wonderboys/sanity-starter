import { defineField, defineType } from 'sanity';

export const callToActionBlockSchema = defineType({
  name: 'callToAction',
  title: 'Call To Action',
  type: 'object',
  fields: [
    defineField({ name: 'internalTitle', title: 'Internal Title', type: 'string' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'richText' }),
    defineField({ name: 'ctas', title: 'CTAs', type: 'array', of: [{ type: 'cta' }] })
  ]
});
