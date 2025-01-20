'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from '@/components/ui/sheet'

import { ShoppingCart } from 'lucide-react'
import { useCombinedData } from '@/hooks/FetchCollection'
import { CartPage } from './Cart'
import { useCart } from '@/context/CartContext'

export default function Header() {
  const { cartCount } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { header, loading, error } = useCombinedData()
  if (loading) {
    return (
      <header className="bg-white shadow-sm w-full z-50 top-0">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="h-10 w-36 bg-gray-200 animate-pulse rounded-md"></div>
            <div className="hidden md:flex space-x-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:block h-10 w-64 bg-gray-200 animate-pulse rounded-full"></div>
            
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-gray-200 animate-pulse rounded-full">
                <div className="absolute -top-1 -right-1 h-5 w-5 bg-gray-300 animate-pulse rounded-full"></div>
              </div>
              <div className="h-10 w-10 bg-gray-200 animate-pulse rounded-full"></div>
              <div className="h-10 w-40 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
    )
  }
  if (error) return <div>Error loading header data: {error.message}</div>

  if (!header) return <div>No header data available</div>

  return (
    <header className=" bg-primary w-full z-50 top-0 ">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          {/* {header.logo && <img src={header.logo.url} alt="Logo" className="h-8 w-auto" />} */}
          <h1 className=" text-3xl">Xclusive Couture</h1>
        </div>

     
        <div className="flex items-center gap-4">
          {header.ctaButton && (
            <Button asChild>
              <a href={header.ctaButton.link}>{header.ctaButton.text}</a>
            </Button>
          )}

          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-4 text-black w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
              <SheetTitle>Shopping Cart ({cartCount} items)</SheetTitle>
                <SheetDescription>View your shopping cart items</SheetDescription>
              </SheetHeader>
              <div className="mt-8">
                <CartPage />
              </div>
            </SheetContent>
          </Sheet>

     
        </div>
      </div>
    </header>
  )
}
