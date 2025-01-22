import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function AlertError({descriptionError }) {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Opppppps Error</AlertTitle>
      <AlertDescription>{descriptionError}</AlertDescription>
    </Alert>
  )
}
