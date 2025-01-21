'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '@/context/CartContext';

export default function VerifyPayment() {
  const router = useRouter();
  const { reference } = router.query;
  const { clearCart } = useCart();
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    if (reference) {
      verifyPayment(reference);
    }
  }, [reference]);

  const verifyPayment = async (paymentReference) => {
    try {
      const response = await fetch(`/api/payments/verify?reference=${paymentReference}`);
      const data = await response.json();

      if (data.success) {
        setStatus('success');
        clearCart();
        setTimeout(() => {
          router.push('/payment/success');
        }, 3000);
      } else {
        setStatus('failed');
        setTimeout(() => {
          router.push('/payment/failed');
        }, 3000);
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      setStatus('failed');
      setTimeout(() => {
        router.push('/payment/failed');
      }, 3000);
    }
  };

  const renderContent = () => {
    if (status === 'verifying') {
      return (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <h2 className="mt-4 text-xl font-semibold">Verifying Payment...</h2>
          <p className="mt-2 text-gray-600">Please wait while we confirm your payment.</p>
        </div>
      );
    }

    if (status === 'success') {
      return (
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-green-100 mx-auto flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-green-600">Payment Successful!</h2>
          <p className="mt-2 text-gray-600">Redirecting to confirmation page...</p>
        </div>
      );
    }

    if (status === 'failed') {
      return (
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 mx-auto flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-red-600">Payment Failed</h2>
          <p className="mt-2 text-gray-600">Redirecting to error page...</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">{renderContent()}</div>
    </div>
  );
}
