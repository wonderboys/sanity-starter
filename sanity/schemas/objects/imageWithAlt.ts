import { defineField, defineType } from 'sanity';

export const imageWithAltFields = [
  defineField({
    name: 'image',
    title: 'Image',
    type: 'image',
    options: { hotspot: true }
  }),
  defineField({
    name: 'alt',
    title: 'Alt Text',
    type: 'string',
    validation: (rule) =>
      rule.custom((value, context) => {
        const image = (context.parent as { image?: unknown } | undefined)?.image;
        const decorative = (context.parent as { decorative?: boolean } | undefined)?.decorative;

        if (image && !decorative && !value) {
          return 'Alt text is required unless the image is decorative.';
        }

        return true;
      })
  }),
  defineField({
    name: 'decorative',
    title: 'Decorative',
    type: 'boolean',
    initialValue: false
  }),
  defineField({
    name: 'caption',
    title: 'Caption',
    type: 'string'
  }),
  defineField({
    name: 'credit',
    title: 'Credit',
    type: 'string'
  })
];

export const imageWithAltSchema = defineType({
  name: 'imageWithAlt',
  title: 'Image With Alt',
  type: 'object',
  fields: imageWithAltFields
});
