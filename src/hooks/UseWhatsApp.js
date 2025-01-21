
import { useState } from 'react';

const useWhatsapp = (formData, cart, cartTotal) => {
  const [whatsappLoading, setLoading] = useState(false);
  const [whatsappError, setError] = useState(null);

  const sendWhatsappMessage = async () => {
    if (!cart || cart.length === 0) {
      setError('No items in the cart.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          cart,
          cartTotal,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        window.open(data.waLink, '_blank');
      } else {
        const error = await response.json();
        setError(error.message);
      }
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      setError('Error sending WhatsApp message');
    } finally {
      setLoading(false);
    }
  };

  return {
    whatsappLoading,
    whatsappError,
    sendWhatsappMessage,
  };
};

export default useWhatsapp;
