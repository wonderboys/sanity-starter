import { groq } from 'next-sanity';

export const homePageQuery = groq`
  *[_type == "page" && pageType == "home"][0]{
    _id,
    internalTitle,
    pageType,
    indexedDocumentType,
    showPageHeader,
    eyebrow,
    title,
    description,
    heroImage,
    slug,
    seo,
    pageComponents[]{
      ...,
      ctas[]{
        ...,
        link{
          ...,
          internalReference->{
            slug
          }
        }
      },
      items[]{
        ...,
        link{
          ...,
          internalReference->{
            slug
          }
        }
      }
    }
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    internalTitle,
    pageType,
    indexedDocumentType,
    showPageHeader,
    eyebrow,
    title,
    description,
    heroImage,
    slug,
    seo,
    pageComponents[]{
      ...,
      ctas[]{
        ...,
        link{
          ...,
          internalReference->{
            slug
          }
        }
      },
      items[]{
        ...,
        link{
          ...,
          internalReference->{
            slug
          }
        }
      }
    }
  }
`;

export const allPageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current) && pageType != "home"][]{
    "slug": slug.current
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    siteName,
    siteUrl,
    defaultOgImage,
    socialLinks
  }
`;
