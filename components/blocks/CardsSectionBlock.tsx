import Link from 'next/link';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { sanityClient } from '@/lib/sanity.client';

const builder = imageUrlBuilder(sanityClient);

type CardsSectionBlockValue = {
  title?: string;
  description?: string;
  items?: Array<{
    _key?: string;
    title?: string;
    text?: string;
    image?: {
      image?: SanityImageSource;
      alt?: string;
      decorative?: boolean;
    };
    link?: {
      label?: string;
      externalUrl?: string;
      internalReference?: {
        slug?: {
          current?: string;
        };
      };
      newTab?: boolean;
    };
  }>;
};

export function CardsSectionBlock({ value }: { value: CardsSectionBlockValue }) {
  if (!value.items?.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      {value.title ? <h2 className="text-3xl font-semibold text-slate-950">{value.title}</h2> : null}
      {value.description ? <p className="mt-3 max-w-3xl text-slate-700">{value.description}</p> : null}

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {value.items.map((item, index) => {
          const href =
            item.link?.externalUrl ||
            (item.link?.internalReference?.slug?.current ? `/${item.link.internalReference.slug.current}` : null);

          return (
            <article key={item._key || `${index}`} className="rounded-xl border border-slate-200 bg-white p-5">
              {item.image?.image ? (
                <Image
                  src={builder.image(item.image.image).width(900).height(600).fit('max').url()}
                  alt={item.image.decorative ? '' : (item.image.alt ?? '')}
                  width={900}
                  height={600}
                  className="mb-4 h-auto w-full rounded-lg"
                />
              ) : null}
              {item.title ? <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3> : null}
              {item.text ? <p className="mt-2 text-slate-700">{item.text}</p> : null}
              {href ? (
                <div className="mt-4">
                  <Link
                    href={href}
                    target={item.link?.newTab ? '_blank' : undefined}
                    rel={item.link?.newTab && item.link?.externalUrl ? 'noopener noreferrer' : undefined}
                    className="text-slate-900 underline underline-offset-2 hover:text-slate-700"
                  >
                    {item.link?.label || 'Learn more'}
                  </Link>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
