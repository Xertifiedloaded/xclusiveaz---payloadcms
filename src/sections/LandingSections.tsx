import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoriesShowcaseBlock, HeroBlock, FeaturedProductsBlock } from '../types/types';
import { useCart } from '@/context/CartContext';

export const HeroSection: React.FC<HeroBlock> = ({ heading, subheading, backgroundImage, cta }) => {
  if (!heading && !subheading && !backgroundImage) {
    return (
      <section className="h-screen flex items-center justify-center bg-gray-100 text-gray-500">
        <p>No hero content available at the moment.</p>
      </section>
    );
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
          <p className="text-xl mb-8">{subheading}</p>
          {cta && (
            <Link href={cta.link}>
              <Button size="lg">{cta.text}</Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
export const FeaturedProducts: React.FC<FeaturedProductsBlock> = ({ heading, products }) => {
  const { addToCart } = useCart();

  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-8">
          <div className="flex flex-col items-center space-y-4 mb-8">
            <h2 className="lg:text-5xl text-2xl  text-black font-bold">{heading}</h2>
            <p className="text-gray-600 text-center max-w-2xl">
              Discover our carefully curated selection of premium products
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.map((product, index) => (
              <div key={product.id || index} className="space-y-3">
                <div className="aspect-square rounded-xl overflow-hidden bg-white">
                  <img
                    src={product?.images?.[0]?.image?.url || ''}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2 px-1 text-black">
                  <h3 className="font-medium line-clamp-1">{product.name}</h3>
                  <p className="font-semibold">${(product.price / 100).toFixed(2)}</p>
                  <Button 
                    onClick={() => addToCart(product)} 
                    className="w-full"
                    variant="outline"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const CategoriesShowcase: React.FC<CategoriesShowcaseBlock> = ({ heading, categories }) => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="space-y-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="lg:text-5xl text-2xl font-bold">{heading}</h2>
          <Button className='text-black' variant="outline">View All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories?.map((category, index) => (
            <Link 
              href={`/category/${category?.name}`} 
              key={category.id || index}
              className="group"
            >
              <div className="relative h-64 bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={category?.image?.url || ''}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-200 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};