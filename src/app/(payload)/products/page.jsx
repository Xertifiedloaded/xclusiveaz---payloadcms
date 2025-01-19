'use client'

import { useState, useEffect } from 'react'
import { useCombinedData } from '@/hooks/FetchCollection'
import { ShoppingCart, Loader, Heart, Search, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
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

export default function ProductsPage() {
  const { products, loading, error } = useCombinedData()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSizes, setSelectedSizes] = useState([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState('featured')
  const { addToCart } = useCart()
  // Load cart from localStorage on component mount


  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-12 w-12 animate-spin text-primary" />
      </div>
    )

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-96">
          <CardContent className="pt-6">
            <p className="text-destructive">Error loading data: {error.message}</p>
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

  // Filter and sort products
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

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-4 md:text-white text-black">Sort By</h3>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent className=''>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm md:text-white text-black font-medium mb-4">Price Range</h3>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-2"
        />
        <div className="flex md:text-white text-black justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-medium mb-4">Sizes</h3>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <Badge
              key={size}
              variant={selectedSizes.includes(size) ? 'default' : 'outline'}
              className="cursor-pointer md:text-white text-black"
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
<main className="min-h-screen container mx-auto pt-24 px-4 sm:px-8">
  {/* Sticky Header */}
  <div className="fixed top-0 left-0 right-0 z-50 /95 backdrop-blur supports-[backdrop-filter]:/60 border-b">
    <div className="container py-4 px-4 sm:px-8">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h1 className="text-2xl font-bold">Our Products</h1>

        <div className="flex w-full sm:w-auto items-center gap-2">
          <div className="relative flex-1 sm:w-[300px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="sm:hidden">
                <SlidersHorizontal className="h-4 text-black w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="px-4 py-6">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterPanel />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  </div>

  <div className="py-8">
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Desktop Filters */}
      <div className="hidden sm:block w-64 shrink-0">
        <div className="sticky top-28">
          <FilterPanel />
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1">
        {filteredProducts.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center h-48">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid container mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group">
                <CardHeader className="p-0">
                  <div className="aspect-square relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.images?.[0]?.image?.url || '/api/placeholder/400/400'}
                      alt={product.name || 'Product Image'}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <h2 className="font-semibold mb-2 line-clamp-1">
                    {product.name || 'Untitled Product'}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {product.description?.root?.children?.[0]?.children?.[0]?.text ||
                      'No description available'}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.isArray(product.sizes) &&
                      product.sizes.map((size, index) => (
                        <Badge key={index} variant="secondary">
                          {size.size}
                        </Badge>
                      ))}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xl font-bold">
                      ${(product.price / 100).toFixed(2)}
                    </span>
                    <Button onClick={() => addToCart(product)}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
</main>
  )
}
