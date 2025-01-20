import React from 'react'

export default function LandingSkeletal() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="relative bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-2xl h-[500px] overflow-hidden">
          <div className="absolute inset-0 flex flex-col justify-center items-center space-y-6 px-4">
            <div className="h-10 w-3/4 md:w-1/2 bg-gray-400/50 animate-pulse rounded-lg"></div>
            <div className="h-5 w-2/3 md:w-1/3 bg-gray-400/50 animate-pulse rounded"></div>
            <div className="flex space-x-4 mt-4">
              <div className="h-12 w-36 bg-gray-400/50 animate-pulse rounded-lg"></div>
              <div className="h-12 w-36 bg-gray-400/50 animate-pulse rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <section className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="flex items-center justify-between mb-8">
            <div className="h-8 w-48 bg-gray-300 animate-pulse rounded-lg"></div>
            <div className="h-8 w-24 bg-gray-300 animate-pulse rounded-lg"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="group">
                <div className="relative h-64 bg-gray-200 animate-pulse rounded-xl overflow-hidden">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="h-6 w-3/4 bg-gray-300 animate-pulse rounded"></div>
                    <div className="h-4 w-1/2 mt-2 bg-gray-300 animate-pulse rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="space-y-8">
            <div className="flex flex-col items-center space-y-4 mb-8">
              <div className="h-8 w-64 bg-gray-300 animate-pulse rounded-lg"></div>
              <div className="h-4 w-96 bg-gray-300 animate-pulse rounded"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="space-y-3">
                  <div className="aspect-square bg-gray-200 animate-pulse rounded-xl"></div>
                  <div className="space-y-2 px-1">
                    <div className="h-4 w-3/4 bg-gray-300 animate-pulse rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-300 animate-pulse rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-gray-200 animate-pulse rounded-2xl p-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="h-8 w-64 bg-gray-300 animate-pulse rounded-lg"></div>
            <div className="h-4 w-96 bg-gray-300 animate-pulse rounded"></div>
            <div className="flex w-full max-w-md gap-4">
              <div className="h-12 flex-grow bg-gray-300 animate-pulse rounded-lg"></div>
              <div className="h-12 w-32 bg-gray-300 animate-pulse rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function ProductsPageSkeleton() {
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
                      <div key={idx} className="w-16 h-6 bg-gray-200 animate-pulse rounded"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <div className="w-40 h-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-8 w-20 bg-gray-200 animate-pulse rounded lg:hidden"></div>
            </div>

            <div className="animate-pulse">
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-20 h-6 bg-gray-200 rounded"></div>
                </div>
                <div className="w-48 h-8 bg-gray-200 rounded mb-2"></div>
                <div className="w-32 h-5 bg-gray-200 rounded"></div>
              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <div className="aspect-[4/5] bg-gray-200"></div>

                    <div className="p-5 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="w-2/3 h-5 bg-gray-200 rounded"></div>
                        <div className="w-16 h-5 bg-gray-200 rounded"></div>
                      </div>

                      <div className="space-y-2">
                        <div className="w-full h-4 bg-gray-200 rounded"></div>
                        <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-12 h-6 bg-gray-200 rounded"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export function CategorySkeleton() {
  return (
    <div className="animate-pulse container mx-auto">
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <div className="w-20 h-6 bg-gray-200 rounded"></div>
        </div>
        <div className="w-48 h-8 bg-gray-200 rounded mb-2"></div>
        <div className="w-32 h-5 bg-gray-200 rounded"></div>
      </div>

      <div className="mb-8 flex justify-between items-center">
        <div className="w-32 h-10 bg-gray-200 rounded"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="aspect-[4/5] bg-gray-200"></div>

            <div className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-2/3 h-5 bg-gray-200 rounded"></div>
                <div className="w-16 h-5 bg-gray-200 rounded"></div>
              </div>

              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-200 rounded"></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-12 h-6 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
