import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { media } from 'sanity-plugin-media';

import { schemaTypes } from './schemaTypes';
import { singletonTypes } from './singletons';
import { structure } from './structure';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.');
}

if (!dataset) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET environment variable.');
}

if (!apiVersion) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_API_VERSION environment variable.');
}

export default defineConfig({
  name: 'default',
  title: 'Website Studio',
  projectId,
  dataset,
  apiVersion,
  basePath: '/studio',
  plugins: [structureTool({ structure }), visionTool(), media()],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) =>
          !singletonTypes.includes(schemaType as (typeof singletonTypes)[number])
      )
  }
});
