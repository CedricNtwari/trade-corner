  import React from 'react'
  import { render, screen, fireEvent, waitFor } from '@testing-library/react'
  import { MemoryRouter } from 'react-router-dom'
  import axios from 'axios'
  import NavBar from '../NavBar'
  import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext'
  import { useCart, useSetCart } from '../../contexts/CartContext'

  jest.mock('axios')
  jest.mock('../../contexts/CurrentUserContext')
  jest.mock('../../contexts/CartContext')

  const mockSetCurrentUser = jest.fn()
  const mockClearCart = jest.fn()

  describe('NavBar Component', () => {
    beforeEach(() => {
      useSetCurrentUser.mockReturnValue(mockSetCurrentUser)
      useSetCart.mockReturnValue({ clearCart: mockClearCart })
      axios.post.mockResolvedValueOnce({})
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('renders sign in and sign up links when no user is logged in', () => {
      useCurrentUser.mockReturnValue(null)
      useCart.mockReturnValue({ cartCount: 0 })

      render(<NavBar />, { wrapper: MemoryRouter })

      // Check sign-in link for both mobile and desktop
      expect(screen.getByTestId('desktop-signin')).toBeInTheDocument()
      expect(screen.getByTestId('mobile-signin')).toBeInTheDocument()
    })

    test('renders profile and sign out links when user is logged in', () => {
      useCurrentUser.mockReturnValue({ profile_id: 1, profile_image: 'profile.jpg' })
      useCart.mockReturnValue({ cartCount: 5 })

      render(<NavBar />, { wrapper: MemoryRouter })

      // Check for both mobile and desktop profile and sign-out links
      expect(screen.getByTestId('desktop-profile')).toBeInTheDocument()
      expect(screen.getByTestId('mobile-profile')).toBeInTheDocument()
      expect(screen.getByTestId('desktop-signout')).toBeInTheDocument()
      expect(screen.getByTestId('mobile-signout')).toBeInTheDocument()
    })

    test('renders cart with correct item count', () => {
      useCurrentUser.mockReturnValue({ profile_id: 1, profile_image: 'profile.jpg' })
      useCart.mockReturnValue({ cartCount: 5 })

      render(<NavBar />, { wrapper: MemoryRouter })

      // Get both mobile and desktop cart links
      const cartLinks = screen.getAllByLabelText(/shopping-cart/i)

      // Assert that both mobile and desktop cart links are present
      expect(cartLinks[0]).toBeInTheDocument() // Desktop
      expect(cartLinks[1]).toBeInTheDocument() // Mobile

      // Assert that the cart count of 5 is displayed in both places
      const cartCounts = screen.getAllByText('5')
      expect(cartCounts[0]).toBeInTheDocument() // Desktop cart count
      expect(cartCounts[1]).toBeInTheDocument() // Mobile cart count
    })

    test('renders profile and sign out links when user is logged in', () => {
      useCurrentUser.mockReturnValue({ profile_id: 1, profile_image: 'profile.jpg' })
      useCart.mockReturnValue({ cartCount: 5 })

      render(<NavBar />, { wrapper: MemoryRouter })

      // Check for both mobile and desktop profile and sign out links
      expect(screen.getByTestId('desktop-profile')).toBeInTheDocument()
      expect(screen.getByTestId('mobile-profile')).toBeInTheDocument()
      expect(screen.getByTestId('desktop-signout')).toBeInTheDocument()
      expect(screen.getByTestId('mobile-signout')).toBeInTheDocument()
    })

    test('calls sign out and clears cart on sign out (desktop)', async () => {
      useCurrentUser.mockReturnValue({ profile_id: 1, profile_image: 'profile.jpg' })
      useCart.mockReturnValue({ cartCount: 5 })

      render(<NavBar />, { wrapper: MemoryRouter })

      const signOutButton = screen.getByTestId('desktop-signout')
      fireEvent.click(signOutButton)

      await waitFor(() => {
        expect(mockSetCurrentUser).toHaveBeenCalledWith(null)
        expect(mockClearCart).toHaveBeenCalled()
      })
    })

    test('calls sign out and clears cart on sign out (mobile)', async () => {
      useCurrentUser.mockReturnValue({ profile_id: 1, profile_image: 'profile.jpg' })
      useCart.mockReturnValue({ cartCount: 5 })

      render(<NavBar />, { wrapper: MemoryRouter })

      const signOutButton = screen.getByTestId('mobile-signout')
      fireEvent.click(signOutButton)

      await waitFor(() => {
        expect(mockSetCurrentUser).toHaveBeenCalledWith(null)
        expect(mockClearCart).toHaveBeenCalled()
      })
    })
  })
