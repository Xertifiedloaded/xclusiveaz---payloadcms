export default function PaymentSuccess() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 mx-auto flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-green-600">Payment Successful!</h1>
          <p className="mt-2 text-gray-600">Thank you for your purchase. Your order has been confirmed.</p>
          <p className="mt-4 text-gray-600">Order details and confirmation have been sent to your email.</p>
          <a
            href="/"
            className="mt-6 inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }
  