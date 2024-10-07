import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import HeroBanner from '../HeroBanner'

describe('HeroBanner Component', () => {
  test('renders HeroBanner with carousel slides', () => {
    render(
      <MemoryRouter>
        <HeroBanner />
      </MemoryRouter>,
    )

    expect(screen.getByText(/Sell your secondhand clothes/i)).toBeInTheDocument()
    expect(screen.getByText(/Buy second-hand clothes now/i)).toBeInTheDocument()
    expect(screen.getByText(/Exclusive Discounts/i)).toBeInTheDocument()
  })

  test('redirects to /products when the button is clicked', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <HeroBanner />
      </Router>,
    )

    const shopNowButton = screen.getByText(/Shop Now/i)
    fireEvent.click(shopNowButton)

    expect(history.location.pathname).toBe('/products')
  })
})
