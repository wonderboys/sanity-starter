import { defineArrayMember, defineField, defineType } from 'sanity';

export const richTextSchema = defineType({
  name: 'richText',
  title: 'Rich Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Blockquote', value: 'blockquote' }
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' }
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' }
        ],
        annotations: [
          defineField({
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
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
                const internalReference =
                  (value as { internalReference?: unknown } | undefined)?.internalReference;
                const externalUrl = (value as { externalUrl?: string } | undefined)?.externalUrl;

                if (!internalReference && !externalUrl) {
                  return 'Set an internal reference or an external URL.';
                }

                return true;
              })
          })
        ]
      }
    }),
    defineArrayMember({ type: 'richTextImage' }),
    defineArrayMember({ type: 'richTextTable' })
  ]
});
