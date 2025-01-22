'use client'
import { useState, useEffect } from 'react'
import { ShoppingCart, Heart, ChevronLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { useParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { CategorySkeleton } from '@/components/skeletal/LandingSkeletal'
import { cn } from '@/lib/utils'
import ProductCard from '../../../../components/ProductCart'

export default function Categories() {
  const params = useParams()
  const categoryName = params.categoryName
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart()
  const encodedName = encodeURIComponent(categoryName)

  useEffect(() => {
    if (encodedName) {
      setLoading(true)
      fetch(`/api/products?where[category.name][equals]=${encodedName}`)
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
  }, [encodedName])

  if (loading) {
    return <CategorySkeleton />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CategoryHeader products={products} encodedName={encodedName} />

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

      {products.length === 0 && !loading && !error && (
        <div className="flex flex-col items-center justify-center py-16">
          <h3 className="text-2xl font-semibold text-white mb-4">No Products Found</h3>
          <p className="text-sm text-gray-300 mb-6 text-center max-w-md">
            We couldn't find any products matching your search or filter criteria. Try adjusting
            your search parameters or explore other categories.
          </p>
          <a
            href="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md shadow-md transition"
          >
            View All Products
          </a>
        </div>
      )}
    </div>
  )
}

const CategoryHeader = ({ encodedName, products }) => {
  return (
    <div className="mb-8 space-y-6">
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
        <button
          onClick={() => window.history.back()}
          className="flex items-center hover:text-primary transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to shop
        </button>
        <span>/</span>
        <span className="text-white">{encodedName}</span>
      </nav>

      <div className="flex flex-col space-y-2">
        <h1 className={cn('text-3xl font-bold tracking-tight', 'md:text-4xl')}>{encodedName}</h1>
        <p className="text-muted-foreground">Explore our {encodedName.toLowerCase()} collection</p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t">
        <p className="text-white">
          Showing {products.length} {products.length <= 1 ? 'product' : 'products'}
        </p>
      </div>
    </div>
  )
}
