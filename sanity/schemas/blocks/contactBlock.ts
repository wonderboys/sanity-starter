import { defineField, defineType } from 'sanity';

export const contactBlockSchema = defineType({
  name: 'contactBlock',
  title: 'Contact Block',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'contacts',
      title: 'Contacts',
      type: 'array',
      description: 'Manually choose one or more contacts. If set, these will be used instead of contact category.',
      of: [{ type: 'reference', to: [{ type: 'contact' }] }]
    }),
    defineField({
      name: 'contactCategory',
      title: 'Contact Category',
      type: 'string',
      description:
        'Show all contacts in a category. If both contacts and contact category are set, manually selected contacts will be used.'
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Stacked', value: 'stacked' },
          { title: 'Grid', value: 'grid' }
        ],
        layout: 'radio'
      },
      initialValue: 'stacked'
    }),
    defineField({
      name: 'showRole',
      title: 'Show Role',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'showImage',
      title: 'Show Image',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      contactCategory: 'contactCategory',
      contacts: 'contacts'
    },
    prepare({ title, contactCategory, contacts }) {
      const selectedCount = Array.isArray(contacts) ? contacts.length : 0;
      const subtitle =
        selectedCount > 0
          ? `${selectedCount} selected contact${selectedCount === 1 ? '' : 's'}`
          : contactCategory
            ? `Category: ${contactCategory}`
            : 'No contacts selected';

      return {
        title: title || 'Contact Block',
        subtitle
      };
    }
  }
});
