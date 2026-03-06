type EmbedBlockValue = {
  title?: string;
  embedType?: 'iframe' | 'video' | 'map' | 'custom';
  url?: string;
  code?: string;
};

function isSafeHttpUrl(value?: string) {
  if (!value) {
    return false;
  }

  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function EmbedBlock({ value }: { value: EmbedBlockValue }) {
  const safeUrl = isSafeHttpUrl(value.url) ? value.url : null;

  if (!value.embedType) {
    return null;
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      {value.title ? <h2 className="mb-4 text-3xl font-semibold text-slate-950">{value.title}</h2> : null}

      {(value.embedType === 'iframe' || value.embedType === 'video' || value.embedType === 'map') && safeUrl ? (
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-slate-200">
          <iframe
            src={safeUrl}
            title={value.title || 'Embedded content'}
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer"
            allowFullScreen
          />
        </div>
      ) : null}

      {value.embedType === 'custom' && value.code ? (
        <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800">
          <code>{value.code}</code>
        </pre>
      ) : null}
    </section>
  );
}
