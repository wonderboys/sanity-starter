import { defineField, defineType } from 'sanity';

export const seoFieldsSchema = defineType({
  name: 'seoFields',
  title: 'SEO Fields',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url'
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'imageWithAlt'
    })
  ]
});
