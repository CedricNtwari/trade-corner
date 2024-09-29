import React, { useState, useEffect } from 'react'
import { useCart, useSetCart } from '../../contexts/CartContext'
import styles from '../../styles/CartPage.module.css'
import btnStyles from '../../styles/Button.module.css'
import { Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import LoadingSpinner from '../../components/LoadingSpinner'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const CartPage = () => {
  const { cart } = useCart()
  const { removeFromCart, updateQuantity, alertMessage, setAlertMessage } = useSetCart()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState(null)

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [alertMessage, setAlertMessage])

  const handleQuantityChange = (itemId, stock, newQuantity) => {
    const validQuantity = Math.min(newQuantity, stock)
    updateQuantity(itemId, validQuantity, stock)
  }

  const handleProductClick = (productId) => {
    history.push(`/products/${productId}`)
  }

  const handleCheckout = async () => {
    setLoading(true)

    try {
      const { data } = await axios.post('/create-checkout-session/', { cart })
      const stripe = await stripePromise
      const result = await stripe.redirectToCheckout({ sessionId: data.id })

      if (result.error) {
        setCheckoutError(result.error.message)
        setLoading(false)
      }
    } catch (error) {
      setCheckoutError('Failed to create checkout session')
      setLoading(false)
    }
  }

  if (!cart || cart.items.length === 0) {
    return <h1 className={styles.EmptyCart}>Your Cart is Empty</h1>
  }

  return (
    <div className={styles.CartPage}>
      <h1>Shopping Cart</h1>
      {cart.items.map((item) => (
        <div className={styles.CartItem} key={item.id}>
          <div
            className={styles.CartItemClickable}
            onClick={() => handleProductClick(item.product.id)}
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className={styles.CartItemImage}
            />
            <div className={styles.CartItemDetails}>
              <p className={styles.CartItemName}>{item.product.name}</p>
              <p>USD {item.product.price}</p>
            </div>
          </div>
          <div>
            <label htmlFor={`qty-${item.id}`}>Qty:</label>
            <input
              type="number"
              id={`qty-${item.id}`}
              value={item.quantity}
              min="1"
              max={item.product.stock}
              onChange={(e) =>
                handleQuantityChange(item.id, item.product.stock, parseInt(e.target.value))
              }
            />
          </div>
          <div className={styles.CartItemPrice}>USD {item.product.price * item.quantity}</div>
          <button
            className={`${btnStyles.Button} ${btnStyles.Bright}`}
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      ))}

      <div className={styles.CartSummary}>
        <p>Subtotal: USD {cart.total.toFixed(2)}</p>
        <button className={`${btnStyles.Button} ${btnStyles.Darker}`} onClick={handleCheckout}>
          Checkout
        </button>
        {checkoutError && <Alert variant="danger">{checkoutError}</Alert>}
      </div>

      {alertMessage && (
        <Alert variant={alertMessage.type === 'error' ? 'danger' : 'success'}>
          {alertMessage.message}
        </Alert>
      )}

      {loading && <LoadingSpinner message="Processing Checkout..." />}
    </div>
  )
}

export default CartPage
