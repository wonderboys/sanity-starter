import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { portableTextComponents } from '@/lib/portableText';
import { sanityClient } from '@/lib/sanity.client';

const builder = imageUrlBuilder(sanityClient);

type HeroBlockValue = {
  eyebrow?: string;
  title?: string;
  description?: unknown;
  image?: {
    image?: SanityImageSource;
    alt?: string;
    decorative?: boolean;
    caption?: string;
    credit?: string;
  };
  ctas?: Array<{
    text?: string;
    link?: {
      externalUrl?: string;
      internalReference?: {
        slug?: {
          current?: string;
        };
      };
      newTab?: boolean;
    };
    variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  }>;
};

export function HeroBlock({ value }: { value: HeroBlockValue }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-14">
      {value.eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">{value.eyebrow}</p>
      ) : null}

      {value.title ? <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">{value.title}</h2> : null}

      {value.description ? (
        <div className="mt-4 max-w-3xl">
          <PortableText
            value={value.description as Parameters<typeof PortableText>[0]['value']}
            components={portableTextComponents}
          />
        </div>
      ) : null}

      {value.ctas?.length ? (
        <div className="mt-6 flex flex-wrap gap-3">
          {value.ctas.map((cta, index) => {
            const href =
              cta.link?.externalUrl ||
              (cta.link?.internalReference?.slug?.current ? `/${cta.link.internalReference.slug.current}` : null);

            if (!href || !cta.text) {
              return null;
            }

            const variantClass =
              cta.variant === 'secondary'
                ? 'bg-slate-700 text-white hover:bg-slate-600'
                : cta.variant === 'ghost'
                  ? 'border border-slate-300 bg-transparent text-slate-900 hover:bg-slate-200'
                  : cta.variant === 'link'
                    ? 'bg-transparent p-0 text-slate-900 underline hover:text-slate-700'
                    : 'bg-slate-900 text-white hover:bg-slate-800';

            return (
              <Link
                key={`${href}-${index}`}
                href={href}
                target={cta.link?.newTab ? '_blank' : undefined}
                rel={cta.link?.newTab && cta.link?.externalUrl ? 'noopener noreferrer' : undefined}
                className={`inline-flex items-center rounded-md px-4 py-2 ${variantClass}`}
              >
                {cta.text}
              </Link>
            );
          })}
        </div>
      ) : null}

      {value.image?.image ? (
        <figure className="mt-8">
          <Image
            src={builder.image(value.image.image).width(1600).height(900).fit('max').url()}
            alt={value.image.decorative ? '' : (value.image.alt ?? '')}
            width={1600}
            height={900}
            className="h-auto w-full rounded-xl"
          />
          {value.image.caption ? (
            <figcaption className="mt-3 text-sm text-slate-600">
              {value.image.caption}
              {value.image.credit ? ` - ${value.image.credit}` : ''}
            </figcaption>
          ) : null}
        </figure>
      ) : null}
    </section>
  );
}
