
import { useEffect, useState } from 'react'



export const useCombinedData = () => {
  const [data, setData] = useState({
    header: null,
    footer: null,
    pages: [],    
    products: [], 
    locations: [], 
    carts: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCombinedData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/data')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const responseData = await response.json()
        const { header, footer, pages, products, carts,locations } = responseData
        
        setData({
          header: header || null,
          footer: footer || null,
          pages: Array.isArray(pages) ? pages : [],
          locations: Array.isArray(locations) ? locations : [],
          products: Array.isArray(products) ? products : [],
          carts: carts || null,
        })
      } catch (err) {
        setError(err)
        setData(prev => ({ 
          ...prev, 
          products: [],
          pages: [],
        }))
      } finally {
        setLoading(false)
      }
    }

    fetchCombinedData()
  }, [])

  return { ...data, loading, error }
}