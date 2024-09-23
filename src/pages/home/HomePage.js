import React from 'react'
import HeroBanner from '../../components/HeroBanner'
import SellSection from '../../components/SellSection'
import CategoriesSection from '../../components/CategoriesSection'
import InfoFeaturesSection from '../../components/InfoFeaturesSection'
import PhilosophySection from '../../components/PhilosophySection'

const HomePage = () => {
  return (
    <div>
      <HeroBanner />
      <SellSection />
      <CategoriesSection />
      <InfoFeaturesSection />
      <PhilosophySection />

      {/* Additional content for HomePage */}
    </div>
  )
}

export default HomePage
