'use client'
import { useEffect, useState } from 'react'
import { ShoppingCart,  Loader, Heart, Eye } from 'lucide-react'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`)
        }
        const { docs } = await response.json()
        setProducts(docs)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to load products.')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleAddToCart = (productId) => {
    console.log(`Added product ${productId} to cart`)
  }

  const handleWishlist = (productId) => {

    console.log(`Added product ${productId} to wishlist`)
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader className="h-12 w-12 text-indigo-600 animate-spin" />
    </div>
  )

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</div>
    </div>
  )

  if (!products.length) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-gray-500">No products available.</div>
    </div>
  )

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative group">
                <div className="aspect-w-1 aspect-h-1 w-full">
                  <img
                    src={`${product?.images[0]?.image?.url}`}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <button
                  onClick={() => handleWishlist(product.id)}
                  className="absolute top-0 right-4 p-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Eye color='red' className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {typeof product.description === 'string' ? product.description : ''}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {Array.isArray(product.sizes) && product.sizes.map((size, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 cursor-pointer transition-colors"
                    >
                      {size.size}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}



