import { defineArrayMember, defineField, defineType } from 'sanity';

export const redirectsSchema = defineType({
  name: 'redirects',
  title: 'Redirects',
  type: 'document',
  fields: [
    defineField({
      name: 'rules',
      title: 'Rules',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'from',
              title: 'From',
              type: 'string',
              validation: (rule) => rule.required()
            }),
            defineField({
              name: 'to',
              title: 'To',
              type: 'string',
              validation: (rule) => rule.required()
            }),
            defineField({
              name: 'status',
              title: 'Status',
              type: 'number',
              validation: (rule) =>
                rule.required().custom((value) => {
                  if (value === undefined || value === null) {
                    return true;
                  }

                  if ([301, 302, 307, 308].includes(value)) {
                    return true;
                  }

                  return 'Status must be one of: 301, 302, 307, 308.';
                })
            }),
            defineField({
              name: 'enabled',
              title: 'Enabled',
              type: 'boolean',
              initialValue: true
            })
          ]
        })
      ]
    })
  ]
});
