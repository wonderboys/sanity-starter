import { groq } from 'next-sanity';

const contactProjection = groq`
  _id,
  name,
  role,
  email,
  phone,
  image,
  address,
  categories,
  sortOrder,
  body
`;

export const postProjection = groq`
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  image,
  categories,
  authorName,
  body,
  seo
`;

const pageComponentsProjection = groq`
  ...,
  _type == "contactBlock" => {
    ...,
    contacts[]->{
      ${contactProjection}
    },
    "categoryContacts": select(
      defined(contactCategory) => *[_type == "contact" && ^.contactCategory in categories]
        | order(coalesce(sortOrder, 999999) asc, name asc){
          ${contactProjection}
        },
      []
    )
  },
  _type == "postsTeaserBlock" => {
    ...,
    "posts": *[
      _type == "post"
      && defined(slug.current)
      && (!defined(^.category) || ^.category in categories)
    ] | order(publishedAt desc){
      ${postProjection}
    }
  },
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
`;

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
    body,
    slug,
    seo,
    pageComponents[]{
      ${pageComponentsProjection}
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
    body,
    slug,
    seo,
    pageComponents[]{
      ${pageComponentsProjection}
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

export const seoSettingsQuery = groq`
  *[_type == "seoSettings"][0]{
    defaultSeo,
    noIndex,
    titleTemplate
  }
`;

export const allPostSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][]{
    "slug": slug.current
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    ${postProjection}
  }
`;

export const postCategoriesQuery = groq`
  array::unique(*[_type == "post" && defined(categories)].categories[])
`;

export const postArchiveQuery = groq`
  *[
    _type == "post"
    && defined(slug.current)
    && (!defined($category) || $category == "" || $category in categories)
  ] | order(publishedAt desc){
    ${postProjection}
  }
`;
