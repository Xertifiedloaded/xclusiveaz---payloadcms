import { CollectionConfig } from 'payload';

export const Carts: CollectionConfig = {
  slug: 'carts',
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
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data && !data.cartId) {
              return `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            }
            return data?.cartId;
          },
        ],
      },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
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
          min: 1,
          defaultValue: 1,
        },
        {
          name: 'selectedSize',
          type: 'select',
          required: true,
          options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        },
        {
          name: 'selectedColor',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'subtotal',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'createdAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          () => new Date().toISOString(),
        ],
      },
    },
    {
      name: 'updatedAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          () => new Date().toISOString(),
        ],
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (data && data.items && Array.isArray(data.items)) {
          let subtotal = 0;
          for (const item of data.items) {
            const product = await req.payload.findByID({
              collection: 'products',
              id: item.product,
            });
            if (product) {
              subtotal += product.price * item.quantity;
            }
          }
          data.subtotal = subtotal;
        }
        return data;
      },
    ],
  },
};

export default Carts;
