import type { MetadataRoute } from 'next';

import { sanityClient } from '@/lib/sanity.client';
import { allPageSlugsQuery } from '@/lib/sanity.queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const pages = await sanityClient.fetch<Array<{ slug: string }>>(allPageSlugsQuery);

  const dynamicPages = pages
    .filter((page) => page.slug && page.slug !== 'home')
    .map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date()
    }));

  return [
    {
      url: baseUrl,
      lastModified: new Date()
    },
    ...dynamicPages
  ];
}
