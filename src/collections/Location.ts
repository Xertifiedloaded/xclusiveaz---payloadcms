import type { CollectionConfig } from 'payload';

const Location: CollectionConfig = {
  slug: 'locations',
  labels: {
    singular: 'Location',
    plural: 'Locations',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Location Name',
      required: true,
      unique: true,

    },
    {
      name: 'price',
      type: 'number',
      label: 'Price',
      required: true,

    },
  ],
  access: {
    read: () => true,   
    update: () => true,
  },

};

export default Location;
