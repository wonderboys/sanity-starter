import type { Metadata } from 'next';

type SiteDefaults = {
  title: string;
  description: string;
};

type PageOverride = {
  title?: string;
  description?: string;
};

export function buildMetadata(defaults: SiteDefaults, override?: PageOverride): Metadata {
  const title = override?.title ? `${override.title} | ${defaults.title}` : defaults.title;
  const description = override?.description ?? defaults.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}
