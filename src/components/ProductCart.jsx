import { ShoppingCart, Heart, ChevronLeft, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="p-0">
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
            <Link href={`/products/${product?.id}`}>
              <Eye className="h-4 w-4 text-gray-700" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="p-5">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h2 className="font-medium text-gray-900 line-clamp-1">
              {product.name || 'Untitled Product'}
            </h2>
            <span className="font-semibold text-purple-600">
              ₦{(product.price / 100).toFixed(2)}
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
      </div>
    </div>
  )
}

export default ProductCard
