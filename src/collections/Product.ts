
import { CollectionConfig } from 'payload';

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'status'],
  },
  access: {
    read: () => true, 
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'sizes',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'size',
          type: 'select',
          options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        },
        {
          name: 'inventory',
          type: 'number',
          min: 0,
          required: true,
        },
      ],
    },
    {
      name: 'colors',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'color',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'published', 'outOfStock', 'discontinued'],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  hooks: {
    afterRead: [
      async ({ doc }) => {
        if (doc.images && doc.images.length > 0) {
          doc.images = await Promise.all(
            doc.images.map(async (image: { image: { filename: string } }) => {
              const imageUrl = `${process.env.PUBLIC_URL}/media/${image.image.filename}`;
              return {
                ...image,
                imageUrl, 
              };
            })
          );
        }
        return doc;
      },
    ],
  },
};
