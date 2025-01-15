import { PageData } from '@/types/types'
import { useState, useEffect } from 'react'
export function usePageData(slug: string) {
    const [pageData, setPageData] = useState<PageData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
  
    useEffect(() => {
      const fetchPage = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/pages?slug=${slug}`)
          if (!response.ok) {
            throw new Error(`Failed to fetch page: ${response.statusText}`)
          }
          const data: { docs: PageData[] } = await response.json()
          console.log(data)
  
          if (data.docs.length > 0) {
            setPageData(data.docs[0])
          } else {
            setError('Page not found')
          }
        } catch (err) {
          console.error('Fetch error:', err)
          setError('Failed to load page data')
        } finally {
          setLoading(false)
        }
      }
  
      fetchPage()
    }, [slug])
  
    return { pageData, loading, error }
  }