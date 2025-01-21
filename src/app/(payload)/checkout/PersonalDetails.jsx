import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const PersonalDetails = ({ formData, handleInputChange }) => (
  <div className="space-y-6">
    <div className="space-y-2">
      <Label htmlFor="name">Full Name</Label>
      <Input
        id="name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="John Doe"
        required
      />
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="you@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="+234 000 0000"
          required
        />
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="address">Delivery Address</Label>
      <Textarea
        id="address"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        placeholder="Enter your full delivery address"
        required
      />
    </div>
  </div>
)

export default PersonalDetails
