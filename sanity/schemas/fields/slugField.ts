import { defineField } from 'sanity';

type SlugFieldOptions = {
  source?: string;
  name?: string;
  title?: string;
  group?: string | string[];
};

function toUrlSlug(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function slugField(options: SlugFieldOptions = {}) {
  const { source = 'title', name = 'slug', title = 'Slug', group } = options;

  return defineField({
    name,
    title,
    group,
    type: 'slug',
    options: {
      source,
      slugify: (input: string) => toUrlSlug(input).slice(0, 96),
      isUnique: (slug, context) => context.defaultIsUnique(slug, context)
    },
    validation: (rule) =>
      rule.required().custom((value) => {
        const current = (value as { current?: string } | undefined)?.current;

        if (!current) {
          return 'Slug is required.';
        }

        if (current !== toUrlSlug(current)) {
          return 'Slug must be lowercase and URL-safe.';
        }

        return true;
      })
  });
}
