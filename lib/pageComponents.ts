import { createElement } from 'react';
import type { ReactNode } from 'react';
import type { ComponentType } from 'react';

import { AccordionBlock } from '@/components/blocks/AccordionBlock';
import { CallToActionBlock } from '@/components/blocks/CallToActionBlock';
import { CardsSectionBlock } from '@/components/blocks/CardsSectionBlock';
import { ContactBlock } from '@/components/blocks/ContactBlock';
import { EmbedBlock } from '@/components/blocks/EmbedBlock';
import { HeroBlock } from '@/components/blocks/HeroBlock';
import { ImageSectionBlock } from '@/components/blocks/ImageSectionBlock';
import { PostsTeaserBlock } from '@/components/blocks/PostsTeaserBlock';
import { TextSectionBlock } from '@/components/blocks/TextSectionBlock';

type PageComponentValue = {
  _type: string;
  _key?: string;
};

type GenericBlockComponent = ComponentType<{ value: unknown }>;

const pageComponentMap: Record<string, GenericBlockComponent> = {
  hero: HeroBlock as unknown as GenericBlockComponent,
  textSection: TextSectionBlock as unknown as GenericBlockComponent,
  imageSection: ImageSectionBlock as unknown as GenericBlockComponent,
  callToAction: CallToActionBlock as unknown as GenericBlockComponent,
  cardsSection: CardsSectionBlock as unknown as GenericBlockComponent,
  accordion: AccordionBlock as unknown as GenericBlockComponent,
  embed: EmbedBlock as unknown as GenericBlockComponent,
  contactBlock: ContactBlock as unknown as GenericBlockComponent,
  postsTeaserBlock: PostsTeaserBlock as unknown as GenericBlockComponent
};

export function renderPageComponent(component: PageComponentValue, index: number): ReactNode {
  const Block = pageComponentMap[component._type];

  if (!Block) {
    return null;
  }

  return createElement(Block, { value: component, key: component._key || String(index) });
}
