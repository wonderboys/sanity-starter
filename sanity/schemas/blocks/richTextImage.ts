import { defineField, defineType } from 'sanity';

import { imageWithAltFields } from '../objects/imageWithAlt';

export const richTextImageSchema = defineType({
  name: 'richTextImage',
  title: 'Rich Text Image',
  type: 'object',
  fields: imageWithAltFields,
  preview: {
    select: {
      title: 'caption',
      media: 'image'
    },
    prepare(selection) {
      return {
        title: selection.title || 'Image',
        media: selection.media
      };
    }
  }
});
