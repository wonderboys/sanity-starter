import Link from 'next/link';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { sanityClient } from '@/lib/sanity.client';

const builder = imageUrlBuilder(sanityClient);

export type PostCardValue = {
  _id?: string;
  title?: string;
  slug?: {
    current?: string;
  };
  excerpt?: string;
  publishedAt?: string;
  image?: {
    image?: SanityImageSource;
    alt?: string;
    decorative?: boolean;
  };
  categories?: string[];
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

export function PostCard({ post }: { post: PostCardValue }) {
  const href = post.slug?.current ? `/nyheter/${post.slug.current}` : null;
  const publishedLabel = formatDate(post.publishedAt);

  if (!href) {
    return null;
  }

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5">
      {post.image?.image ? (
        <Link href={href} className="block">
          <Image
            src={builder.image(post.image.image).width(1200).height(800).fit('crop').url()}
            alt={post.image.decorative ? '' : (post.image.alt ?? '')}
            width={1200}
            height={800}
            className="mb-4 h-auto w-full rounded-lg"
          />
        </Link>
      ) : null}

      {publishedLabel || post.categories?.length ? (
        <p className="text-sm text-slate-600">
          {[publishedLabel, post.categories?.[0]].filter(Boolean).join(' · ')}
        </p>
      ) : null}

      <h2 className="mt-2 text-xl font-semibold text-slate-950">
        <Link href={href} className="hover:text-slate-700">
          {post.title || 'Untitled post'}
        </Link>
      </h2>

      {post.excerpt ? <p className="mt-3 text-slate-700">{post.excerpt}</p> : null}

      <div className="mt-4">
        <Link href={href} className="text-slate-900 underline underline-offset-2 hover:text-slate-700">
          Las mer
        </Link>
      </div>
    </article>
  );
}
