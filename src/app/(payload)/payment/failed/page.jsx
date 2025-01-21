export default function PaymentFailed() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 mx-auto flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-red-600">Payment Failed</h1>
          <p className="mt-2 text-gray-600">Sorry, we couldn't process your payment.</p>
          <p className="mt-4 text-gray-600">Please try again or contact our support team for assistance.</p>
          <div className="mt-6 space-y-3">
            <a
              href="/checkout"
              className="inline-block w-full bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </a>
            <a
              href="/"
              className="inline-block w-full bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    );
  }
  