import { defineArrayMember, defineField, defineType } from 'sanity';

export const footerSchema = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'columns',
      title: 'Columns',
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
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [{ type: 'link' }]
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string'
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'showSocialLinks',
      title: 'Show Social Links',
      type: 'boolean',
      initialValue: false
    })
  ]
});
