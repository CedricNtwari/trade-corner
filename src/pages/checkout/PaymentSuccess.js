import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import btnStyles from '../../styles/Button.module.css'
import styles from '../../styles/SignInUpForm.module.css'

const PaymentSuccess = () => {
  const history = useHistory()

  const handleContinueShopping = () => {
    history.push('/products')
  }

  const handleGoHome = () => {
    history.push('/')
  }

  return (
    <div className={styles.SuccessWrapper}>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase. Your order has been placed successfully.</p>
      <div className={styles.ButtonGroup}>
        <Button
          className={`${btnStyles.Button} ${btnStyles.Bright}`}
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </Button>
        <Button className={`${btnStyles.Button} ${btnStyles.Darker}`} onClick={handleGoHome}>
          Go to Homepage
        </Button>
      </div>
    </div>
  )
}

export default PaymentSuccess
