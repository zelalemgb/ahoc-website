import { defineType, defineField } from 'sanity';

/**
 * A string authored in both site languages. Keeps EN/AM together on the
 * same document so editors translate in one place.
 */
export const localeString = defineType({
  name: 'localeString',
  title: 'Localised text',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'string' }),
    defineField({ name: 'am', title: 'Amharic (አማርኛ)', type: 'string' }),
  ],
});

export const localeText = defineType({
  name: 'localeText',
  title: 'Localised text (long)',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'text', rows: 4 }),
    defineField({ name: 'am', title: 'Amharic (አማርኛ)', type: 'text', rows: 4 }),
  ],
});
