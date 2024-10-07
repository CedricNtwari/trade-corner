import React from 'react'
import { render, screen } from '@testing-library/react'
import SellSection from '../SellSection'

describe('SellSection', () => {
  test('renders sell section content', () => {
    render(<SellSection />)

    const image = screen.getByAltText('Clothing rack')
    expect(image).toBeInTheDocument()

    const title = screen.getByText('Sell your clothes now!')
    expect(title).toBeInTheDocument()

    expect(
      screen.getByText((content) =>
        content.includes('Sell your second-hand items yourself directly'),
      ),
    ).toBeInTheDocument()

    const link = screen.getByRole('link', { name: /Find out more here!/i })
    expect(link).toHaveAttribute('href', '/products')
  })
})
