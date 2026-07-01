import { defineType, defineField } from 'sanity';

/**
 * Event — the core of the "Dynamic Events" module. Date range drives the
 * On View / Upcoming / Past tiers on the front end.
 */
export const event = defineType({
  name: 'event',
  title: 'Event',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Exhibition', value: 'exhibition' },
          { title: 'Screening', value: 'screening' },
          { title: 'Performance', value: 'performance' },
          { title: 'Talk', value: 'talk' },
          { title: 'Workshop', value: 'workshop' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'startDate',
      title: 'Start date',
      type: 'datetime',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End date',
      type: 'datetime',
      validation: (r) => r.required().min(r.valueOfField('startDate')),
    }),
    defineField({
      name: 'space',
      title: 'Space',
      type: 'reference',
      to: [{ type: 'space' }],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),
    defineField({ name: 'summary', title: 'Summary', type: 'localeText' }),
    defineField({ name: 'body', title: 'Body', type: 'blockContent' }),
    defineField({
      name: 'ticketUrl',
      title: 'Ticket / RSVP URL',
      type: 'url',
      description: 'External ticketing link, if applicable.',
    }),
    defineField({
      name: 'freeEntry',
      title: 'Free entry',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'ticketTypes',
      title: 'Ticket types',
      description:
        'Add one or more ticket types to enable ticketing/RSVP for this event. Price 0 = free RSVP.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'ticketType',
          fields: [
            { name: 'name', title: 'Name', type: 'localeString' },
            {
              name: 'price',
              title: 'Price (in Birr)',
              type: 'number',
              initialValue: 0,
              validation: (r) => r.min(0),
            },
            { name: 'currency', title: 'Currency', type: 'string', initialValue: 'ETB' },
            {
              name: 'capacity',
              title: 'Capacity',
              type: 'number',
              description: 'Leave blank for unlimited.',
              validation: (r) => r.min(0),
            },
          ],
          preview: { select: { title: 'name.en', subtitle: 'price' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'category', media: 'heroImage' },
  },
});
