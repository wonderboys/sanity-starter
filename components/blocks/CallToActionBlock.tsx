import Link from 'next/link';
import { PortableText } from '@portabletext/react';

import { portableTextComponents } from '@/lib/portableText';

type CallToActionBlockValue = {
  title?: string;
  body?: unknown;
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

export function CallToActionBlock({ value }: { value: CallToActionBlockValue }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="rounded-2xl bg-slate-100 p-8">
        {value.title ? <h2 className="text-2xl font-semibold text-slate-950">{value.title}</h2> : null}
        {value.body ? (
          <div className="mt-3">
            <PortableText
              value={value.body as Parameters<typeof PortableText>[0]['value']}
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
      </div>
    </section>
  );
}
