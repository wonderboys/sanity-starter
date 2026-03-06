import { defineField, defineType } from 'sanity';

export const ctaSchema = defineType({
  name: 'cta',
  title: 'Call To Action',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Ghost', value: 'ghost' },
          { title: 'Link', value: 'link' }
        ],
        layout: 'dropdown'
      },
      initialValue: 'primary',
      validation: (rule) => rule.required()
    })
  ]
});
