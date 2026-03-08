import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ImageSection } from '@/components/ImageSection';
import { PortableTextSection } from '@/components/PortableTextSection';
import { buildMetadata } from '@/lib/metadata';
import { renderPageComponent } from '@/lib/pageComponents';
import { sanityClient } from '@/lib/sanity.client';
import { homePageQuery, siteSettingsQuery } from '@/lib/sanity.queries';

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
  body?: unknown;
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

async function getData() {
  const [page, settings] = await Promise.all([
    sanityClient.fetch<PageData | null>(homePageQuery),
    sanityClient.fetch<SiteSettings | null>(siteSettingsQuery)
  ]);

  return {
    page,
    settings: settings ?? null
  };
}

export async function generateMetadata() {
  const { page, settings } = await getData();

  return buildMetadata(
    {
      title: settings?.siteName ?? 'Company Website',
      description: 'A Next.js and Sanity website starter.'
    },
    {
      title: page?.seo?.title ?? page?.title ?? page?.internalTitle,
      description: page?.seo?.description
    }
  );
}

export default async function HomePage() {
  const { page, settings } = await getData();
  const siteTitle = settings?.siteName ?? 'Company Website';

  if (!page) {
    return (
      <>
        <Header siteTitle={siteTitle} />
        <main id="main-content" className="min-h-[70vh]">
          <HeroSection
            heading="Welcome"
            subheading="Create a page document with pageType set to home in Sanity to manage this content."
          />
        </main>
        <Footer />
      </>
    );
  }

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

        {page.body ? <PortableTextSection value={page.body} /> : null}
        {page.pageComponents?.map((component, index) => renderPageComponent(component, index))}
      </main>
      <Footer />
    </>
  );
}
