import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { sanityClient } from '@/lib/sanity.client';

const builder = imageUrlBuilder(sanityClient);

type ImageSectionProps = {
  image: {
    image?: unknown;
    alt?: string;
    decorative?: boolean;
    caption?: string;
    credit?: string;
  };
};

export function ImageSection({ image }: ImageSectionProps) {
  if (!image.image) {
    return null;
  }

  const src = builder.image(image.image as SanityImageSource).width(1600).height(900).fit('max').url();
  const alt = image.decorative ? '' : (image.alt ?? 'Section image');

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <figure>
        <Image src={src} alt={alt} width={1600} height={900} className="h-auto w-full rounded-xl" />
        {image.caption ? (
          <figcaption className="mt-3 text-sm text-slate-600">
            {image.caption}
            {image.credit ? ` - ${image.credit}` : ''}
          </figcaption>
        ) : null}
      </figure>
    </section>
  );
}
