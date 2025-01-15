import type { CollectionConfig } from 'payload';

export const Cart: CollectionConfig = {
  slug: 'cart',
  admin: {
    useAsTitle: 'cartId',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'cartId',
      type: 'text',
      required: true,
      unique: true, 
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          defaultValue: 1,
        },
      ],
    },
    {
      name: 'total',
      type: 'number',
      required: true,
    },
  ],
};
