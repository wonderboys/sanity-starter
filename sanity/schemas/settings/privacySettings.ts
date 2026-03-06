import { defineField, defineType } from 'sanity';

export const privacySettingsSchema = defineType({
  name: 'privacySettings',
  title: 'Privacy Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'cookieConsentEnabled',
      title: 'Cookie Consent Enabled',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'gtmId',
      title: 'GTM ID',
      type: 'string'
    })
  ]
});
