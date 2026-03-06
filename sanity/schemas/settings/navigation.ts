import { defineField, defineType } from 'sanity';

export const navigationSchema = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'headerLinks',
      title: 'Header Links',
      type: 'array',
      of: [{ type: 'link' }]
    }),
    defineField({
      name: 'headerCta',
      title: 'Header CTA',
      type: 'cta'
    })
  ]
});
