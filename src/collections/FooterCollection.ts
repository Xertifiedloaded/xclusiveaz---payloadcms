import type { CollectionConfig } from 'payload';

export const FooterCollection: CollectionConfig = {
  slug: 'footer',
  admin: {
    useAsTitle: 'name',
    
  },
  access: {
    read: () => true,   
    update: () => true,

  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      defaultValue: 'Footer',
      admin: {
        description: 'The name of this footer section',
      },
    },
    {
      name: 'navigationItems',
      type: 'array',
      admin: {
        description: 'Add navigation links for the footer',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'The text to display for this link',
          },
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          admin: {
            description: 'The URL this link should navigate to',
          },
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      admin: {
        description: 'Add social media links',
      },
      fields: [
        {
          name: 'platform',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of the social media platform',
          },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            description: 'URL to your social media profile',
          },
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Icon for this social media platform',
          },
        },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      admin: {
        description: 'Contact information details',
      },
      fields: [
        {
          name: 'email',
          type: 'email',
          admin: {
            description: 'Contact email address',
          },
        },
        {
          name: 'phone',
          type: 'text',
          admin: {
            description: 'Contact phone number',
          },
        },
        {
          name: 'address',
          type: 'textarea',
          admin: {
            description: 'Physical address',
          },
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Copyright text to display in the footer',
      },
    },
  ],
};
