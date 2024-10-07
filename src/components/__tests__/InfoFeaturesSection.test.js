import React from 'react'
import { render, screen } from '@testing-library/react'
import InfoFeaturesSection from '../InfoFeaturesSection'

describe('InfoFeaturesSection Component', () => {
  test('renders InfoFeaturesSection with all features', () => {
    render(<InfoFeaturesSection />)

    expect(screen.getByText(/Free Shipping/i)).toBeInTheDocument()
    expect(screen.getByText(/Become a salesperson yourself/i)).toBeInTheDocument()
    expect(screen.getByText(/Give something back to the environment/i)).toBeInTheDocument()
    expect(screen.getByText(/Largest online flea market/i)).toBeInTheDocument()
  })
})
