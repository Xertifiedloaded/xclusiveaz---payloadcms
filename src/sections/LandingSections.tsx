
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { ShoppingCart, ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CategoriesShowcaseBlock, HeroBlock, FeaturedProductsBlock } from '../types/types'
import { useCart } from '@/context/CartContext'
import  { useRef } from 'react';

export const CategoriesShowcase: React.FC<CategoriesShowcaseBlock> = ({ heading, categories }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      const scrollContainer = scrollContainerRef.current
      scrollContainer.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="container mx-auto py-12 relative">
      <div className="space-y-8">
        <div className="flex items-center justify-between mb-8 px-4">
          <h2 className="text-4xl text-center lg:text-5xl font-bold">{heading}</h2>
        </div>

        <div className="relative group">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll("left")}
          >
            <ChevronLeft color='black' className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll("right")}
          >
            <ChevronRight color='black' className="h-6 w-6" />
          </Button>

          <div ref={scrollContainerRef} className="flex space-x-6 pb-6 overflow-x-auto scroll-smooth">
            {categories?.map((category, index) => (
              <Link
                href={`/category/${category?.name}`}
                key={category.id || index}
                className="group/card relative min-w-[300px] transition-transform duration-300 hover:-translate-y-1"
              >
                <Card className="overflow-hidden border-0">
                  <CardContent className="p-0">
                    <div className="relative h-80">
                      <img
                        src={category?.image?.url || ""}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                          <h3 className="text-2xl font-semibold mb-2">{category.name}</h3>
                          <p className="text-sm text-gray-200 line-clamp-2 opacity-90">{category.description}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


export const HeroSection: React.FC<HeroBlock> = ({ heading, subheading, backgroundImage, cta }) => {
  if (!heading && !subheading && !backgroundImage) {
    return (
      <section className="h-screen flex items-center justify-center bg-gray-100 text-gray-500">
        <p>No hero content available at the moment.</p>
      </section>
    )
  }

  return (
    <section className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage?.url || ''})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
          <h1 className="lg:text-5xl text-3xl text-center font-bold mb-4">{heading}</h1>
          <p className="text-xl text-center mb-8">{subheading}</p>
          {cta && (
            <Link href={cta.link}>
              <Button size="lg">{cta.text}</Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}


export const FeaturedProducts: React.FC<FeaturedProductsBlock> = ({ heading, products }) => {
  const { addToCart } = useCart()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      const scrollContainer = scrollContainerRef.current
      scrollContainer.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-8">
          <div className="flex flex-col items-center space-y-4 mb-8">
            <h2 className="lg:text-5xl text-4xl text-black font-bold">{heading}</h2>
            <p className="text-gray-600 text-center max-w-2xl">
              Discover our carefully curated selection of premium products
            </p>
          </div>
          <div className="relative group">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => scroll("left")}
            >
              <ChevronLeft color='black' className="h-6 w-6" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => scroll("right")}
            >
              <ChevronRight color='black' className="h-6 w-6" />
            </Button>

            <div ref={scrollContainerRef} className="flex space-x-6 overflow-x-auto scroll-smooth pb-6">
              {products?.map((product, index) => (
                <div key={product.id || index} className="flex flex-col space-y-3 min-w-[250px] max-w-[250px]">
                  <Link href={`/product/${product.id}`} className="flex-grow">
                    <div className="aspect-square rounded-xl overflow-hidden bg-white">
                      <img
                        src={product?.images?.[0]?.image?.url || ""}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </Link>
                  <div className="space-y-2 px-1 text-black">
                    <h3 className="font-medium line-clamp-1">{product.name}</h3>
                    <p className="font-semibold">${(product.price / 100).toFixed(2)}</p>
                    <Button onClick={() => addToCart(product)} className="w-full" variant="outline">
                      <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
