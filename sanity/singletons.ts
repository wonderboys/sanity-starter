export const singletonTypes = [
  'siteSettings',
  'navigation',
  'footer',
  'seoSettings',
  'redirects',
  'analytics',
  'privacySettings'
] as const;

export const singletonItems: Array<{
  title: string;
  type: (typeof singletonTypes)[number];
  id: string;
}> = [
  { title: 'Site Settings', type: 'siteSettings', id: 'siteSettings' },
  { title: 'Navigation', type: 'navigation', id: 'navigation' },
  { title: 'Footer', type: 'footer', id: 'footer' },
  { title: 'SEO Settings', type: 'seoSettings', id: 'seoSettings' },
  { title: 'Redirects', type: 'redirects', id: 'redirects' },
  { title: 'Analytics', type: 'analytics', id: 'analytics' },
  { title: 'Privacy Settings', type: 'privacySettings', id: 'privacySettings' }
];
