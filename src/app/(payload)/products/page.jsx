'use client'

import { useState, useEffect } from 'react'
import { useCombinedData } from '@/hooks/FetchCollection'
import {
  ShoppingCart,
  Loader,
  Heart,
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { useCart } from '@/context/CartContext'
import { ProductsPageSkeleton } from '@/components/skeletal/LandingSkeletal'
import Link from 'next/link'

export default function ProductsPage() {
  const { products, loading, error } = useCombinedData()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSizes, setSelectedSizes] = useState([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState('featured')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const { addToCart } = useCart()

  if (loading) return <ProductsPageSkeleton />

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Card className="w-96 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col items-center gap-4">
              <X className="h-12 w-12 text-red-500" />
              <p className="text-gray-800 font-medium text-center">
                Error loading data: {error.message}
              </p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )

  const productList = Array.isArray(products) ? products : []
  const allSizes = [
    ...new Set(
      productList.flatMap((product) =>
        Array.isArray(product.sizes) ? product.sizes.map((s) => s.size) : [],
      ),
    ),
  ]

  const filteredProducts = productList
    .filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.root?.children?.[0]?.children?.[0]?.text
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      const matchesSize =
        selectedSizes.length === 0 || product.sizes?.some((s) => selectedSizes.includes(s.size))
      const price = product.price / 100
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1]
      return matchesSearch && matchesSize && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'name':
          return a.name?.localeCompare(b.name)
        default:
          return 0
      }
    })

  const FilterPanel = ({ isMobile = false }) => (
    <div className={`space-y-8 ${isMobile ? 'p-4' : ''}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-500">Sort By</h3>
          {sortBy !== 'featured' && (
            <Button variant="ghost" size="sm" onClick={() => setSortBy('featured')}>
              Reset
            </Button>
          )}
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose order..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator className="bg-gray-200" />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-500">
            Price Range
          </h3>
          {(priceRange[0] !== 0 || priceRange[1] !== 1000) && (
            <Button variant="ghost" size="sm" onClick={() => setPriceRange([0, 1000])}>
              Reset
            </Button>
          )}
        </div>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-6"
        />
        <div className="flex justify-between items-center">
          <Card className="w-24">
            <CardContent className="p-2 text-center">
              <span className="text-sm font-medium">${priceRange[0]}</span>
            </CardContent>
          </Card>
          <span className="text-gray-400">—</span>
          <Card className="w-24">
            <CardContent className="p-2 text-center">
              <span className="text-sm font-medium">${priceRange[1]}</span>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="bg-gray-200" />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-500">Sizes</h3>
          {selectedSizes.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setSelectedSizes([])}>
              Reset
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <Badge
              key={size}
              variant={selectedSizes.includes(size) ? 'default' : 'outline'}
              className={`cursor-pointer transition-all ${
                selectedSizes.includes(size)
                  ? 'bg-purple-500 hover:bg-purple-600'
                  : 'hover:border-purple-500'
              }`}
              onClick={() => {
                setSelectedSizes((prev) =>
                  prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
                )
              }}
            >
              {size}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Collection
            </h1>

            <div className="flex w-full sm:w-auto items-center gap-3">
              <div className="relative flex-1 sm:w-[400px]">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="sm:hidden">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader className="mb-6">
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <FilterPanel isMobile={true} />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto pt-24 px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters */}
            <div className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-28 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <FilterPanel />
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-500">
                  Showing{' '}
                  <span className="font-medium text-gray-900">{filteredProducts.length}</span>{' '}
                  products
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              {filteredProducts.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center h-64 text-center">
                    <Search className="h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-gray-500 mb-2">No products found matching your criteria.</p>
                    <Button
                      variant="link"
                      onClick={() => {
                        setSearchTerm('')
                        setSelectedSizes([])
                        setPriceRange([0, 1000])
                        setSortBy('featured')
                      }}
                    >
                      Clear all filters
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="group overflow-hidden border-gray-200 hover:border-purple-500 transition-colors"
                    >
                      <CardHeader className="p-0">
                        <div className="aspect-square relative overflow-hidden">
                          <img
                            src={product.images?.[0]?.image?.url || '/api/placeholder/400/400'}
                            alt={product.name || 'Product Image'}
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-4 left-4 right-4">
                              <Button
                                className="w-full bg-white/90 hover:bg-white text-gray-900"
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
                            className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Link href={`/products/${product.id}`}>
                              <Heart className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardHeader>

                      <CardContent className="p-6">
                        <div className="mb-2 flex items-start justify-between gap-4">
                          <h2 className="font-medium line-clamp-1 text-gray-900">
                            {product.name || 'Untitled Product'}
                          </h2>
                          <span className="font-semibold whitespace-nowrap text-purple-600">
                            ${(product.price / 100).toFixed(2)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                          {product.description?.root?.children?.[0]?.children?.[0]?.text ||
                            'No description available'}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {Array.isArray(product.sizes) &&
                            product.sizes.map((size, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-gray-100 text-gray-600 hover:bg-gray-200"
                              >
                                {size.size}
                              </Badge>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
