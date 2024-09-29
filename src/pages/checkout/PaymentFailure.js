import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import btnStyles from '../../styles/Button.module.css'
import styles from '../../styles/SignInUpForm.module.css'

const PaymentFailure = () => {
  const history = useHistory()

  const handleTryAgain = () => {
    history.push('/cart')
  }

  const handleGoHome = () => {
    history.push('/')
  }

  return (
    <div className={styles.FailureWrapper}>
      <h1>Payment Failed</h1>
      <p>Oops! Something went wrong with your payment. Please try again.</p>
      <div className={styles.ButtonGroup}>
        <Button className={`${btnStyles.Button} ${btnStyles.Bright}`} onClick={handleTryAgain}>
          Try Again
        </Button>
        <Button className={`${btnStyles.Button} ${btnStyles.Darker}`} onClick={handleGoHome}>
          Go to Homepage
        </Button>
      </div>
    </div>
  )
}

export default PaymentFailure
