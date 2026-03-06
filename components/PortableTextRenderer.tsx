import { PortableText } from '@portabletext/react';

import { portableTextComponents } from '@/lib/portableText';

type PortableTextRendererProps = {
  value: unknown;
};

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <PortableText
        value={value as Parameters<typeof PortableText>[0]['value']}
        components={portableTextComponents}
      />
    </div>
  );
}
