import React from 'react'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { ShoppingCart } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

import { CategoriesShowcaseBlock, HeroBlock, FeaturedProductsBlock } from '../types/types'
import { useCart } from '@/context/CartContext'
export const HeroSection: React.FC<HeroBlock> = ({ heading, subheading, backgroundImage, cta }) => {
  return (
    <section className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage?.url})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
          <h1 className="lg:text-5xl text-3xl text-center font-bold mb-4">{heading}</h1>
          <p className="text-xl mb-8">{subheading}</p>
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
  const { 
    addToCart
  } = useCart()

  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8">{heading}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products?.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <img
                src={`${product.images[0]?.image?.url}`}
                alt={product.name}
                className="w-full h-64 object-cover mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-lg font-bold">${product.price}</p>
              <Button onClick={() => addToCart(product)} className="w-full mt-4">
                <ShoppingCart className="mr-2" /> Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export const CategoriesShowcase: React.FC<CategoriesShowcaseBlock> = ({ heading, categories }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-black font-bold mb-8">{heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories?.map((category, index) => (
            <Card key={category.id || `category-${index}`} className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={category?.image?.url}
                  alt={category.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <Link href={`/category/${category.id}`}>
                    <Button variant="outline" className="w-full">
                      Browse <ChevronRight className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};



