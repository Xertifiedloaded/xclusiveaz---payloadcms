import type { CollectionConfig } from 'payload';
export const HeaderCollection: CollectionConfig = {
    slug: 'header',
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
        defaultValue: 'Header', //text
      },
      {
        name: 'logo',
        type: 'upload',
        relationTo: 'media', // Logo
        required: true,
      },
      {
        name: 'ctaButton',
        type: 'group',
        fields: [
          {
            name: 'text',
            type: 'text',
          },
          {
            name: 'link',
            type: 'text',
          },
        ],
      },
    ],
  };
  