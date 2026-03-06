import { defineField, defineType } from 'sanity';

export const seoSettingsSchema = defineType({
  name: 'seoSettings',
  title: 'SEO Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seoFields'
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'titleTemplate',
      title: 'Title Template',
      type: 'string'
    })
  ]
});
