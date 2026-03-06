import React from 'react';
import Link from 'next/link';
import type { PortableTextComponents } from '@portabletext/react';

import { PortableTextImage } from '@/components/portableText/PortableTextImage';
import { PortableTextTable } from '@/components/portableText/PortableTextTable';

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => React.createElement('p', { className: 'my-4 leading-7 text-slate-800' }, children),
    h2: ({ children }) =>
      React.createElement('h2', { className: 'mt-10 mb-4 text-3xl font-semibold text-slate-950' }, children),
    h3: ({ children }) =>
      React.createElement('h3', { className: 'mt-8 mb-3 text-2xl font-semibold text-slate-950' }, children),
    blockquote: ({ children }) =>
      React.createElement(
        'blockquote',
        { className: 'my-6 border-l-4 border-slate-300 pl-4 italic text-slate-700' },
        children
      )
  },
  list: {
    bullet: ({ children }) => React.createElement('ul', { className: 'my-4 list-disc space-y-2 pl-6' }, children),
    number: ({ children }) =>
      React.createElement('ol', { className: 'my-4 list-decimal space-y-2 pl-6' }, children)
  },
  marks: {
    link: ({ children, value }) => {
      const href =
        value?.externalUrl ||
        (value?.internalReference?.slug?.current ? `/${value.internalReference.slug.current}` : null);

      if (!href) {
        return React.createElement(React.Fragment, null, children);
      }

      return React.createElement(
        Link,
        {
          href,
          target: value?.newTab ? '_blank' : undefined,
          rel: value?.newTab && value?.externalUrl ? 'noopener noreferrer' : undefined,
          className:
            'underline decoration-slate-400 underline-offset-2 hover:decoration-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2'
        },
        children
      );
    }
  },
  types: {
    richTextImage: ({ value }) =>
      React.createElement(PortableTextImage, {
        value: value as Parameters<typeof PortableTextImage>[0]['value']
      }),
    richTextTable: ({ value }) =>
      React.createElement(PortableTextTable, {
        value: value as Parameters<typeof PortableTextTable>[0]['value']
      })
  },
  unknownType: () => null,
  unknownMark: ({ children }) => React.createElement(React.Fragment, null, children)
};
