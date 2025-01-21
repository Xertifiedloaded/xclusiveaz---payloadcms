import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const DeliveryLocation = ({ locations, loading, error, formData, handleLocationChange }) => (
  <div>
    {loading ? (
      <p>Loading available locations...</p>
    ) : error ? (
      <p className="text-red-500">Error loading locations.</p>
    ) : (
      <Select value={formData.location} onValueChange={handleLocationChange}>
        <SelectTrigger>
          <SelectValue placeholder="Choose a location" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((loc) => (
            <SelectItem key={loc.id} value={loc.name}>
              {loc.name} - ${loc.price.toFixed(2)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )}
  </div>
)

export default DeliveryLocation
