import { type SchemaTypeDefinition } from 'sanity';

import { contactSchema } from './schemas/documents/contact';
import { pageSchema } from './schemas/documents/page';
import { postSchema } from './schemas/documents/post';
import { accordionBlockSchema } from './schemas/blocks/accordion';
import { callToActionBlockSchema } from './schemas/blocks/callToAction';
import { cardsSectionBlockSchema } from './schemas/blocks/cardsSection';
import { contactBlockSchema } from './schemas/blocks/contactBlock';
import { embedBlockSchema } from './schemas/blocks/embed';
import { heroBlockSchema } from './schemas/blocks/hero';
import { imageSectionBlockSchema } from './schemas/blocks/imageSection';
import { postsTeaserBlockSchema } from './schemas/blocks/postsTeaserBlock';
import { richTextSchema } from './schemas/blocks/richText';
import { richTextImageSchema } from './schemas/blocks/richTextImage';
import { richTextTableSchema } from './schemas/blocks/richTextTable';
import { textSectionBlockSchema } from './schemas/blocks/textSection';
import { ctaSchema } from './schemas/objects/cta';
import { imageWithAltSchema } from './schemas/objects/imageWithAlt';
import { linkSchema } from './schemas/objects/link';
import { seoFieldsSchema } from './schemas/objects/seoFields';
import { analyticsSchema } from './schemas/settings/analytics';
import { footerSchema } from './schemas/settings/footer';
import { navigationSchema } from './schemas/settings/navigation';
import { privacySettingsSchema } from './schemas/settings/privacySettings';
import { redirectsSchema } from './schemas/settings/redirects';
import { seoSettingsSchema } from './schemas/settings/seoSettings';
import { siteSettingsSchema } from './schemas/settings/siteSettings';

export const schemaTypes: SchemaTypeDefinition[] = [
  pageSchema,
  contactSchema,
  postSchema,
  heroBlockSchema,
  textSectionBlockSchema,
  imageSectionBlockSchema,
  callToActionBlockSchema,
  cardsSectionBlockSchema,
  accordionBlockSchema,
  embedBlockSchema,
  contactBlockSchema,
  postsTeaserBlockSchema,
  richTextSchema,
  richTextImageSchema,
  richTextTableSchema,
  siteSettingsSchema,
  seoFieldsSchema,
  imageWithAltSchema,
  linkSchema,
  ctaSchema,
  navigationSchema,
  footerSchema,
  seoSettingsSchema,
  redirectsSchema,
  analyticsSchema,
  privacySettingsSchema
];
