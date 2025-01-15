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
  const pageData = await payload.find({
    collection: 'pages',
  })
  const productData = await payload.find({
    collection: 'products',
  })
  const combinedData = {
    header: headerData?.docs?.length > 0 ? headerData.docs[0] : null, 
    footer: footerData?.docs?.length > 0 ? footerData.docs[0] : null,
    pages: pageData?.docs?.length > 0 ? pageData.docs[0] : null,
    products: productData?.docs?.length > 0 ? productData.docs[0] : null,
  };


  return Response.json(combinedData)
}
