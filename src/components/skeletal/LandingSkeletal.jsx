import React from 'react';

export default function LandingSkeletal() {
  return (
    <main className="min-h-screen container mx-auto space-y-12 p-4">
      <div className="relative bg-gray-300 animate-pulse rounded-lg h-72 md:h-96 overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-center items-center space-y-4 text-center px-4">
          <div className="h-8 w-48 bg-gray-400 animate-pulse rounded"></div>
          <div className="h-4 w-64 bg-gray-400 animate-pulse rounded"></div>
          <div className="h-12 w-32 bg-gray-400 animate-pulse rounded"></div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="h-6 w-32 bg-gray-400 animate-pulse rounded mx-auto"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array(4).fill('').map((_, index) => (
            <div key={index} className="h-48 bg-gray-300 animate-pulse rounded shadow-sm"></div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="h-6 w-40 bg-gray-400 animate-pulse rounded mx-auto"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {Array(6).fill('').map((_, index) => (
            <div key={index} className="h-32 bg-gray-300 animate-pulse rounded shadow-sm"></div>
          ))}
        </div>
      </div>
    </main>
  );
}


export  function ProductsPageSkeleton() {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className=" sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
          <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="w-36 h-6 bg-gray-200 animate-pulse rounded"></div>
              <div className="flex w-full sm:w-[400px] items-center gap-3">
                <div className="relative flex-1">
                  <div className="w-full h-10 bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="h-10 w-10 bg-gray-200 animate-pulse rounded-full sm:hidden"></div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="container mx-auto pt-24 px-4 sm:px-6 lg:px-8">
          <div className="py-8 flex flex-col lg:flex-row gap-8">
            <div className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-28 bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
                {[...Array(4)].map((_, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="w-32 h-4 bg-gray-200 animate-pulse rounded"></div>
                    <div className="space-y-2">
                      {[...Array(3)].map((_, idx) => (
                        <div
                          key={idx}
                          className="w-16 h-6 bg-gray-200 animate-pulse rounded"
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Skeleton Product Grid */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <div className="w-40 h-4 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-8 w-20 bg-gray-200 animate-pulse rounded lg:hidden"></div>
              </div>
  
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, idx) => (
                  <div
                    key={idx}
                    className="group overflow-hidden border border-gray-200 rounded-lg shadow-sm"
                  >
                    <div className="aspect-square bg-gray-200 animate-pulse"></div>
                    <div className="p-4 space-y-2">
                      <div className="w-3/4 h-4 bg-gray-200 animate-pulse rounded"></div>
                      <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded"></div>
                      <div className="w-24 h-6 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
  