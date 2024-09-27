import { createContext, useContext, useState, useEffect } from 'react'
import { axiosRes } from '../api/axiosDefaults'

const CartContext = createContext()
const SetCartContext = createContext()

export const useCart = () => useContext(CartContext)
export const useSetCart = () => useContext(SetCartContext)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null)
  const [cartCount, setCartCount] = useState(0)
  const [alertMessage, setAlertMessage] = useState(null)

  const showAlert = (type, message) => {
    setAlertMessage({ type, message })
    setTimeout(() => {
      setAlertMessage(null)
    }, 3000)
  }

  const fetchCart = async () => {
    try {
      const { data } = await axiosRes.get('/carts/')
      if (data.results.length > 0) {
        const cartData = data.results[0]
        const total = cartData.items.reduce((sum, item) => sum + parseFloat(item.price), 0)
        setCart({ ...cartData, total })
        setCartCount(cartData.items.reduce((sum, item) => sum + item.quantity, 0))
      } else {
        setCart(null)
        setCartCount(0)
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
    }
  }

  const addToCart = async (productId, stock, quantity = 1) => {
    try {
      await axiosRes.post(`/carts/add_item/`, {
        product: productId,
        quantity: Math.min(quantity, stock),
      })

      await fetchCart()

      showAlert('success', 'Item added to cart successfully!')
    } catch (error) {
      console.error('Error adding to cart:', error)
      showAlert('error', 'Failed to add item to cart.')
    }
  }

  const removeFromCart = async (itemId) => {
    try {
      await axiosRes.post(`/carts/${cart.id}/remove_item/`, {
        item_id: itemId,
      })

      await fetchCart()

      showAlert('success', 'Item removed from cart.')
    } catch (error) {
      console.error('Error removing from cart:', error)
      showAlert('error', 'Failed to remove item from cart.')
    }
  }

  const updateQuantity = async (itemId, newQuantity, stock) => {
    if (newQuantity > stock) {
      showAlert('error', 'Quantity exceeds available stock.')
      return
    }
    try {
      await axiosRes.post(`/carts/${cart.id}/update_quantity/`, {
        item_id: itemId,
        quantity: newQuantity,
      })

      await fetchCart()

      showAlert('success', 'Quantity updated.')
    } catch (error) {
      console.error('Error updating quantity:', error)
      showAlert('error', 'Failed to update quantity.')
    }
  }

  const clearCart = () => {
    setCart(null)
    setCartCount(0)
  }

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <CartContext.Provider value={{ cart, cartCount }}>
      <SetCartContext.Provider
        value={{ addToCart, removeFromCart, updateQuantity, fetchCart, clearCart, alertMessage }}
      >
        {children}
      </SetCartContext.Provider>
    </CartContext.Provider>
  )
}
