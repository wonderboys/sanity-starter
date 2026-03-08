import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { portableTextComponents } from '@/lib/portableText';
import { sanityClient } from '@/lib/sanity.client';

const builder = imageUrlBuilder(sanityClient);

export type ContactCardValue = {
  _id?: string;
  _key?: string;
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  address?: string;
  sortOrder?: number;
  body?: unknown;
  image?: {
    image?: SanityImageSource;
    alt?: string;
    decorative?: boolean;
    caption?: string;
    credit?: string;
  };
};

type ContactCardProps = {
  contact: ContactCardValue;
  showImage?: boolean;
  showRole?: boolean;
};

export function ContactCard({ contact, showImage = true, showRole = true }: ContactCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5">
      {showImage && contact.image?.image ? (
        <Image
          src={builder.image(contact.image.image).width(720).height(720).fit('crop').url()}
          alt={contact.image.decorative ? '' : (contact.image.alt ?? '')}
          width={720}
          height={720}
          className="mb-4 aspect-square w-full rounded-lg object-cover"
        />
      ) : null}

      {contact.name ? <h3 className="text-xl font-semibold text-slate-950">{contact.name}</h3> : null}
      {showRole && contact.role ? <p className="mt-1 text-sm text-slate-600">{contact.role}</p> : null}

      {contact.email || contact.phone || contact.address ? (
        <address className="mt-4 not-italic text-slate-800">
          {contact.email ? (
            <p>
              <a href={`mailto:${contact.email}`} className="underline underline-offset-2 hover:text-slate-700">
                {contact.email}
              </a>
            </p>
          ) : null}
          {contact.phone ? (
            <p className="mt-2">
              <a href={`tel:${contact.phone}`} className="underline underline-offset-2 hover:text-slate-700">
                {contact.phone}
              </a>
            </p>
          ) : null}
          {contact.address ? <p className="mt-2 whitespace-pre-line">{contact.address}</p> : null}
        </address>
      ) : null}

      {contact.body ? (
        <div className="mt-4 text-slate-700">
          <PortableText
            value={contact.body as Parameters<typeof PortableText>[0]['value']}
            components={portableTextComponents}
          />
        </div>
      ) : null}
    </article>
  );
}
