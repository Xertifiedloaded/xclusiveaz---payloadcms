import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  })

  const headerData = await payload.find({
    collection: 'header',
  })
    
  const footerData = await payload.find({
    collection: 'footer',
  })
  const CategoriesData = await payload.find({
    collection: 'categories',
  })
  const LocationData = await payload.find({
    collection: 'locations',
  })

  const pageData = await payload.find({
    collection: 'pages',
  })

  const productData = await payload.find({
    collection: 'products',
  })

  const cartData = await payload.find({
    collection: 'carts',
  })

  const combinedData = {
    header: headerData?.docs?.length > 0 ? headerData.docs[0] : null,    
    footer: footerData?.docs?.length > 0 ? footerData.docs[0] : null,
    pages: pageData?.docs || [],
    locations: LocationData?.docs || [],
    products: productData?.docs || [],
    Categories: CategoriesData?.docs || [],
    carts: cartData?.docs?.length > 0 ? cartData.docs[0] : null,
  };
   
  return Response.json(combinedData)
}