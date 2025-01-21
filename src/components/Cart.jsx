'use client'

import { Button } from '@/components/ui/button'
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/context/CartContext'

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart()

  return (
    <div className="flex flex-col h-[75vh]  rounded-lg ">
      <ScrollArea className="flex-1 pr-4">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[450px] space-y-4">
            <ShoppingCart className="h-12 w-12 text-gray-400" />
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-lg"
              >
                <div className="relative border aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
                  <img
                    src={item.images?.[0]?.image?.url || '/placeholder.png'}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-gray-300"
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        }}
                      >
                        <Minus className="h-4 w-4 text-gray-600" />
                      </Button>
                      <span className="text-gray-800">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-gray-300"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4 text-gray-600" />
                      </Button>
                    </div>
                    <span className="font-semibold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {cart.length > 0 && (
        <div className="space-y-4 pt-6 mt-auto border-t border-gray-200">
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-800">Total</span>
              <span className="font-semibold text-gray-800">${cartTotal.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              className="w-full bg-red-500 text-white hover:bg-red-600"
              onClick={clearCart}
              disabled={cart.length === 0}
            >
              Clear Cart
            </Button>
            <Button
              className="w-full bg-green-500 text-white hover:bg-green-600"
              disabled={cart.length <= 0}
            >
              <a href="/checkout">Checkout</a>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
