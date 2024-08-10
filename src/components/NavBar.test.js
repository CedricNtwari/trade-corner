import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NavBar from './NavBar'

// Mock the logo import
jest.mock('../assets/tc-high-resolution-logo-transparent.png', () => 'logo.png')

// Mock the styles import
jest.mock('../styles/NavBar.module.css', () => ({
  dropdownMenuOpen: 'dropdownMenuOpen', // Add other necessary classes as needed
  searchInputOpen: 'searchInputOpen',
}))

describe('NavBar Component', () => {
  beforeEach(() => {
    render(<NavBar />)
  })

  test('renders all main links and buttons', () => {
    // Check if all mobile links are rendered
    expect(screen.getAllByText(/Home/i)).toHaveLength(2)
    expect(screen.getAllByText(/About/i)).toHaveLength(2)
    expect(screen.getAllByText(/Contact/i)).toHaveLength(2)
    expect(screen.getAllByText(/Sign in/i)).toHaveLength(2)
    expect(screen.getAllByText(/Sign up/i)).toHaveLength(2)

    // Check if cart icon is present
    const cartLinks = screen.getAllByRole('link', { name: /shopping-cart/i })
    expect(cartLinks).toHaveLength(1)

    // Check if the search icon is present
    const searchIcons = screen.getAllByRole('button', { name: /search/i })
    expect(searchIcons).toHaveLength(1)

    // Check if the menu link is present
    expect(screen.getByText(/Menu/i)).toBeInTheDocument()
  })

  test('toggles search input when search icon is clicked', () => {
    const searchIcon = screen.getAllByRole('button', { name: /search/i })[0]
    fireEvent.click(searchIcon)

    // Check if a search input appears
    const searchInputs = screen.getAllByPlaceholderText('Search...')
    expect(searchInputs[0]).toBeVisible()

    // Toggle search input visibility again
    fireEvent.click(searchIcon)
    expect(searchInputs[0]).not.toBeVisible()
  })

  test('opens and closes dropdown menu on click', () => {
    const menuLink = screen.getByText(/Menu/i)
    fireEvent.click(menuLink)

    // Check if dropdown is visible
    const dropdownMenu = screen.getByTestId('dropdown-menu')
    expect(dropdownMenu).toHaveClass('dropdownMenuOpen')

    // Click outside to close
    fireEvent.mouseDown(document.body)
    expect(dropdownMenu).not.toHaveClass('dropdownMenuOpen')
  })

  test('closes menu when clicking outside', () => {
    const menuLink = screen.getByText(/Menu/i)
    fireEvent.click(menuLink)

    // Simulate clicking outside to close
    fireEvent.mouseDown(document.body)
    const dropdownMenu = screen.getByTestId('dropdown-menu')
    expect(dropdownMenu).not.toHaveClass('dropdownMenuOpen')
  })

  test('cart count is displayed correctly', () => {
    // Check initial cart count
    const cartCount = screen.getAllByText('0')[0]
    expect(cartCount).toBeInTheDocument()
  })
})
