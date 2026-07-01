import { defineType, defineField } from 'sanity';

/** Team & governance — used on About and as author references. */
export const staffMember = defineType({
  name: 'staffMember',
  title: 'Team member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'role', title: 'Role', type: 'localeString' }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'bio', title: 'Bio', type: 'localeText' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 100,
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'role.en', media: 'photo' } },
});
