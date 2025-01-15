'use client'

import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import { CategoriesShowcase, FeaturedProducts, HeroSection } from '@/sections/LandingSections'

import { usePageData } from '@/hooks/UsePage'

const LandingPage: React.FC = () => {
  const { pageData, loading, error } = usePageData('landing')

  if (loading) return <div className="text-center py-16">Loading...</div>
  if (error) return <div className="text-center py-16 text-red-500">{error}</div>
  if (!pageData) return <div className="text-center py-16">No content available.</div>

  return (
    <main className="min-h-screen">
      <Header />
      {pageData?.content?.map((block) => {
        switch (block.blockType) {
          case 'hero':
            return <HeroSection key={block.id} {...block} />
          case 'featuredProducts':
            return <FeaturedProducts key={block.id} {...block} />
          case 'categoriesShowcase':
            return <CategoriesShowcase key={block.id} {...block} />
          default:
            return null
        }
      })}
      <Footer />
    </main>
  )
}

export default LandingPage
