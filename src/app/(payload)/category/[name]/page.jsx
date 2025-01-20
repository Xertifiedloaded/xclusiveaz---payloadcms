'use client'
import { useState, useEffect } from 'react'
import { ShoppingCart, Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { useParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { CategorySkeleton } from '@/components/skeletal/LandingSkeletal'

export default function Categories() {
  const params = useParams()
  const name = params.name
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    if (name) {
      setLoading(true)
      fetch(`/api/products?categories=${name}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch products')
          }
          return res.json()
        })
        .then((data) => {
          setProducts(data.docs || [])
          setLoading(false)
        })
        .catch((err) => {
          setError(err.message)
          setLoading(false)
        })
    }
  }, [name])

  if (loading) {
    return <CategorySkeleton/>
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => window.history.back()}
            className="text-white hover:text-gray-900 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">{name} Collections</h1>
        <p className="text-white">Showing {products.length} products</p>
      </div>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <Card
            key={product.id}
            className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <CardHeader className="p-0">
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                  src={product.images?.[0]?.image?.url || '/api/placeholder/400/400'}
                  alt={product.name || 'Product Image'}
                  className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    <Button
                      className="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-2 rounded-md shadow-sm"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <Heart className="h-4 w-4 text-gray-700" />
                </Button>
              </div>
            </CardHeader>
  
            <CardContent className="p-5">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h2 className="font-medium text-gray-900 line-clamp-1">
                    {product.name || 'Untitled Product'}
                  </h2>
                  <span className="font-semibold text-purple-600">
                    ${(product.price / 100).toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {product.description?.root?.children?.[0]?.children?.[0]?.text ||
                    'No description available'}
                </p>
                {Array.isArray(product.sizes) && product.sizes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {product.sizes.map((size, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                      >
                        {size.size}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}
