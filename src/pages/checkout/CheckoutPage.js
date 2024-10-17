import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import styles from '../../styles/SignInUpForm.module.css'
import btnStyles from '../../styles/Button.module.css'
import LoadingSpinner from '../../components/LoadingSpinner'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const CheckoutPage = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post('/create-checkout-session/', { cart_id: cart?.id })
      console.log(cart?.id)
      const stripe = await stripePromise
      const result = await stripe.redirectToCheckout({ sessionId: data.id })
      if (result.error) {
        setError(result.error.message)
        setLoading(false)
        setTimeout(() => {
          setError(null)
        }, 3000)
      } else {
        const orderData = {
          total_price: cart.total,
          order_items: cart.items.map((item) => ({
            product: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          })),
        }
        await axios.post('/orders/', orderData)
      }
    } catch (error) {
      setError('Failed to create checkout session')
      setLoading(false)
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }

  return (
    <div className={styles.CheckoutWrapper}>
      <h2>Checkout</h2>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Darker}`}
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </Button>

      {error && <div className={styles.Error}>{error}</div>}

      {loading && <LoadingSpinner message="Processing your payment..." />}
    </div>
  )
}

export default function CheckoutPageWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  )
}
