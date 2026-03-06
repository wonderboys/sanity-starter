import { defineField, defineType } from 'sanity';

export const contactBlockSchema = defineType({
  name: 'contactBlock',
  title: 'Contact Block',
  type: 'object',
  fields: [
    defineField({ name: 'internalTitle', title: 'Internal Title', type: 'string' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'richText' }),
    defineField({ name: 'contactName', title: 'Contact Name', type: 'string' }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) {
            return true;
          }

          return /^\S+@\S+\.\S+$/.test(value) ? true : 'Enter a valid email address.';
        })
    }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'text', rows: 3 }),
    defineField({ name: 'ctas', title: 'CTAs', type: 'array', of: [{ type: 'cta' }] })
  ]
});
