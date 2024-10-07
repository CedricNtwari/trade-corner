import React from 'react'
import { render, screen } from '@testing-library/react'
import PhilosophySection from '../PhilosophySection'

describe('PhilosophySection', () => {
  test('renders philosophy section content', () => {
    render(<PhilosophySection />)

    expect(screen.getByText('Our Philosophy')).toBeInTheDocument()

    expect(
      screen.getByText((content) => content.includes('We at Trade Corner want to set an example')),
    ).toBeInTheDocument()

    expect(screen.getByText(/Secondhand from Switzerland for a better world!/)).toBeInTheDocument()
    expect(
      screen.getByText(/#Secondhand #SecondhandinSwitzerland #SafethePlanet/),
    ).toBeInTheDocument()
  })
})
