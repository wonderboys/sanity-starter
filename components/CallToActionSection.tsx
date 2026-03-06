import Link from 'next/link';

type CallToActionSectionProps = {
  heading: string;
  body?: string;
  action: {
    text: string;
    link: {
      label?: string;
      externalUrl?: string;
      internalReference?: {
        slug?: {
          current?: string;
        };
      };
      newTab?: boolean;
    };
    variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  };
};

export function CallToActionSection({ heading, body, action }: CallToActionSectionProps) {
  const href = action.link.externalUrl ?? `/${action.link.internalReference?.slug?.current ?? ''}`;
  const isExternal = Boolean(action.link.externalUrl);
  const variantClass =
    action.variant === 'secondary'
      ? 'bg-slate-700 text-white hover:bg-slate-600'
      : action.variant === 'ghost'
        ? 'bg-transparent text-slate-900 border border-slate-300 hover:bg-slate-200'
        : action.variant === 'link'
          ? 'bg-transparent text-slate-900 underline hover:text-slate-700 px-0 py-0'
          : 'bg-slate-900 text-white hover:bg-slate-800';

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="rounded-2xl bg-slate-100 p-8">
        <h2 className="text-2xl font-semibold text-slate-950">{heading}</h2>
        {body ? <p className="mt-3 text-slate-700">{body}</p> : null}
        <div className="mt-6">
          <Link
            href={href}
            target={action.link.newTab ? '_blank' : undefined}
            rel={action.link.newTab && isExternal ? 'noopener noreferrer' : undefined}
            className={`inline-flex items-center rounded-md px-4 py-2 ${variantClass}`}
          >
            {action.text}
          </Link>
        </div>
      </div>
    </section>
  );
}
