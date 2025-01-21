import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const OrderSummary = ({
  cart,
  whatsappLoading,
  cartTotal,
  clearCart,
  handleSubmit,
  handleWhatsapp,
  paystackProps,
}) => (
  <div className="space-y-4">
    <ScrollArea className="h-[400px] pr-4">
      {cart.map((item) => (
        <div key={item.id} className="flex gap-4 mb-4">
          <div className="relative h-16 w-16 rounded-md overflow-hidden">
            <img
              src={item.images?.[0]?.image?.url || '/placeholder.png'}
              alt={item.name}
              className="object-cover h-full w-full"
            />
          </div>
          <div className="flex-1">
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-muted-foreground">
              {item.quantity} x ${(item.price / 100).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </ScrollArea>

    <Separator className="my-4" />

    <div className="flex justify-between">
      <span className="font-semibold">Total</span>
      <span className="font-semibold">${cartTotal.toFixed(2)}</span>
    </div>

    <Button onClick={clearCart} variant="outline" className="w-full text-black">
      Clear Cart
    </Button>

    <Button onClick={handleSubmit} className="w-full">
      Checkout
    </Button>
    <Button onClick={handleWhatsapp} className="w-full flex items-center justify-center">
      {whatsappLoading ? (
        <span>Loading WhatsApp...</span>
      ) : (
        <>
          <span>Place Order via WhatsApp</span>
        </>
      )}
    </Button>
  </div>
)

export default OrderSummary
