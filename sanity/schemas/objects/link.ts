import { defineField, defineType } from 'sanity';

export const linkSchema = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'internalReference',
      title: 'Internal Reference',
      type: 'reference',
      to: [{ type: 'page' }]
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url'
    }),
    defineField({
      name: 'newTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false
    })
  ],
  validation: (rule) =>
    rule.custom((value) => {
      const internalReference = (value as { internalReference?: unknown } | undefined)?.internalReference;
      const externalUrl = (value as { externalUrl?: string } | undefined)?.externalUrl;

      if ((internalReference && externalUrl) || (!internalReference && !externalUrl)) {
        return 'Define exactly one of internalReference or externalUrl.';
      }

      return true;
    })
});
