import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CartPage from '../CartPage'
import { loadStripe } from '@stripe/stripe-js'

import { useCart, useSetCart } from '../../../contexts/CartContext'

jest.mock('../../../api/axiosDefaults')
jest.mock('@stripe/stripe-js')
jest.mock('../../../contexts/CartContext')

const mockRemoveFromCart = jest.fn()
const mockUpdateQuantity = jest.fn()
const mockSetAlertMessage = jest.fn()

describe('CartPage', () => {
  beforeEach(() => {
    useCart.mockReturnValue({
      cart: {
        items: [
          {
            id: 1,
            product: {
              id: 1,
              name: 'Test Product',
              price: 50,
              image: 'https://example.com/test-product.jpg',
              stock: 5,
            },
            quantity: 2,
          },
        ],
        total: 100,
      },
    })

    useSetCart.mockReturnValue({
      removeFromCart: mockRemoveFromCart,
      updateQuantity: mockUpdateQuantity,
      alertMessage: null,
      setAlertMessage: mockSetAlertMessage,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders cart items and total', () => {
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    )

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument()
    expect(screen.getByText(/USD 50/i)).toBeInTheDocument()
    expect(screen.getByText(/Subtotal: USD 100.00/i)).toBeInTheDocument()
  })

  test('calls removeFromCart when Remove button is clicked', () => {
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByText(/Remove/i))

    expect(mockRemoveFromCart).toHaveBeenCalledWith(1)
  })

  test('updates product quantity on change', () => {
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    )

    const quantityInput = screen.getByLabelText('Qty:')
    fireEvent.change(quantityInput, { target: { value: '3' } })

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3, 5)
  })

  test('shows "Your Cart is Empty" when cart is empty', () => {
    useCart.mockReturnValue({
      cart: {
        items: [],
        total: 0,
      },
    })

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    )

    expect(screen.getByText(/Your Cart is Empty/i)).toBeInTheDocument()
  })

  test('shows error message when checkout fails', async () => {
    const mockStripeRedirect = jest.fn().mockRejectedValueOnce({
      error: { message: 'Checkout failed' },
    })
    loadStripe.mockResolvedValueOnce({ redirectToCheckout: mockStripeRedirect })

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByText(/Checkout/i))

    await waitFor(() =>
      expect(screen.getByText(/Failed to create checkout session/i)).toBeInTheDocument(),
    )
  })

  test('displays alert message when present', () => {
    useSetCart.mockReturnValue({
      removeFromCart: mockRemoveFromCart,
      updateQuantity: mockUpdateQuantity,
      alertMessage: { message: 'Item added to cart', type: 'success' },
      setAlertMessage: mockSetAlertMessage,
    })

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    )

    expect(screen.getByText(/Item added to cart/i)).toBeInTheDocument()
  })
})
