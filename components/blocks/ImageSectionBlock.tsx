import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { portableTextComponents } from '@/lib/portableText';
import { sanityClient } from '@/lib/sanity.client';

const builder = imageUrlBuilder(sanityClient);

type ImageSectionBlockValue = {
  title?: string;
  image?: {
    image?: SanityImageSource;
    alt?: string;
    decorative?: boolean;
    caption?: string;
    credit?: string;
  };
  body?: unknown;
  imagePosition?: 'top' | 'bottom';
};

export function ImageSectionBlock({ value }: { value: ImageSectionBlockValue }) {
  if (!value.image?.image) {
    return null;
  }

  const imageElement = (
    <figure>
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
  );

  const textElement = value.title || value.body ? (
    <div>
      {value.title ? <h2 className="text-3xl font-semibold text-slate-950">{value.title}</h2> : null}
      {value.body ? (
        <div className="mt-4">
          <PortableText
            value={value.body as Parameters<typeof PortableText>[0]['value']}
            components={portableTextComponents}
          />
        </div>
      ) : null}
    </div>
  ) : null;

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      {value.imagePosition === 'bottom' ? (
        <>
          {textElement}
          <div className={textElement ? 'mt-8' : ''}>{imageElement}</div>
        </>
      ) : (
        <>
          {imageElement}
          {textElement ? <div className="mt-8">{textElement}</div> : null}
        </>
      )}
    </section>
  );
}
