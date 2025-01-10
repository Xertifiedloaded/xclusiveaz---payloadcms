import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'status'],
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
      relationTo: 'categories' as const,
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
        {
          name: 'colorCode',
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
    {
      name: 'specifications',
      type: 'group',
      fields: [
        {
          name: 'material',
          type: 'text',
        },
        {
          name: 'care',
          type: 'array',
          fields: [
            {
              name: 'instruction',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
