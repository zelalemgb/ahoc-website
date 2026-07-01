import { defineType, defineField } from 'sanity';

/** News & Stories — blog posts, interviews, programme recaps. */
export const newsPost = defineType({
  name: 'newsPost',
  title: 'News / Story',
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
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'staffMember' }],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'localeText' }),
    defineField({ name: 'body', title: 'Body', type: 'blockContent' }),
  ],
  orderings: [
    {
      title: 'Newest',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: { select: { title: 'title.en', subtitle: 'publishedAt', media: 'coverImage' } },
});
