import { defineArrayMember, defineField, defineType } from 'sanity';

export const cardsSectionBlockSchema = defineType({
  name: 'cardsSection',
  title: 'Cards Section',
  type: 'object',
  fields: [
    defineField({ name: 'internalTitle', title: 'Internal Title', type: 'string' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
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
            defineField({ name: 'text', title: 'Text', type: 'text', rows: 3 }),
            defineField({ name: 'image', title: 'Image', type: 'imageWithAlt' }),
            defineField({ name: 'link', title: 'Link', type: 'link' })
          ]
        })
      ]
    })
  ]
});
