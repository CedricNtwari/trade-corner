import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import CategoriesSection from '../CategoriesSection'

describe('CategoriesSection', () => {
  beforeEach(() => {
    render(
      <Router>
        <CategoriesSection />
      </Router>
    )
  })

  test('renders "Shop by category" title', () => {
    expect(screen.getByText(/Shop by category/i)).toBeInTheDocument()
  })

  test('renders category links for Women, Men, and Kids', () => {
    expect(screen.getByTestId('category-link-women')).toBeInTheDocument()
    expect(screen.getByTestId('category-link-men')).toBeInTheDocument()
    expect(screen.getByTestId('category-link-kids')).toBeInTheDocument()
  })

  test('has correct links for each category', () => {
    expect(screen.getByTestId('category-link-women')).toHaveAttribute(
      'href',
      '/products?category=women'
    )
    expect(screen.getByTestId('category-link-men')).toHaveAttribute(
      'href',
      '/products?category=men'
    )
    expect(screen.getByTestId('category-link-kids')).toHaveAttribute(
      'href',
      '/products?category=kids'
    )
  })

  test('renders category images with alt text', () => {
    expect(screen.getByTestId('category-image-women')).toHaveAttribute('alt', 'Shoes')
    expect(screen.getByTestId('category-image-men')).toHaveAttribute('alt', 'Apparel')
    expect(screen.getByTestId('category-image-kids')).toHaveAttribute('alt', 'Accessories')
  })
})
