import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const Measurements = ({ formData, setFormData }) => {
  const [selectedMeasurements, setSelectedMeasurements] = useState([])
  const [addValue, setAddValue] = useState('')

  const handleMeasurementSelection = (value) => {
    if (selectedMeasurements.includes(value)) {
      setSelectedMeasurements((prev) => prev.filter((item) => item !== value))
    } else {
      setSelectedMeasurements((prev) => [...prev, value])
    }
  }

  const applyMeasurementChange = () => {
    const updatedData = { ...formData }

    selectedMeasurements.forEach((measurement) => {
      updatedData[measurement] = parseFloat(updatedData[measurement] || 0) + parseFloat(addValue)
    })

    setFormData(updatedData)
    setAddValue('')
    setSelectedMeasurements([])
  }

  return (
    <div className="space-y-6">
      <div className="lg:flex items-center lg:space-x-6 space-y-4 lg:space-y-0">
        {/* Select Measurements */}
        <div className="flex-1 space-y-2 relative">
          <Label>Select Measurements</Label>
          <Select onValueChange={handleMeasurementSelection}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select measurements" />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto">
              {['hips', 'waist', 'chest'].map((measurement) => (
                <SelectItem
                  key={measurement}
                  value={measurement}
                  className={selectedMeasurements.includes(measurement) ? 'bg-blue-100' : ''}
                >
                  {measurement.charAt(0).toUpperCase() + measurement.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Value to Add */}
        <div className="flex-1 space-y-2">
          <Label htmlFor="addValue">Value to Add (inches)</Label>
          <Input
            id="addValue"
            name="addValue"
            type="number"
            value={addValue}
            onChange={(e) => setAddValue(e.target.value)}
          />
        </div>

        {/* Apply Changes Button */}
        <div className="flex-1 space-y-2">
        <Label htmlFor="addValue">Apply Changes</Label>
          <Button
            onClick={applyMeasurementChange}
            disabled={selectedMeasurements.length === 0 || addValue === ''}
            className="w-full"
          >
            Apply Changes
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {['hips', 'waist', 'chest'].map((measurement) => (
          <div key={measurement} className="space-y-2">
            <Label htmlFor={measurement} className="capitalize">
              {measurement} (inch)
            </Label>
            <Input
              id={measurement}
              name={measurement}
              type="number"
              value={formData[measurement] || ''}
              readOnly
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Measurements
