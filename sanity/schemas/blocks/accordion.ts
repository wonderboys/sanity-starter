import { defineArrayMember, defineField, defineType } from 'sanity';

export const accordionBlockSchema = defineType({
  name: 'accordion',
  title: 'Accordion',
  type: 'object',
  fields: [
    defineField({ name: 'internalTitle', title: 'Internal Title', type: 'string' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required()
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'richText',
              validation: (rule) => rule.required()
            })
          ]
        })
      ]
    })
  ]
});
