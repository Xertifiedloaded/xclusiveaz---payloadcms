'use client'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Motion } from "@/components/ui/motion"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function ProductPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`)
        const data = await response.json()
        setProduct(data)
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0].color)
        }
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0].size)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching product:', error)
        setLoading(false)
      }
    }
    fetchProduct()
  }, [params.id])

  const handleColorChange = (color) => {
    setSelectedColor(color)
    // Find image index matching the selected color and update display
    const colorImageIndex = product.images.findIndex(img => 
      img.color === color || img.image.alt.toLowerCase().includes(color.toLowerCase())
    )
    if (colorImageIndex !== -1) {
      setCurrentImageIndex(colorImageIndex)
    }
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      selectedColor,
      selectedSize,
      quantity: 1,
      image: product.images[currentImageIndex]?.image?.url,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!product) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="aspect-square overflow-hidden rounded-2xl bg-white shadow-lg">
              <Motion
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <img
                  src={product.images[currentImageIndex]?.image?.url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </Motion>
            </div>

            <ScrollArea className="w-full">
              <div className="flex space-x-4 pb-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden 
                      ${currentImageIndex === index ? 'ring-2 ring-primary' : 'ring-1 ring-gray-200'}
                    `}
                  >
                    <img
                      src={image.image.url}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
                {product.featured && (
                  <Badge className="bg-primary/10 text-primary px-3 py-1">
                    Featured
                  </Badge>
                )}
              </div>
              <p className="mt-4 text-3xl font-semibold text-primary">
                ₦{product.price.toLocaleString()}
              </p>
            </div>

            <Separator />
            <div className="block text-sm font-medium text-gray-700">
              <p>{product.description.root.children[0].children[0].text}</p>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Available Colors
              </label>
              <div className="flex flex-wrap gap-4">
                {product.colors.map((colorObj) => (
                  <button
                    key={colorObj.id}
                    onClick={() => handleColorChange(colorObj.color)}
                    className={`group relative w-12 h-12 rounded-full p-1
                      ${selectedColor === colorObj.color ? 'ring-2 ring-primary ring-offset-2' : ''}
                    `}
                  >
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: colorObj.color.toLowerCase() }}
                    />
                    <span className="sr-only">{colorObj.color}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Select Size
              </label>
              <RadioGroup
                value={selectedSize}
                onValueChange={setSelectedSize}
                className="grid grid-cols-4 gap-4"
              >
                {product.sizes.map((sizeObj) => (
                  <div key={sizeObj.id}>
                    <RadioGroupItem
                    
                      value={sizeObj.size}
                      id={sizeObj.size}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor={sizeObj.size}
                      className="flex text-primary flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 
                        hover:bg-accent  peer-data-[state=checked]:border-primary
                        peer-data-[state=checked]:text-primary cursor-pointer"
                    >
                      <span className="text-sm font-semibold">{sizeObj.size}</span>
                      <span className="text-xs text-muted-foreground">
                        {sizeObj.inventory} left
                      </span>
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
              className="w-full h-14 text-lg font-semibold"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}