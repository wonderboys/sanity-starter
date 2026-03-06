import Link from 'next/link';
import { PortableText } from '@portabletext/react';

import { portableTextComponents } from '@/lib/portableText';

type ContactBlockValue = {
  title?: string;
  body?: unknown;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
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

export function ContactBlock({ value }: { value: ContactBlockValue }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      {value.title ? <h2 className="text-3xl font-semibold text-slate-950">{value.title}</h2> : null}
      <div className="mt-5 grid gap-8 md:grid-cols-2">
        <div>
          {value.body ? (
            <PortableText
              value={value.body as Parameters<typeof PortableText>[0]['value']}
              components={portableTextComponents}
            />
          ) : null}

          {value.ctas?.length ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {value.ctas.map((cta, index) => {
                const href =
                  cta.link?.externalUrl ||
                  (cta.link?.internalReference?.slug?.current
                    ? `/${cta.link.internalReference.slug.current}`
                    : null);

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
        </div>

        <address className="not-italic text-slate-800">
          {value.contactName ? <p className="font-semibold text-slate-950">{value.contactName}</p> : null}
          {value.email ? (
            <p className="mt-2">
              <a href={`mailto:${value.email}`} className="underline underline-offset-2 hover:text-slate-700">
                {value.email}
              </a>
            </p>
          ) : null}
          {value.phone ? (
            <p className="mt-2">
              <a href={`tel:${value.phone}`} className="underline underline-offset-2 hover:text-slate-700">
                {value.phone}
              </a>
            </p>
          ) : null}
          {value.address ? <p className="mt-2 whitespace-pre-line">{value.address}</p> : null}
        </address>
      </div>
    </section>
  );
}
