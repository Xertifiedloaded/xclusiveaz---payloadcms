// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'
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
import { stripePlugin } from '@payloadcms/plugin-stripe'
import Carts from './collections/Cart'
import Location from './collections/Location'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,

    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Products,
    Categories,
    Orders,
    Customers,
    Pages,
    Discounts,
    HeaderCollection,
    FooterCollection,
    Carts,
    Location,
  ],
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
    stripePlugin({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    }),

    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESSKEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESSKEY || '',
        },
        region: process.env.S3_REGION || '',
        endpoint: process.env.S3_ENDPOINT || '',
        forcePathStyle:true
      }
    }),
  ],

})
