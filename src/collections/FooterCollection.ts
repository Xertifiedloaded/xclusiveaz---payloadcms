import type { CollectionConfig } from 'payload';

export const FooterCollection: CollectionConfig = {
  slug: 'footer',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,   

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
