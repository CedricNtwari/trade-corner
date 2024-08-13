import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Footer from './Footer'

// Mock the styles import
jest.mock('../styles/Footer.module.css', () => ({
  footer: 'footer',
  container: 'container',
  slogan: 'slogan',
  socialIcons: 'socialIcons',
  copyright: 'copyright',
}))

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />)
  })

  test('renders the slogan correctly', () => {
    const slogan = screen.getByText(/A World of Products at Your Fingertips/i)
    expect(slogan).toBeInTheDocument()
    expect(slogan).toHaveClass('slogan')
  })

  test('renders social media links', () => {
    const facebookLink = screen.getByRole('link', { name: /facebook/i })
    const instagramLink = screen.getByRole('link', { name: /instagram/i })
    const youtubeLink = screen.getByRole('link', { name: /youtube/i })
    const pinterestLink = screen.getByRole('link', { name: /pinterest/i })

    expect(facebookLink).toBeInTheDocument()
    expect(instagramLink).toBeInTheDocument()
    expect(youtubeLink).toBeInTheDocument()
    expect(pinterestLink).toBeInTheDocument()
  })

  test('renders the copyright text correctly', () => {
    const currentYear = new Date().getFullYear()
    const copyrightText = screen.getByText(`© ${currentYear} Trade Corner`)
    expect(copyrightText).toBeInTheDocument()
    expect(copyrightText).toHaveClass('copyright')
  })

  test('social media links have correct URLs', () => {
    const facebookLink = screen.getByRole('link', { name: /facebook/i })
    const instagramLink = screen.getByRole('link', { name: /instagram/i })
    const youtubeLink = screen.getByRole('link', { name: /youtube/i })
    const pinterestLink = screen.getByRole('link', { name: /pinterest/i })

    expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com')
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com')
    expect(youtubeLink).toHaveAttribute('href', 'https://www.youtube.com')
    expect(pinterestLink).toHaveAttribute('href', 'https://www.pinterest.com')
  })
})
