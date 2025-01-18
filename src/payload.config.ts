// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Product'
import { Categories } from './collections/Categories'
import { Orders } from './collections/Order'
import { Customers } from './collections/Customer'
import { Pages } from './collections/Pages'
import { Discounts } from './collections/Discount'
import { HeaderCollection } from './collections/HeaderCollection'
import { FooterCollection } from './collections/FooterCollection'
import { cloudinaryAdapter } from './lib/CloudinaryAdapter'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage';
import {uploadthingStorage} from '@payloadcms/storage-uploadthing';
import Carts from './collections/Cart'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
  baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Products, Categories, Orders, Customers, Pages, Discounts,HeaderCollection,FooterCollection,Carts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    uploadthingStorage({
      collections: {
        media: true,
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN,
        acl: 'public-read',
      },
    }),
    
  ],

  // plugins: [
  //   payloadCloudPlugin(),
  //   // storage-adapter-placeholder
  // ],
})
