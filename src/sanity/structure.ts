import type { StructureResolver } from 'sanity/structure';

/**
 * Studio desk layout. Pins the singleton Site Settings to the top and groups
 * the content types AHOC editors work with day-to-day.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('event').title('Events'),
      S.documentTypeListItem('space').title('Spaces'),
      S.documentTypeListItem('newsPost').title('News & Stories'),
      S.documentTypeListItem('page').title('Pages'),
      S.documentTypeListItem('staffMember').title('Team'),
    ]);
