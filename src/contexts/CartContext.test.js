import { render, waitFor } from '@testing-library/react'
import { CartProvider, useCart, useSetCart } from '../contexts/CartContext'
import { axiosRes } from '../api/axiosDefaults'
import { act } from 'react-dom/test-utils'
import React from 'react'

jest.mock('../api/axiosDefaults')

const MockComponent = () => {
  const { cart, cartCount } = useCart()
  const { addToCart, removeFromCart, clearCart } = useSetCart()

  return (
    <div>
      <div data-testid="cart-count">{cartCount}</div>
      <button onClick={() => addToCart(1, 10, 2)}>Add to Cart</button>
      <button onClick={() => removeFromCart(1)}>Remove from Cart</button>
      <button onClick={() => clearCart()}>Clear Cart</button>
    </div>
  )
}

describe('CartContext', () => {
  it('should fetch cart data and display cart count', async () => {
    axiosRes.get.mockResolvedValueOnce({
      data: {
        results: [{ items: [{ product: { id: 1 }, price: '10.00', quantity: 1 }] }],
      },
    })

    const { getByTestId } = render(
      <CartProvider>
        <MockComponent />
      </CartProvider>,
    )

    await waitFor(() => {
      expect(getByTestId('cart-count')).toHaveTextContent('1')
    })
  })

  it('should add item to cart', async () => {
    axiosRes.post.mockResolvedValueOnce({})
    axiosRes.get.mockResolvedValueOnce({
      data: {
        results: [{ items: [{ product: { id: 1 }, price: '10.00', quantity: 2 }] }],
      },
    })

    const { getByText, getByTestId } = render(
      <CartProvider>
        <MockComponent />
      </CartProvider>,
    )

    await act(async () => {
      getByText('Add to Cart').click()
    })

    await waitFor(() => {
      expect(getByTestId('cart-count')).toHaveTextContent('2')
    })
  })

  it('should clear cart', async () => {
    axiosRes.get.mockResolvedValueOnce({
      data: {
        results: [],
      },
    })

    const { getByText, getByTestId } = render(
      <CartProvider>
        <MockComponent />
      </CartProvider>,
    )

    await act(async () => {
      getByText('Clear Cart').click()
    })

    await waitFor(() => {
      expect(getByTestId('cart-count')).toHaveTextContent('0')
    })
  })
})
