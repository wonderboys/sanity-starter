import { notFound } from 'next/navigation';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PortableTextRenderer } from '@/components/PortableTextRenderer';
import { sanityClient } from '@/lib/sanity.client';
import {
  allPostSlugsQuery,
  postBySlugQuery,
  seoSettingsQuery,
  siteSettingsQuery
} from '@/lib/sanity.queries';

const builder = imageUrlBuilder(sanityClient);

type Params = {
  slug: string;
};

type ImageWithAlt = {
  image?: SanityImageSource;
  alt?: string;
  decorative?: boolean;
};

type PostData = {
  title?: string;
  excerpt?: string;
  publishedAt?: string;
  image?: ImageWithAlt;
  categories?: string[];
  body?: unknown;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: ImageWithAlt;
  };
};

type SiteSettings = {
  siteName?: string;
  defaultOgImage?: ImageWithAlt;
};

type SeoSettings = {
  defaultSeo?: {
    description?: string;
    ogImage?: ImageWithAlt;
  };
};

function formatDate(value?: string) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(value));
}

function getOpenGraphImage(
  post: PostData | null,
  seoSettings: SeoSettings | null,
  siteSettings: SiteSettings | null
) {
  const imageSource =
    post?.seo?.ogImage?.image ||
    post?.image?.image ||
    seoSettings?.defaultSeo?.ogImage?.image ||
    siteSettings?.defaultOgImage?.image ||
    undefined;

  return imageSource ? builder.image(imageSource).width(1200).height(630).fit('crop').url() : undefined;
}

export async function generateStaticParams() {
  const posts = await sanityClient.fetch<Array<{ slug: string }>>(allPostSlugsQuery);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const [post, siteSettings, seoSettings] = await Promise.all([
    sanityClient.fetch<PostData | null>(postBySlugQuery, { slug: params.slug }),
    sanityClient.fetch<SiteSettings | null>(siteSettingsQuery),
    sanityClient.fetch<SeoSettings | null>(seoSettingsQuery)
  ]);

  if (!post) {
    return {};
  }

  const siteTitle = siteSettings?.siteName ?? 'Company Website';
  const title = `${post.seo?.title ?? post.title ?? 'Nyhet'} | ${siteTitle}`;
  const description = post.seo?.description ?? post.excerpt ?? seoSettings?.defaultSeo?.description;
  const openGraphImage = getOpenGraphImage(post, seoSettings, siteSettings);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
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

export default async function PostPage({ params }: { params: Params }) {
  const [post, settings] = await Promise.all([
    sanityClient.fetch<PostData | null>(postBySlugQuery, { slug: params.slug }),
    sanityClient.fetch<SiteSettings | null>(siteSettingsQuery)
  ]);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header siteTitle={settings?.siteName ?? 'Company Website'} />
      <main id="main-content" className="min-h-[70vh]">
        <article className="mx-auto max-w-3xl px-6 py-12">
          {post.categories?.length ? (
            <p className="text-sm font-medium text-slate-600">{post.categories.join(', ')}</p>
          ) : null}
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">{post.title}</h1>
          {post.publishedAt ? <p className="mt-4 text-sm text-slate-600">{formatDate(post.publishedAt)}</p> : null}
          {post.excerpt ? <p className="mt-6 text-lg text-slate-700">{post.excerpt}</p> : null}
          {post.image?.image ? (
            <Image
              src={builder.image(post.image.image).width(1600).height(1000).fit('max').url()}
              alt={post.image.decorative ? '' : (post.image.alt ?? '')}
              width={1600}
              height={1000}
              className="mt-8 h-auto w-full rounded-xl"
            />
          ) : null}
          {post.body ? (
            <div className="mt-8">
              <PortableTextRenderer value={post.body} />
            </div>
          ) : null}
        </article>
      </main>
      <Footer />
    </>
  );
}
