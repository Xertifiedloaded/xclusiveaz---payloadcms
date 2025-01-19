'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

import { useState } from 'react'
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    hips: '',
    waist: '',
    chest: '',
    location: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Submit the formData and cart items to your API or backend
    console.log('Form Data:', formData)
    console.log('Cart Items:', cart)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Section: Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold">Personal Details</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="border p-2 w-full rounded"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="border p-2 w-full rounded"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="border p-2 w-full rounded"
              required
            />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Delivery Address"
              className="border p-2 w-full rounded"
              required
            ></textarea>
          </div>

          <h2 className="text-xl font-semibold">Measurements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number"
              name="hips"
              value={formData.hips}
              onChange={handleInputChange}
              placeholder="Hips (in cm)"
              className="border p-2 w-full rounded"
              required
            />
            <input
              type="number"
              name="waist"
              value={formData.waist}
              onChange={handleInputChange}
              placeholder="Waist (in cm)"
              className="border p-2 w-full rounded"
              required
            />
            <input
              type="number"
              name="chest"
              value={formData.chest}
              onChange={handleInputChange}
              placeholder="Chest (in cm)"
              className="border p-2 w-full rounded"
              required
            />
          </div>

          <h2 className="text-xl font-semibold">Select Location</h2>
          <select
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Choose a location</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
            <option value="Port Harcourt">Port Harcourt</option>
          </select>

          <Button type="submit" className="w-full mt-6">
            Place Order
          </Button>
        </form>

        {/* Right Section: Order Summary */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <ScrollArea className="h-64 pr-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 mb-4">
                <div className="relative border aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
                  <img
                    src={item.images?.[0]?.image?.url || '/placeholder.png'}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="font-semibold text-white">{item.name}</h3>
                  <span className="font-semibold text-white">
                    {item.quantity} x ${(item.price / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </ScrollArea>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <Button className="w-full" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
