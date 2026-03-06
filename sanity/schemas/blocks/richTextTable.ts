import { defineArrayMember, defineField, defineType } from 'sanity';

export const richTextTableSchema = defineType({
  name: 'richTextTable',
  title: 'Rich Text Table',
  type: 'object',
  fields: [
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string'
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'cells',
              title: 'Cells',
              type: 'array',
              validation: (rule) => rule.required().min(1),
              of: [defineArrayMember({ type: 'string' })]
            })
          ]
        })
      ]
    })
  ]
});
