import { defineArrayMember, defineField, defineType } from 'sanity';

export const contactSchema = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string'
    }),
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
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt'
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      description: 'Use normalized values like booking, board, press, team, or general.',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number'
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'richText'
    })
  ],
  preview: {
    select: {
      name: 'name',
      role: 'role',
      categories: 'categories',
      media: 'image.image'
    },
    prepare({ name, role, categories, media }) {
      const subtitle = role || categories?.join(', ') || undefined;

      return {
        title: name || 'Untitled contact',
        subtitle,
        media
      };
    }
  }
});
