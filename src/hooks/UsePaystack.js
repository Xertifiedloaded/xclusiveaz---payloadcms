import { useState } from 'react';

export const usePaystack = (formData, cart, cartTotal, onSuccessCallback) => {
  const [paystackLoading, setPaystackLoading] = useState(false);
  const [paystackError, setPaystackError] = useState(null);

  const initializePaystackPayment = async (paystackConfig) => {
    if (!cart || cart.length === 0) {
      setPaystackError('No items in the cart.');
      return;
    }
    setPaystackLoading(true);
    setPaystackError(null);

    try {
      const handler = window.PaystackPop.setup({
        key: paystackConfig.publicKey,
        email: formData.email,
        amount: cartTotal * 100, 
        currency: 'NGN', 
        callback: (response) => {
          console.log('Payment successful:', response);
          alert('Payment successful!');

          if (onSuccessCallback) {
            onSuccessCallback(response); 
          }
        },
        onClose: () => {
          alert('Payment canceled.');
        },
      });

      handler.openIframe();
    } catch (error) {
      console.error('Error initializing Paystack payment:', error);
      setPaystackError('Error initializing Paystack payment.');
    } finally {
      setPaystackLoading(false);
    }
  };

  return {
    paystackLoading,
    paystackError,
    initializePaystackPayment,
  };
};


