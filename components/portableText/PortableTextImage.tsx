import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { sanityClient } from '@/lib/sanity.client';

const builder = imageUrlBuilder(sanityClient);

type PortableTextImageValue = {
  image?: SanityImageSource;
  alt?: string;
  decorative?: boolean;
  caption?: string;
  credit?: string;
};

export function PortableTextImage({ value }: { value: PortableTextImageValue }) {
  if (!value.image) {
    return null;
  }

  const src = builder.image(value.image).width(1400).height(900).fit('max').url();
  const alt = value.decorative ? '' : (value.alt ?? '');

  return (
    <figure className="my-8">
      <Image src={src} alt={alt} width={1400} height={900} className="h-auto w-full rounded-xl" />
      {value.caption ? (
        <figcaption className="mt-3 text-sm text-slate-600">
          {value.caption}
          {value.credit ? ` - ${value.credit}` : ''}
        </figcaption>
      ) : null}
    </figure>
  );
}
