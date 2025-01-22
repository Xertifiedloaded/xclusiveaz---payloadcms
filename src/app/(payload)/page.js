'use client'

import { CategoriesShowcase, FeaturedProducts, HeroSection } from '@/sections/LandingSections'
import { useCombinedData } from '@/hooks/FetchCollection'
import LandingSkeletal from '../../components/skeletal/LandingSkeletal'
import InstagramFeed from '@/components/InstagramFeed'
import AlertError from '@/components/Alert'

const LandingPage = () => {
  const { pages, loading, error } = useCombinedData()
  if (loading) return <LandingSkeletal />
  if (error)
    return <AlertError descriptionError={`Error loading HomePage data: ${error.message}`} />

  if (!pages || pages.length === 0) return <div>No page data available</div>
  const landingPage = pages.find((page) => page.pageType === 'landing')

  if (!landingPage) return <AlertError descriptionError={`No Data Available`} />
  return (
    <main className="min-h-screen">
      {landingPage?.content?.map((block) => {
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
      <InstagramFeed />
    </main>
  )
}

export default LandingPage
