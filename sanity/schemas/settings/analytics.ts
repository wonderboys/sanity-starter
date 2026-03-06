import { defineField, defineType } from 'sanity';

export const analyticsSchema = defineType({
  name: 'analytics',
  title: 'Analytics',
  type: 'document',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'provider',
      title: 'Provider',
      type: 'string',
      options: {
        list: [
          { title: 'Plausible', value: 'plausible' },
          { title: 'None', value: 'none' },
          { title: 'GA4', value: 'ga4' }
        ],
        layout: 'radio'
      },
      initialValue: 'plausible',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'plausibleDomain',
      title: 'Plausible Domain',
      type: 'string',
      hidden: ({ parent }) => (parent as { provider?: string } | undefined)?.provider !== 'plausible'
    }),
    defineField({
      name: 'gaMeasurementId',
      title: 'GA Measurement ID',
      type: 'string',
      hidden: ({ parent }) => (parent as { provider?: string } | undefined)?.provider !== 'ga4'
    })
  ]
});
