import { defineType, defineField } from 'sanity';

/** Generic editorial page (About, Visit, Support, etc.). */
export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.en', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'body', title: 'Body', type: 'blockContent' }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', type: 'string', title: 'Meta title' }),
        defineField({ name: 'metaDescription', type: 'text', rows: 2, title: 'Meta description' }),
      ],
    }),
  ],
  preview: { select: { title: 'title.en', subtitle: 'slug.current' } },
});
