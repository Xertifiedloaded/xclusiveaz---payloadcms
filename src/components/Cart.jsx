'use client'

import { Button } from '@/components/ui/button'
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/context/CartContext'

export function CartPage() {
 const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart()

 return (
   <div className="flex flex-col min-h-[calc(100vh-8rem)] max-h-[calc(100vh-8rem)]">
     <div className="flex-none flex items-center gap-2 mb-6">
       <ShoppingCart className="h-5 w-5 text-foreground" />
       <h2 className="font-semibold text-lg text-foreground">Shopping Cart</h2>
     </div>

     <ScrollArea className="flex-1 pr-4 -mr-4 overflow-y-auto max-h-[calc(100vh-16rem)]">
       {cart.length === 0 ? (
         <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
           <ShoppingCart className="h-12 w-12 text-muted-foreground" />
           <p className="text-muted-foreground">Your cart is empty</p>
         </div>
       ) : (
         <div className="space-y-4 overflow-y-auto">
           {cart.map((item) => (
             <div
               key={item.id}
               className="group relative flex gap-4 border rounded-lg px-2 py-2 transition-colors hover:bg-slate-50"
             >
               <div className="aspect-square h-24 w-24 rounded-md border overflow-hidden">
                 <img
                   src={item.images?.[0]?.image?.url || '/placeholder.png'}
                   alt={item.name}
                   className="h-full w-full object-cover"
                 />
               </div>

               <div className="flex flex-1 flex-col">
                 <div className="flex items-start justify-between">
                   <div className="space-y-1">
                     <h3 className="font-medium leading-none text-foreground">{item.name}</h3>
                     <p className="text-sm text-muted-foreground">
                       ₦{item.price.toFixed(2)} each
                     </p>
                   </div>
                   <Button
                     variant="ghost"
                     size="icon"
                     onClick={() => removeFromCart(item.id)}
                     className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                   >
                     <Trash2 className="h-4 w-4 text-destructive" />
                   </Button>
                 </div>

                 <div className="mt-4 flex items-center justify-between">
                   <div className="flex items-center gap-1">
                     <Button
                       variant="secondary"
                       size="icon"
                       className="h-8 w-8"
                       onClick={() => {
                         if (item.quantity > 1) {
                           updateQuantity(item.id, item.quantity - 1)
                         }
                       }}
                       disabled={item.quantity <= 1}
                     >
                       <Minus className="h-4 w-4" />
                     </Button>
                     <span className="w-12 text-center text-foreground">{item.quantity}</span>
                     <Button
                       variant="secondary"
                       size="icon"
                       className="h-8 w-8"
                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
                     >
                       <Plus className="h-4 w-4" />
                     </Button>
                   </div>
                   <p className="font-medium text-xs text-foreground">
                     ₦{(item.price * item.quantity).toFixed(2)}
                   </p>
                 </div>
               </div>
             </div>
           ))}
         </div>
       )}
     </ScrollArea>

     {cart.length > 0 && (
       <div className="flex-none space-y-4 pt-6 border-t">
         <div className="space-y-3">
           <div className="flex items-center justify-between text-base">
             <span className="font-medium text-foreground">Subtotal</span>
             <span className="text-foreground">₦{cartTotal.toFixed(2)}</span>
           </div>
           <Separator className="bg-border" />
           <div className="flex items-center justify-between text-lg">
             <span className="font-semibold text-foreground">Total</span>
             <span className="font-semibold text-foreground">₦{cartTotal.toFixed(2)}</span>
           </div>
         </div>
         
         <div className="grid grid-cols-2 gap-4">
           <Button
             variant="outline"
             className="w-full text-black border-primary hover:bg-secondary"
             onClick={clearCart}
             disabled={cart.length === 0}
           >
             Clear Cart
           </Button>
           <Button
             className="w-full"
             disabled={cart.length === 0}
           >
             Checkout
           </Button>
         </div>
       </div>
     )}
   </div>
 )
}