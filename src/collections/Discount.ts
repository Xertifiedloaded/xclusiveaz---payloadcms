import type { CollectionConfig } from 'payload';

export const Discounts: CollectionConfig = {
  slug: 'discounts',
  admin: {
    useAsTitle: 'code',
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'type',
      type: 'select',
      options: ['percentage', 'fixed'],
      required: true,
    },
    {
      name: 'value',
      type: 'number',
      required: true,
    },
    {
      name: 'validFrom',
      type: 'date',
      required: true,
    },
    {
      name: 'validUntil',
      type: 'date',
      required: true,
    },
    {
      name: 'minimumPurchase',
      type: 'number',
      min: 0,
    },
    {
      name: 'active',
      type: 'checkbox',  
      defaultValue: true,
    },
  ],
};
