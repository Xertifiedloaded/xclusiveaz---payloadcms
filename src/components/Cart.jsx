// components/Cart.jsx
'use client'

import { Button } from '@/components/ui/button'
import { ShoppingCart, Minus, Plus, X } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/context/CartContext'

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart()

  return (
    <div className="flex flex-col h-[75vh]">
      <ScrollArea className="flex-1 pr-4">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[450px] space-y-4">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <div className="relative border aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
                  <img
                    src={item.images?.[0]?.image?.url || '/placeholder.png'}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        }}
                      >
                        <Minus className="h-3 text-black w-3" />
                      </Button>
                      <span className="text-foreground">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 text-black w-3" />
                      </Button>
                    </div>
                    <span className="font-semibold text-foreground">
                      ${((item.price * item.quantity) / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {cart.length > 0 && (
        <div className="space-y-4 pt-6 mt-auto border-t">
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-semibold text-foreground">${cartTotal.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button className="w-full" onClick={clearCart}>
              Clear Cart
            </Button>
            <Button className="w-full">
              <a   href="/checkout">Checkout</a>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
