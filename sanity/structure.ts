import type { StructureResolver } from 'sanity/structure';
import { singletonItems, singletonTypes } from './singletons';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !singletonTypes.includes(
            (listItem.getId() || '') as (typeof singletonTypes)[number]
          )
      ),
      S.divider(),
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items(
              singletonItems.map((item) =>
                S.listItem()
                  .title(item.title)
                  .child(S.document().schemaType(item.type).documentId(item.id))
              )
            )
        )
    ]);
