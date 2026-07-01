import type { SchemaTypeDefinition } from 'sanity';

import { localeString, localeText } from './localeString';
import { blockContent } from './blockContent';
import { event } from './event';
import { space } from './space';
import { page } from './page';
import { newsPost } from './newsPost';
import { staffMember } from './staffMember';
import { siteSettings } from './siteSettings';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // objects
    localeString,
    localeText,
    blockContent,
    // documents
    siteSettings,
    event,
    space,
    page,
    newsPost,
    staffMember,
  ],
};
