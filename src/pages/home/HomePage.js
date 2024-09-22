import React from 'react'
import HeroBanner from '../../components/HeroBanner'
import SellSection from '../../components/SellSection'
import CategoriesSection from '../../components/CategoriesSection'
import InfoFeaturesSection from '../../components/InfoFeaturesSection'

const HomePage = () => {
  return (
    <div>
      <HeroBanner />
      <SellSection />
      <CategoriesSection />
      <InfoFeaturesSection />

      {/* Additional content for HomePage */}
    </div>
  )
}

export default HomePage
