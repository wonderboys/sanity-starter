import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PostArchive } from '@/components/posts/PostArchive';
import { sanityClient } from '@/lib/sanity.client';
import {
  postArchiveQuery,
  postCategoriesQuery,
  seoSettingsQuery,
  siteSettingsQuery
} from '@/lib/sanity.queries';

const builder = imageUrlBuilder(sanityClient);

type SearchParams = {
  kategori?: string;
};

type ImageWithAlt = {
  image?: SanityImageSource;
  alt?: string;
  decorative?: boolean;
};

type PostArchiveItem = {
  _id?: string;
  title?: string;
  slug?: {
    current?: string;
  };
  excerpt?: string;
  publishedAt?: string;
  image?: ImageWithAlt;
  categories?: string[];
};

type SiteSettings = {
  siteName?: string;
  defaultOgImage?: ImageWithAlt;
};

type SeoSettings = {
  defaultSeo?: {
    title?: string;
    description?: string;
    ogImage?: ImageWithAlt;
  };
};

export async function generateMetadata() {
  const [siteSettings, seoSettings] = await Promise.all([
    sanityClient.fetch<SiteSettings | null>(siteSettingsQuery),
    sanityClient.fetch<SeoSettings | null>(seoSettingsQuery)
  ]);

  const siteTitle = siteSettings?.siteName ?? 'Company Website';
  const title = `Nyheter | ${siteTitle}`;
  const description =
    seoSettings?.defaultSeo?.description ?? 'Senaste nyheterna och uppdateringarna från verksamheten.';
  const openGraphImageSource =
    seoSettings?.defaultSeo?.ogImage?.image || siteSettings?.defaultOgImage?.image || undefined;
  const openGraphImage = openGraphImageSource ? builder.image(openGraphImageSource).width(1200).height(630).fit('crop').url() : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: openGraphImage ? [{ url: openGraphImage }] : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: openGraphImage ? [openGraphImage] : undefined
    }
  };
}

export default async function NewsArchivePage({
  searchParams
}: {
  searchParams?: SearchParams;
}) {
  const selectedCategory = searchParams?.kategori || undefined;
  const [posts, categories, settings] = await Promise.all([
    sanityClient.fetch<PostArchiveItem[]>(postArchiveQuery, { category: selectedCategory ?? '' }),
    sanityClient.fetch<string[]>(postCategoriesQuery),
    sanityClient.fetch<SiteSettings | null>(siteSettingsQuery)
  ]);

  return (
    <>
      <Header siteTitle={settings?.siteName ?? 'Company Website'} />
      <main id="main-content" className="min-h-[70vh]">
        <PostArchive
          posts={posts}
          categories={(categories ?? []).filter(Boolean).sort((left, right) => left.localeCompare(right))}
          selectedCategory={selectedCategory}
        />
      </main>
      <Footer />
    </>
  );
}
