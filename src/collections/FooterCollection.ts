import type { CollectionConfig } from 'payload';

export const FooterCollection: CollectionConfig = {
  slug: 'footer',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: () => true, // Allow all users to create; modify as needed.
    read: () => true,   // Allow all users to read; modify as needed.
    update: () => true, // Allow all users to update; modify as needed.
    delete: () => true, // Allow all users to delete; modify as needed.
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      defaultValue: 'Footer',
    },
    {
      name: 'navigationItems',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media', // Ensure you have a 'media' collection set up.
        },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'address',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'textarea',
      required: true,
    },
  ],
};
