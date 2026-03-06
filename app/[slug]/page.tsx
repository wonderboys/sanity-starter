import { notFound } from 'next/navigation';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ImageSection } from '@/components/ImageSection';
import { buildMetadata } from '@/lib/metadata';
import { renderPageComponent } from '@/lib/pageComponents';
import { sanityClient } from '@/lib/sanity.client';
import { allPageSlugsQuery, pageBySlugQuery, siteSettingsQuery } from '@/lib/sanity.queries';

type Params = {
  slug: string;
};

type ImageWithAlt = {
  image?: unknown;
  alt?: string;
  decorative?: boolean;
  caption?: string;
  credit?: string;
};

type PageComponent = {
  _type: string;
  _key?: string;
};

type PageData = {
  internalTitle: string;
  title?: string;
  description?: string;
  eyebrow?: string;
  showPageHeader?: boolean;
  heroImage?: ImageWithAlt;
  seo?: {
    title?: string;
    description?: string;
  };
  pageComponents?: PageComponent[];
};

type SiteSettings = {
  siteName?: string;
};

export async function generateStaticParams() {
  const pages = await sanityClient.fetch<Array<{ slug: string }>>(allPageSlugsQuery);
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const [page, settings] = await Promise.all([
    sanityClient.fetch<PageData | null>(pageBySlugQuery, { slug: params.slug }),
    sanityClient.fetch<SiteSettings | null>(siteSettingsQuery)
  ]);

  if (!page) {
    return {};
  }

  return buildMetadata(
    {
      title: settings?.siteName ?? 'Company Website',
      description: 'A Next.js and Sanity website starter.'
    },
    {
      title: page.seo?.title ?? page.title ?? page.internalTitle,
      description: page.seo?.description
    }
  );
}

export default async function SlugPage({ params }: { params: Params }) {
  const [page, settings] = await Promise.all([
    sanityClient.fetch<PageData | null>(pageBySlugQuery, { slug: params.slug }),
    sanityClient.fetch<SiteSettings | null>(siteSettingsQuery)
  ]);

  if (!page) {
    notFound();
  }

  const siteTitle = settings?.siteName ?? 'Company Website';
  const displayedTitle = page.title || page.internalTitle;

  return (
    <>
      <Header siteTitle={siteTitle} />
      <main id="main-content" className="min-h-[70vh]">
        {page.showPageHeader !== false ? (
          <>
            <section className="mx-auto max-w-5xl px-6 pt-14">
              {page.eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">{page.eyebrow}</p>
              ) : null}
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">{displayedTitle}</h1>
              {page.description ? (
                <p className="mt-4 max-w-3xl text-lg text-slate-700">{page.description}</p>
              ) : null}
            </section>
            {page.heroImage?.image ? <ImageSection image={page.heroImage} /> : null}
          </>
        ) : null}

        {page.pageComponents?.map((component, index) => renderPageComponent(component, index))}
      </main>
      <Footer />
    </>
  );
}
