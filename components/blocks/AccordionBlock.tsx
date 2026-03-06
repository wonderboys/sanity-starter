import { PortableText } from '@portabletext/react';

import { portableTextComponents } from '@/lib/portableText';

type AccordionBlockValue = {
  title?: string;
  items?: Array<{
    _key?: string;
    title?: string;
    body?: unknown;
  }>;
};

export function AccordionBlock({ value }: { value: AccordionBlockValue }) {
  if (!value.items?.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      {value.title ? <h2 className="text-3xl font-semibold text-slate-950">{value.title}</h2> : null}
      <div className="mt-6 space-y-3">
        {value.items.map((item, index) => (
          <details key={item._key || `${index}`} className="rounded-lg border border-slate-200 p-4">
            <summary className="cursor-pointer font-medium text-slate-900">{item.title}</summary>
            {item.body ? (
              <div className="mt-3">
                <PortableText
                  value={item.body as Parameters<typeof PortableText>[0]['value']}
                  components={portableTextComponents}
                />
              </div>
            ) : null}
          </details>
        ))}
      </div>
    </section>
  );
}
